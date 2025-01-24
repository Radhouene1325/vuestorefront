import {
    SfRating,
    SfButton,
    SfLink,
    SfCounter,
    SfIconShoppingCart,
    SfIconCompareArrows,
    SfIconFavorite,
    SfIconSell,
    SfIconPackage,
    SfIconRemove,
    SfIconAdd,
    SfIconWarehouse,
    SfIconSafetyCheck,
    SfIconShoppingCartCheckout, SfIconClose,
} from '@storefront-ui/react';
import { useCounter } from 'react-use';
import {useId, ChangeEvent, FormEvent, useMemo} from 'react';
import { clamp } from '@storefront-ui/shared';
import ColorFilter from "@/components/productesDetails/options/optionColorProduct";
import SizeFilter from "@/components/productesDetails/options/optionsSizeProduct";
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
    addProductToCart,
    incrimentQuantityCardProduct,
    quantitiyVarientIncart,
    quantityCart
} from "@/store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import useSWRMutation from "swr/mutation";
import {RootState} from "@/store";
import {BASEURL} from "@/BASEURL/URL";
import {cartProducts, notificateProduct} from "@/store/slices/productsSlice";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import fetchHomePage from "@/utils/fetchHomePage";

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

type ProductItem = {
    name: string;
    price_range: {
        minimum_price: {
            final_price: { value: number };
            regular_price: { value: number };
        };
    };
    thumbnail: string;
    url_key: string;
    url_rewrite?: string;
    sku: string;
    categories: any[]; // Adjust type based on your use case
    configurable_options: any[]; // Adjust type based on your use case
    description: {
        html: string; // Declare that description.html is of type string
    };
    image?: string;
    small_image?: string;
    uid: string;
    variants?: any[]; // Adjust type based on your use case
};

type ProductItemsProps = {
    items: {
        items: ProductItem[];
    };
};
async function sendData(url: string, { arg }) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        throw new Error('Failed to send data');
    }

    return response.json(); // parse JSON response
}
export default function InfoProductesDetaisl({items}:ProductItemsProps) {
    const quantityLengthVarient = useSelector((state: RootState) => state?.user?.varientLengthInCart);
    console.log(quantityLengthVarient)
    const dispatch = useDispatch();
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [opened, setOpened] = useState(true);
    const [colorList, setColorList] = useState<string[]>([]);
    const [params, setParams] = useState<string[]>([])
    const [paramsColor, setParamsColor] = useState<string[]>([])

    console.log(paramsColor);
    console.log(params);

const productsPanier=useSelector((state: RootState) => state?.product?.productNoticate)
    console.log(productsPanier)

    console.log(selectedSizes)
    console.log(params)
    console.log(paramsColor)
    const {
        name,
        price_range,
        thumbnail,
        url_key,
        url_rewrite,
        sku,
        categories,
        configurable_options,
        description,
        image,
        small_image,
        uid,
        variants
    }:{name:string,sku:string,uid:String} = items?.items[0];
console.log(description)
    const {final_price,regular_price}=price_range.minimum_price
    const inputId = useId();
    const min = 1;
    const max = 999;
    const [value, { inc, dec, set }] = useCounter(min);
    console.log(value)
    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const { value: currentValue } = event.target;
        const nextValue = parseFloat(currentValue);
        set(Number(clamp(nextValue, min, max)));
    }


    const { trigger, data, error, isMutating } = useSWRMutation(
        `${BASEURL}/api/addproductstocart/addproductstocart`,
        sendData
    );
     console.log(data?.data?.errors)

    // let {addProductsToCart:{addProductsToCart:cart}} =data?.data?.data
    // console.log(cart)
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await trigger({ sku:sku,paramsColor:paramsColor[0]?.uidColor,params:params[0]?.uidSize,value:value }); // POST { name, email } to /api/send-data

            setOpen(true)
        } catch (err) {
            console.error('Error sending data:', err);
        }
    };
     useMemo(()=>{
         if (data) {
             dispatch(quantityCart(data?.data?.data?.addProductsToCart?.cart?.total_quantity))
             dispatch(notificateProduct(data?.data?.data?.addProductsToCart?.cart))
         }

     },[data])

    let [quantity,setQuantity]=useState<number>(0)
    useMemo(()=>{
      const   handelItemIncartVarient=()=>{
          console.log(uid)
            let verify=data?.data?.data?.addProductsToCart?.cart?.items?.filter(item=>
                 item.product.uid == uid
            )
          console.log(verify)
            if(verify){
                let somme= verify.reduce((acc: any, item: { quantity: any; })=>{
                    return item.quantity + acc;},0)
                dispatch(quantitiyVarientIncart( somme))
            }
        }
        handelItemIncartVarient()
    },[data])
