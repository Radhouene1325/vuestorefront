import React, {FormEvent, useMemo} from 'react'
import {useEffect,useState} from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/config";
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import {stripePyament} from "@/utils/stripe";
import {sdk} from "../../../sdk.config";
import {useRouter} from "next/router";
const ChekoutElement = ({amount,...rest}:{amount:number}) => {
console.log(rest)
const router = useRouter();
    console.log(rest)
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState(null);
    const [loading,setLoading] = useState(false);
    const {city,company,firstname,lastname,postcode,region,street,telephone,country}=rest?.adress.billing_address;


// console.log(rest.adress)
    const { trigger, data, error, isMutating } = useSWRMutation(
        `${BASEURL}/api/chekoutstipe/chekoutstipe`,
        stripePyament.stripePyaments
    );
    // const options = {
    //     mode: 'payment',
    //     amount: rest.adress.prices.grand_total.value * 100,
    //     currency: 'usd',
    //     paymentMethodCreation: 'manual'
    // };

    // const createPaymentMethod = async () => {
    //
    //     const paymentMethodResults = await stripe.createPaymentMethod({
    //         elements: elements,
    //         params: {
    //             billing_details: {
    //                 address: {
    //                     city: city,
    //                     country: country.code,
    //                     line1: street[0],
    //                     line2: "",
    //                     postal_code: postcode,
    //                     state: region.code
    //                 },
    //                 email: rest.adress?.email,
    //                 name: firstname + " " + lastname,
    //                 phone: telephone
    //             }
    //         }
    //     });
    //     let x = {
    //
    //         cart_id: cstid,
    //
    //         shipping_addresses: [
    //
    //             {
    //
    //                 address: {
    //
    //                     firstname: firstname,
    //
    //                     lastname: lastname,
    //
    //                     city: city,
    //
    //                     country_code: country.code,
    //
    //                     street: [street[0]],
    //
    //                     telephone: telephone,
    //
    //                     region: region.code,
    //
    //                     region_id: 941,
    //
    //                     postcode: postcode,
    //
    //                     save_in_address_book: false
    //
    //                 },
    //
    //             }
    //
    //         ]
    //
    //     };
    //
    //     console.log(x)
    //     let token = 'eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjIsInV0eXBpZCI6MywiaWF0IjoxNzM2MzI3NjA4LCJleHAiOjE3MzYzMzEyMDh9.53UzGrOZPjcOOkwKZ3XuZKfjRofzWUk_z8juuZrhGhU'
    //
    //     await sdk.magento.setShippingAddressesOnCart(x, {
    //         customHeaders: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //
    //     const setShipping = {
    //
    //         cart_id: cstid,
    //
    //         shipping_methods: [
    //
    //             {
    //
    //                 carrier_code: 'flatrate',
    //
    //                 method_code: 'flatrate'
    //
    //             }
    //
    //         ]
    //
    //     };
    //
    //
    //     const {xxx} = await sdk.magento.setShippingMethodsOnCart(setShipping, {
    //         customHeaders: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     console.log(xxx)
    //
    //
    //     const params = {
    //
    //         cart_id: cstid,
    //
    //         payment_method: {
    //
    //             code: 'stripe_payments',
    //             stripe_payments: {
    //                 // payment_element: true,
    //                 payment_method: paymentMethodResults.paymentMethod.id,
    //                 save_payment_method: true
    //             }
    //
    //         }
    //
    //     };
    //
    //
    //     console.log(paymentMethodResults)
    //
    //
    //
    //     const {data} = await sdk.magento.setPaymentMethodOnCart(params, {
    //         customHeaders: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     console.log(data)
    //     const result = await sdk.magento.placeOrder({cart_id: cstid}, {
    //         customHeaders: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     console.log(result)
    //
    // };
    //


    async  function handelSubmited(e) {
         e.preventDefault();
        setLoading(true);
        if(!stripe||!elements){
            return;
        }
        const {error,submitError,data} =await  elements.submit()
        if(submitError){
            setErrorMessage(submitError.message);
            setLoading(false);
            return
        }

        // await createPaymentMethod();
        const paymentMethodResults = await stripe.createPaymentMethod({
            elements:elements,
            params: {
                billing_details: {
                    address: {
                        city: city,
                        country: country.code,
                        line1: street[0],
                        line2: "",
                        postal_code: postcode,
                        state: region.code
                    },
                    email: rest.adress?.email,
                    name: firstname + " " + lastname,
                    phone: telephone
                }
            }
        });

        let payment={ paymentMethodResults, stripe}

        let index=    await trigger(payment); // POST { name, email } to /api/send-data

        console.log(  'dssvfvafdvfdvfvdfvdfv', index.data?.data?.placeOrder?.order?.order_number)

        if(index.error)
        {
            alert(index.error.message)
        }else {
            await router.push({
                pathname: `/payment-success/${index.data.data.placeOrder.order.order_number}`,
                query: index.data.data.placeOrder.order.order_number
            })
        }

        // const {clientSecret}=rest?.stripe
        //   await createPaymentMethod();
        // const {error: er} = await stripe.confirmPayment({
        //     elements,
        //     clientSecret,
        //     // confirmParams: {
        //     //     return_url: `http://www.localhost:3000/payment-success?amount=${amount}`
        //     // }
        //
        // });
    }






    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        let index=    await trigger({mode: 'payment',
                amount: rest.adress.prices.grand_total.value * 100,
                currency: 'usd',
                paymentMethodCreation: 'manual'}); // POST { name, email } to /api/send-data

            console.log(  'dssvfvafdvfdvfvdfvdfv', index)

            let data =await  handelSubmited(index.clientSecret);
            console.log(data)

        } catch (err) {
            console.error('Error sending data:', err);
        }
    };








    console.log(data?.clientSecret)
    return (
        <div>
            {/*<button onClick={handleSubmit}>send</button>*/}
            <form onSubmit={handelSubmited}>
                <PaymentElement/>


                <button
                    // disabled={loading || !stripe}
                    className='text-white bg-black py-2 px-4 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse'
                >
                    {/*{!loading ? ` Pay$${amount}:` : `Loading...`}*/}
                    send

                </button>
            </form>
        </div>

    );
}
export default ChekoutElement












