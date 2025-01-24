import React, {ChangeEvent, useMemo, useState} from 'react'
import {useRouter} from 'next/router'
import {GetServerSideProps} from "next";
import fetchHomePage from "@/utils/fetchHomePage";
import {parse} from "cookie";
import {string} from "postcss-selector-parser";
import Pannier from "@/components/panier/panier";
import Chekout from "@/components/chekout/chekout";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"

import {useEffect} from "react"
import convertToSubCurrency from "@/lib/config";
import ChekoutElement from "@/components/chekout/ChekoutElement";
import {stripePyament} from "@/utils/stripe";
import productsChekout from "@/components/chekout/productsChekout/productsChekout";
import ProductsChekout from '@/components/chekout/productsChekout/productsChekout';
import {SfButton, SfListItem, SfLoaderCircular, SfRadio} from "@storefront-ui/react";
import Link from "next/link";
import {getCookie} from "cookies-next";
import authenticationuser from "@/utils/authentication";
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import {sdk} from "../../../../sdk.config";
const stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const Addressisoky = ({paymentMethod,customerCart}) => {
    // console.log(stripe)
console.log(customerCart.data.
    customerCart
)
    console.log(paymentMethod.data.data.customerCart)
    const Router = useRouter()
    console.log(Router.query)


// const [stripe, setStripe] = React.useState(null);
//     const stripeComonents =  async(event) => {
//
//         const stripePromise = await  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
//         console.log(
//             "the stripe promise",
//             stripePromise)
//         console.log("the stripe promise", stripePromise)
//         setStripe(stripePromise)
//
//
//     }
//     // useMemo(() => {
//     //     stripeComonents()
//     // }, [stripe]);

    let amount = 49.99


    return (

        <div>

            <h5>Démarrer la commande</h5>

            <div>
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

                    <div className="flex flex-col md:flex-row gap-4">

                        <div className="flex-1 min-w-[300px]">
                            <div className="relative">
                                <div className="bg-neutral-100 p-4 sm:p-10 ">
                                    <div className="flex justify-between items-center">

                                        <p className="typography-headline-4 sm:typography-headline-3 font-bold">
                                            Adresse de livraison
                                        </p>
                                        <Link href={{
                                            pathname: '/buildingAdress/buildingAdress'
                                        }}>Modifier</Link>
                                    </div>
                                    <p className="typography-headline-4 sm:typography-headline-3 font-bold">
                                        {customerCart.data.customerCart.billing_address?.firstname},{customerCart.data.customerCart?.billing_address.lastname}
                                    </p>
                                    <p className="typography-text-sm sm:typography-text-base my-2 mb-4">
                                        {customerCart.data.customerCart.billing_address.street[0]}, {customerCart.data.customerCart.billing_address.city},{customerCart.data.customerCart.billing_address.region.label},{customerCart.data.customerCart.billing_address.postcode}
                                    </p>
                                </div>
                                <hr/>

                                <div className="flex-1 min-w-[300px] py-3">
                                    <div className="relative" style={{height: 'calc(100vh - 200px)'}}>
                                        <div
                                            className="bg-neutral-100 p-4 sm:p-10 h-full overflow-y-auto custom-scrollbar rounded-md shadow-md">
                                            <p className="typography-headline-4 sm:typography-headline-3 font-bold">
                                                Articles et options de livraison
                                            </p>
                                            <div className="typography-text-sm sm:typography-text-base my-2 mb-4">
                                                {customerCart.data.customerCart.items.map((item: any, index: number) => (
                                                    <ProductsChekout item={item} key={index}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <Shipppingmethode shippingMethode={[]}/>
                        <div className="flex-shrink-0 w-full md:w-[400px] position-absolute top-0 right-0">
                            <Chekout
                                available_payment_methods={paymentMethod.data.data.customerCart.available_payment_methods}
                                prices={customerCart.data.customerCart.prices}
                                amount={amount}
                                stripePromise={stripePromise}
                                // stripe={stripe}
                                data={customerCart.data.customerCart}
                            />

                        </div>


                    </div>
                </div>
            </div>


        </div>
    );


};
export default Addressisoky

/**
 * Handles fetching and setting the billing address on the cart based on the provided query data in the server-side context.
 *
 * @param {object} context - The server-side context object, including query parameters.
 * @param {object} context.query - The query object containing address-related parameters.
 * @param {string} context.query.city - The city of the billing address.
 * @param {string} context.query.country_code - The country code of the billing address.
 * @param {boolean} context.query.default_billing - Indicates if this is the default billing address.
 * @param {boolean} context.query.default_shipping - Indicates if this is the default shipping address.
 * @param {string} context.query.firstname - The first name of the individual associated with the billing address.
 * @param {string} context.query.lastname - The last name of the individual associated with the billing address.
 * @param {string} context.query.id - The unique identifier associated with the address.
 * @param {string} context.query.postcode - The postcode of the billing address.
 * @param {string} context.query.prefix - The prefix (if any) for the individual's name.
 * @param {string} context.query.region - The region or state of the billing address.
 * @param {string} context.query.street - The street address of the billing address.
 * @param {string} context.query.suffix - The suffix (if any) for the individual's name.
 * @param {string} context.query.telephone - The phone number associated with the billing address.
 * @param {string} context.query.vat_id - The VAT ID associated with the billing address, if applicable.
 *
 * @return {Promise<object>} A promise resolving to an object containing the `props` key, which includes the fetched billing address data.
 */

const Shipppingmethode=({shippingMethode}: { shippingMethode: { amount: number; carrier_code: string; method_title: string; price_excl_tax: { currency: string; value: number } }[] })=>{
    const [checkedState, setCheckedState] = useState('');
    console.log(checkedState)
    const {trigger: getShippingMethode, data: shippingData, error: ErrorShippingMethode,isMutating:mutating} = useSWRMutation(
        `${BASEURL}/api/setShippingMethodsOnCart/setShippingMethodsOnCart`,
        fetchHomePage.setShippingMethodsOnCart
    )
console.log(shippingMethode)

    const handelSelectMethodeShipping = async(event: ChangeEvent<HTMLSelectElement>)=>{
        console.log(event.target.value)
        setCheckedState(event.target.value);

        let res=shippingMethode.filter((e: { carrier_code: string; })=>e.carrier_code==event.target.value)
        if (res) {
            await getShippingMethode(res[0]);
        }

    }

    return(
        <div className="col-span-full">

            {shippingMethode?.map(
                ({
                     amount,
                     carrier_code,
                     method_title,
                     price_excl_tax,
                 }) => (
                    <SfListItem
                        as="label"
                        key={carrier_code}
                        slotPrefix={
                            <SfRadio
                                name="delivery-options"
                                value={carrier_code}
                                checked={checkedState === carrier_code}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => handelSelectMethodeShipping(event as unknown as ChangeEvent<HTMLSelectElement>)}
                            />
                        }
                        slotSuffix={
                            <span className="text-gray-900">
                                           <span>{price_excl_tax.currency}</span>
                                {price_excl_tax.value}{' '}

                                EURO
                                               </span>
                        }
                        className="!items-start max-w-sm border rounded-md border-neutral-200 first-of-type:mr-4 first-of-type:mb-4"
                    >
                        {method_title}
                    </SfListItem>
                )
            )}
            {mutating && <div className="flex gap-4 flex-wrap">
                <SfLoaderCircular className="!text-cyan-700" size="2xl"/>

            </div>}
        </div>
    )

}






export const getServerSideProps: GetServerSideProps = async (context: any) => {
    console.log("ddssdvdfvfdvdfvaevfv", context.req.headers)
    const {req, res} = context;

    let cartId=await getCookie('cart-id',{req, res})

    let token =await  getCookie('auth-token',{req, res})



    // let customerToken = await getCookie('auth-token', {req, res});
    // console.log('hello tokensdclksdcjdnsc', customerToken)

    const {data: customerCart} = await authenticationuser.customerCart(token as string)


    const result = await sdk.magento.getAvailableCustomerShippingMethods({
        customHeaders: {
            Authorization: `Bearer ${token || ''}`,
        }
    },{cart_id: cartId});




  let paymentMethod=await fetchHomePage.getAvailableCustomerPaymentMethods(token)
//     let amount=49.99
// let stripe=await stripePyament.stripePyaments(amount)
    return {
        props: {

            paymentMethod:paymentMethod,
            customerCart,
            shippingMethode: result?.data?.customerCart?.shipping_addresses?.[0]?.available_shipping_methods || [],

            // stripe:stripe,
        }
    };



}
