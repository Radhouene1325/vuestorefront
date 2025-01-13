import {SfButton, SfIconAdd, SfIconDelete, SfIconRemove} from '@storefront-ui/react';
import {useCounter} from 'react-use';
import {useId, ChangeEvent, useMemo, useEffect} from 'react';
import {clamp} from '@storefront-ui/shared';
import useSWRMutation from "swr/mutation";
import fetchHomePage from "@/utils/fetchHomePage";
import {BASEURL} from "@/BASEURL/URL";
import {cartProducts} from "@/store/slices/productsSlice";
import {useDispatch} from "react-redux";
import {quantityCart} from "@/store/slices/userSlice";

interface QuantitySelectorProps {
    product?: {
        name: string;
        thumbnail: { url: string };
        price_range: { maximum_price: { final_price: { value: number } } }

    },
    setDeleteItem?: (value: (((prevState: string) => string) | string)) => void,
    deleteItem?: string,
    uid?: string,
    item?: {
        configurable_options?: any[];
        configured_variant?: any;
        prices?: any;
        product: {
            name: string;
            thumbnail: { url: string };
            price_range: { maximum_price: { final_price: { value: number } } }
        };
        quantity: number;
        uid?: string
    }
}

export default function QuantitySelector({product, setDeleteItem, deleteItem, item}: QuantitySelectorProps) {
    const inputId = useId();
    const min = 1;
    const max = 10;
    const [value, {inc, dec, set}] = useCounter(min);
const dispatch = useDispatch();
    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const {value: currentValue} = event.target;
        const nextValue = parseFloat(currentValue);
        set(clamp(nextValue, min, max));
    }
console.log(value)
    const {trigger, data, error, isMutating} = useSWRMutation(
        `${BASEURL}/api/removeItemFromCart/removeItemFromCart`,
        fetchHomePage.removeItemFromCart
    )

    const {trigger: trigger2, data: data2, error: error2, isMutating: isMutating2} = useSWRMutation(
        `${BASEURL}/api/updateCartItems/updateCartItems`,
        fetchHomePage.removeItemFromCart
    )

    const handelItemIncartVarient = async (event: string | undefined) => {
        console.log(event)


        await trigger(event as string)
    };


    useMemo(() => {


        if (data?.data?.data?.removeItemFromCart?.cart) {

            dispatch(cartProducts(data?.data?.data?.removeItemFromCart?.cart));
            dispatch(quantityCart(data?.data?.data?.removeItemFromCart?.cart.total_quantity))

        }
        if (data2?.data?.data?.updateCartItems?.cart) {

            dispatch(cartProducts(data2?.data?.data?.updateCartItems?.cart));
            dispatch(quantityCart(data2?.data?.data?.updateCartItems?.cart.total_quantity))
        }
    }, [data,data2]);

    useMemo(async () => {
        if (value) {


            const idItem = item?.uid


            await trigger2({value, idItem});
        }

    }, [value]);
    // console.log(cartProducts(data?.data?.data?.removeItemFromCart?.cart);

    // console.log(data2.data.data.updateCartItems.cart)
    return (
        <div className="flex items-center justify-between mt-4 sm:mt-0">
            {/* Quantity Selector */}
            <div className="flex border border-neutral-300 rounded-md">
                <SfButton
                    variant="tertiary"
                    square
                    className="rounded-r-none"
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
                    className="
                    appearance-none mx-2 w-8 text-center bg-transparent font-medium
                    [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none
                    [&::-webkit-outer-spin-button]:display-none [-moz-appearance:textfield]
                    focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm
                  "
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleOnChange}
                />
                <SfButton
                    variant="tertiary"
                    square
                    className="rounded-l-none"
                    disabled={value >= max}
                    aria-controls={inputId}
                    aria-label="Increase value"
                    onClick={() => inc()}
                >
                    <SfIconAdd/>
                </SfButton>
            </div>

            {/* Remove Button */}
            <button
                aria-label="Remove"
                type="button"
                className="text-neutral-500 text-xs font-light ml-auto flex items-center px-3 py-1.5"
                onClick={() => handelItemIncartVarient(item?.uid)}
            >
                <SfIconDelete/>
                <span className="hidden ml-1.5 sm:block">Remove</span>
            </button>
        </div>




            // <div className="flex items-center align-items-end justify-center space-x-5    text-sm font-medium ">
        //
        //
        //     <div className="inline-flex flex-col items-center">
        //         <div className="flex border border-neutral-300 rounded-md">
        //             <SfButton
        //                 variant="tertiary"
        //                 square
        //                 className="rounded-r-none"
        //                 disabled={value <= min}
        //                 aria-controls={inputId}
        //                 aria-label="Decrease value"
        //                 onClick={() => dec()}
        //             >
        //                 <SfIconRemove/>
        //             </SfButton>
        //             <input
        //                 id={inputId}
        //                 type="number"
        //                 role="spinbutton"
        //                 className="appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
        //                 min={min}
        //                 max={max}
        //                 value={value}
        //                 onChange={handleOnChange}
        //             />
        //             <SfButton
        //                 variant="tertiary"
        //                 square
        //                 className="rounded-l-none"
        //                 disabled={value >= max}
        //                 aria-controls={inputId}
        //                 aria-label="Increase value"
        //                 onClick={() => inc()}
        //             >
        //                 <SfIconAdd/>
        //             </SfButton>
        //         </div>
        //         <p className="text-xs mt-2 text-neutral-500">
        //             <strong className="text-neutral-900">{max}</strong> in stock
        //         </p>
        //     </div>
        //
        //     <button
        //         aria-label="Remove"
        //         type="button"
        //         className="text-neutral-500 text-xs font-light ml-auto flex items-center px-3 py-1.5"
        //         onClick={() => handelItemIncartVarient(item?.uid)}
        //     >
        //         <SfIconDelete/>
        //         <span className="hidden ml-1.5 sm:block">Remove</span>
        //     </button>
        //
        // </div>


    );
}