// import React, { useEffect, useState } from "react";
// import {
//     useStripe,
//     useElements,
//     PaymentElement,
//     PaymentRequestButtonElement,
// } from "@stripe/react-stripe-js";
//
// interface CheckoutElementProps {
//     amount: number;
//     adress?: {
//         billing_address?: {
//             city?: string;
//             company?: string;
//             firstname?: string;
//             lastname?: string;
//             postcode?: string;
//             region?: { code?: string };
//             street?: string[];
//             telephone?: string;
//             country?: { code?: string };
//         };
//         email?: string;
//     };
//     stripe?: {
//         clientSecret?: string;
//     };
//     // ...any other props you might pass
//     [key: string]: any;
// }
//
// export default function ChekoutElement({
//                                            amount,
//                                            adress,
//                                            stripe: stripeProps,
//                                            ...rest
//                                        }: CheckoutElementProps) {
//     const stripe = useStripe();
//     const elements = useElements();
//
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//
//     // Extract billing details if present
//     const city = adress?.billing_address?.city || "";
//     const countryCode = adress?.billing_address?.country?.code || "";
//     const line1 = adress?.billing_address?.street?.[0] || "";
//     const postalCode = adress?.billing_address?.postcode || "";
//     const stateCode = adress?.billing_address?.region?.code || "";
//     const email = adress?.email || "";
//     const fullName = `${adress?.billing_address?.firstname || ""} ${
//         adress?.billing_address?.lastname || ""
//     }`.trim();
//     const phone = adress?.billing_address?.telephone || "";
//
//     /**
//      * OPTIONAL: Create a separate PaymentMethod for advanced or custom billing flows.
//      * If you're content letting Stripe handle it via the Payment Element,
//      * you can skip this entirely.
//      */
//     const createPaymentMethod = async () => {
//         if (!stripe || !elements) return null;
//
//         // This explicitly creates a PaymentMethod using the PaymentElement billing details.
//         const { paymentMethod, error } = await stripe.createPaymentMethod({
//             type: "card",
//             card: elements.getElement(PaymentElement), // or use the specific CardElement if you have it
//             billing_details: {
//                 address: {
//                     city,
//                     country: countryCode,
//                     line1,
//                     line2: "", // or second line if you have one
//                     postal_code: postalCode,
//                     state: stateCode,
//                 },
//                 email,
//                 name: fullName || "No Name Provided",
//                 phone,
//             },
//         });
//
//         if (error) {
//             setErrorMessage(error.message || "Error creating payment method");
//             return null;
//         }
//
//         return paymentMethod;
//     };
//
//     // Standard handleSubmit for Payment Element
//     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault();
//         setErrorMessage(null);
//         setLoading(true);
//         const {error:submitError} =await  elements.submit()
//        if(submitError){
//            setErrorMessage(submitError.message);
//            setLoading(false);
//           return
//       }
//         if (!stripe || !elements) {
//             setErrorMessage("Stripe has not loaded yet. Please try again.");
//             setLoading(false);
//             return;
//         }
//
//         // If you want to do a custom flow with createPaymentMethod first, do it here:
//         // const pm = await createPaymentMethod();
//         // if (!pm) {
//         //   // We already set errorMessage in createPaymentMethod if something went wrong
//         //   setLoading(false);
//         //   return;
//         // }
//         //
//         // You could optionally send pm.id to your backend, or do something else.
//
//         // Now confirm the payment. PaymentElement can handle the final submission:
//         const clientSecret = stripeProps?.clientSecret;
//         if (!clientSecret) {
//             setErrorMessage("No client secret available. Cannot confirm payment.");
//             setLoading(false);
//             return;
//         }
//
//         const { error } = await stripe.confirmPayment({
//             elements,
//             clientSecret,
//             confirmParams: {
//                 // Where Stripe should redirect after successful payment
//                 return_url: `http://localhost:3000/payment-success?amount=${amount}`,
//             },
//         });
//
//         if (error) {
//             setErrorMessage(error.message || "An unknown error occurred.");
//             setLoading(false);
//             return;
//         }
//
//         // If no error, Stripe will redirect to return_url automatically.
//         // Loading state can remain until redirect or you can handle it differently.
//     }
//
//     return (
//         <form onSubmit={handleSubmit}>
//             {/* Render PaymentElement only if we have a clientSecret */}
//             {stripeProps?.clientSecret && <PaymentElement />}
//
//             {/* Display errors */}
//             {errorMessage && (
//                 <div className="text-red-500 my-2 font-medium">{errorMessage}</div>
//             )}
//
//             <button
//                 type="submit"
//                 disabled={loading || !stripe}
//                 className="text-white bg-black py-2 px-4 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse mt-4"
//             >
//                 {loading ? "Loading..." : `Pay $${amount}`}
//             </button>
//         </form>
//     );
// }
