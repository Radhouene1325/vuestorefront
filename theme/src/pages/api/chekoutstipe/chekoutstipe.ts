import {NextApiRequest, NextApiResponse} from 'next'

import {getCookie} from "cookies-next";
import {sdk} from "../../../../sdk.config";
import {queryPayments} from "../../../../customQueryMagento/queryProductsWichList";


const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("the req", req.body);
    const token = await getCookie('auth-token', {req, res});
    const cartId = await getCookie('cart-id', {req, res});
    console.log("the cartId is sexy", token);
    // const {amount} = await req.json();
    console.log("the amount", req.body);



    const params = {

        cart_id: cartId,

        payment_method: {

            code: 'stripe_payments',
            stripe_payments: {
                // payment_element: true,
                payment_method: req.body.paymentMethodResults.paymentMethod.id,
                save_payment_method: true
            }

        }

    };




    const {data} = await sdk.magento.setPaymentMethodOnCart(params, {
        customHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(data)

    // const mutationVariables = {
    //     input: {
    //         cart_id: cartId,
    //     }
    //
    // };
    // const neWpayment=await sdk.magento.customMutation({
    //     queryPayments,
    //     mutationVariables
    //
    // },
    //     {
    //         customHeaders: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //
    //
    // console.log("the payment", neWpayment);




    const result = await sdk.magento.placeOrder({cart_id: cartId}, {
        customHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    // if(result!=null){
    //     res.clearCookie("auth-token","cart-id", { path: "/" });
    //     res.send("Cookie cleared");
    //
    //     window.location.reload()
    // }


    res.json({data: result});


// const {mode,amount,currency,paymentMethodCreation}=req?.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//         // mode: mode,
//         amount: amount,
//         currency: currency,
//         // payment_method_types: paymentMethodCreation,
//         automatic_payment_methods: {enabled: true},
//
//     });
//
// console.log("the paymentIntent in the request server",paymentIntent);
//
//     return res.json({clientSecret: paymentIntent.client_secret})
};