console.log(items.items.some(e => e?.configurable_options))



    const {trigger:DELETE, data:DATA, error:ERROR, isMutating:ISMUTATING} = useSWRMutation(
        `${BASEURL}/api/removeItemFromCart/removeItemFromCart`,
        fetchHomePage.removeItemFromCart
    )


    const handelDleteItenFromCart = async (event: string | undefined) => {
        console.log(event)


        let x= await DELETE(event as string)
        // console.log(x)
        // console.log(x?.data?.data?.removeItemFromCart?.cart)
        if(x?.data?.data?.removeItemFromCart?.cart) {
            console.log('data?.data?.data?.removeItemFromCart?.cart');
            dispatch(cartProducts(x?.data?.data?.removeItemFromCart?.cart));
            dispatch(quantityCart(x?.data?.data?.removeItemFromCart?.cart.total_quantity));
        }

    };


    let index = useSelector((state: RootState) => state.product?.cartProducts);
    console.log(index)
const Router=useRouter()

    return (
        <section className="md:max-w-[640px]">
            <div
                className="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4">
                <SfIconSell size="sm" className="mr-1.5"/>
                Sale
            </div>
            {data?.data?.errors ? (
                <>

                    {
                        paramsColor.length === 0 && (


                            <div
                                role="alert"
                                className="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
                            >
                                <p className="py-2 mr-2">please select color in required.</p>
                                <button
                                    type="button"
                                    className="py-1.5 px-3 md:py-2 md:px-4 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 ml-auto font-medium focus-visible:outline focus-visible:outline-offset"
                                >
                                    Retry
                                </button>
                                <button
                                    type="button"
                                    className="p-1.5 md:p-2 ml-2 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 focus-visible:outline focus-visible:outline-offset"
                                    aria-label="Close error alert"
                                >
                                    <SfIconClose className="hidden md:block"/>
                                    <SfIconClose size="sm" className="block md:hidden"/>
                                </button>
                            </div>


                        )
                    }
                    {
                        params.length === 0 && (


                            <div
                                role="alert"
                                className="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
                            >
                                <p className="py-2 mr-2">please select size for the products  in required.</p>
                                <button
                                    type="button"
                                    className="py-1.5 px-3 md:py-2 md:px-4 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 ml-auto font-medium focus-visible:outline focus-visible:outline-offset"
                                >
                                    Retry
                                </button>
                                <button
                                    type="button"
                                    className="p-1.5 md:p-2 ml-2 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 focus-visible:outline focus-visible:outline-offset"
                                    aria-label="Close error alert"
                                >
                                    <SfIconClose className="hidden md:block"/>
                                    <SfIconClose size="sm" className="block md:hidden"/>
                                </button>
                            </div>


                        )
                    }
                </>
            ) : null
            }
            <h1 className="mb-1 font-bold typography-headline-4">
                {name}
            </h1>
            <strong className="block font-bold typography-headline-3">${final_price.value}</strong>
            <div className="inline-flex items-center mt-4 mb-2">
                <SfRating size="xs" value={3} max={5}/>
                <SfCounter className="ml-1" size="xs">
                    123
                </SfCounter>
                <SfLink href="#" variant="secondary" className="ml-2 text-xs text-neutral-500">
                    123 reviews
                </SfLink>
            </div>
            <ul className="mb-4 font-normal typography-text-sm">

                <li dangerouslySetInnerHTML={{__html: description.html}}></li>
                {items.items.some(e => e?.configurable_options) ? (<>
                    <ColorFilter
                        colorList={colorList} setColorList={setColorList}
                        configurable_options={configurable_options}
                        opened={opened} setOpened={setOpened} setParamsColor={setParamsColor} paramsColor={paramsColor}
                    />
                    < SizeFilter
                        configurable_options={configurable_options}
                        selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                        opened={opened} setOpened={setOpened} params={params} setParams={setParams}
                    />
                </>) : null
                }

            </ul>
            <div className="py-4 mb-4 border-gray-200 border-y">
                <div
                    className="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md">
                    <SfIconShoppingCartCheckout/>{quantityLengthVarient as number} in cart
                </div>
                <div className="items-start xs:flex">
                    <div className="flex flex-col items-stretch xs:items-center xs:inline-flex">
                        <div className="flex border border-neutral-300 rounded-md">
                            <SfButton
                                variant="tertiary"
                                square
                                className="rounded-r-none p-3"
                                disabled={value <= min}
                                aria-controls={inputId}
                                aria-label="Decrease value"
                                onClick={() => dec()}
                            >
                                <SfIconRemove/>
                            </SfButton>
                            <input
                                id={inputId}
                                type="number"
                                role="spinbutton"
                                className="grow appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                                min={min}
                                max={max}
                                value={value}
                                onChange={handleOnChange}
                            />
                            <SfButton
                                variant="tertiary"
                                square
                                className="rounded-l-none p-3"
                                disabled={value >= max}
                                aria-controls={inputId}
                                aria-label="Increase value"
                                onClick={() => inc()}
                            >
                                <SfIconAdd/>
                            </SfButton>
                        </div>
                        <p className="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
                            <strong className="text-neutral-900">{max}</strong> in stock
                        </p>
                    </div>
                    <SfButton size="lg" className="w-full xs:ml-4" slotPrefix={<SfIconShoppingCart size="sm"/>}
                              onClick={handleSubmit}
                    >
                        Add to cart
                    </SfButton>

                </div>
                <div className="flex justify-center mt-4 gap-x-4">
                    <SfButton size="sm" variant="tertiary" slotPrefix={<SfIconCompareArrows size="sm"/>}>
                        Compare
                    </SfButton>
                    <SfButton size="sm" variant="tertiary" slotPrefix={<SfIconFavorite size="sm"/>}>
                        Add to list
                    </SfButton>
                </div>
            </div>
            <div className="flex first:mt-4">
                <SfIconPackage size="sm" className="flex-shrink-0 mr-1 text-neutral-500"/>
                <p className="text-sm">
                    Free shipping, arrives by Thu, Apr 7. Want it faster?
                    <SfLink href="#" variant="secondary" className="mx-1"

                    >
                        Add an address
                    </SfLink>
                    to see options
                </p>
            </div>
            <div className="flex mt-4">
                <SfIconWarehouse size="sm" className="flex-shrink-0 mr-1 text-neutral-500"/>
                <p className="text-sm">
                    Pickup not available at your shop.
                    <SfLink href="#" variant="secondary" className="ml-1">
                        Check availability nearby
                    </SfLink>
                </p>
            </div>
            <div className="flex mt-4">
                <SfIconSafetyCheck size="sm" className="flex-shrink-0 mr-1 text-neutral-500"/>
                <p className="text-sm">
                    Free 30-days returns.
                    <SfLink href="#" variant="secondary" className="ml-1">
                        Details
                    </SfLink>
                </p>
            </div>


            <Dialog open={open} onClose={setOpen} className="relative z-40 mt-25">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <DialogPanel
                                transition
                                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                            >
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                >
                                                    <span className="absolute -inset-0.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {productsPanier?.items?.map((product) => (
                                                        <li key={product.id} className="flex py-6">
                                                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img alt={product?.configured_variant?.thumbnail?.label} src={product?.configured_variant?.thumbnail?.url} className="size-full object-cover" />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <a href={product?.href}>{product?.configured_variant?.name}</a>
                                                                        </h3>
                                                                        <p className="ml-4">{product?.configured_variant?.price_range?.minimum_price?.regular_price?.value}$</p>
                                                                    </div>
                                                                    {/*<p className="mt-1 text-sm text-gray-500">{product?.configurable_options[1]?.option_label}:{product?.configurable_options[1]?.value_label}</p>*/}

                                                                    {/*<p className="mt-1 text-sm text-gray-500">{product?.configurable_options[0]?.option_label}:{product?.configurable_options[0]?.value_label}</p>*/}

                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-gray-500">Qty {product?.quantity}</p>

                                                                    <div className="flex">
                                                                        <button
                                                                            // onClick={() => handelDleteItenFromCart(product?.uid)}
                                                                            onClick={(()=>{
                                                                                Router.push({
                                                                                    pathname: `/about/${product?.product?.url_rewrites?.map((item) => item.url).join('/')}`,
                                                                                    query: {sku: product?.product?.sku}

                                                                                });
                                                                            })}
                                                                            type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                            details
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        {/*<div className="flex justify-between text-base font-medium text-gray-900">*/}
                                        {/*    <p>Subtotal</p>*/}
                                        {/*    <p>$262.00</p>*/}
                                        {/*</div>*/}
                                        {/*<p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>*/}
                                        <div className="mt-6">
                                            <a
                                                onClick={() => {
                                                    Router.push({
                                                        pathname: '/shippingAdress/shippingAdress',
                                                    })
                                                }}
                                                href="#"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                Checkout
                                            </a>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpen(false);



                                                    }}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </section>
    );

}
