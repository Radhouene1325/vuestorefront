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
    SfIconShoppingCartCheckout,
} from '@storefront-ui/react';
import { useCounter } from 'react-use';
import {useId, ChangeEvent, FormEvent, useMemo} from 'react';
import { clamp } from '@storefront-ui/shared';
import ColorFilter from "@/components/productesDetails/options/optionColorProduct";
import SizeFilter from "@/components/productesDetails/options/optionsSizeProduct";
import { useState } from 'react';
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
    const quantityLengthVarient = useSelector((state: RootState) => state.user.varientLengthInCart);
    console.log(quantityLengthVarient)
    const dispatch = useDispatch();
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [opened, setOpened] = useState(true);
    const [colorList, setColorList] = useState<string[]>([]);
    const [params, setParams] = useState<string[]>([])
    const [paramsColor, setParamsColor] = useState<string[]>([])




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
     console.log(data)

    // let {addProductsToCart:{addProductsToCart:cart}} =data?.data?.data
    // console.log(cart)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await trigger({ sku:sku,paramsColor:paramsColor[0]?.uidColor,params:params[0]?.uidSize,value:value }); // POST { name, email } to /api/send-data
        } catch (err) {
            console.error('Error sending data:', err);
        }
    };
     useMemo(()=>{
         if (data) {
             dispatch(quantityCart(data.data.data.addProductsToCart.cart.total_quantity))
         }

     },[data])

    let [quantity,setQuantity]=useState<number>(0)
    useMemo(()=>{
      const   handelItemIncartVarient=()=>{
          console.log(uid)
            let verify=data?.data.data.addProductsToCart.cart.items.filter(item=>
                 item.product.uid == uid
            )
          console.log(verify)
            if(verify){
                let somme= verify.reduce((acc,item)=>{
                    return item.quantity + acc;},0)
                dispatch(quantitiyVarientIncart( somme))
            }
        }
        handelItemIncartVarient()
    },[data])
console.log(items.items.some(e => e?.configurable_options))

    return (
        <section className="md:max-w-[640px]">
            <div
                className="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4">
                <SfIconSell size="sm" className="mr-1.5"/>
                Sale
            </div>
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
                        />)
                    < SizeFilter
                    configurable_options={configurable_options}
                    selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                    opened={opened} setOpened={setOpened} params={params} setParams={setParams}
                    />
                    </>):null
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
        </section>
    );
}
