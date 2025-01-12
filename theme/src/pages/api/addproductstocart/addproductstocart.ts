// import {NextApiRequest, NextApiResponse} from 'next'
// import {sdk} from "../../../../sdk.config";
// import {getCookie} from "cookies-next";
// import Cors from 'cors';
// import {AddProductsToCartResponse} from "@vue-storefront/magento-sdk";
// import {AddProductsToCartMutationVariables} from "@vue-storefront/magento-types";
// import {MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
// import {CustomQuery} from "@vue-storefront/middleware";
// import {authMiddleware} from "../../../../middleware/auth";
// import {withMiddleware} from "../../../../utils/withMiddleware";
// import fetchHomePage from "@/utils/fetchHomePage";
// import {serialize} from "cookie";
//
//
// export declare function addProductsToCart<RES extends AddProductsToCartResponse>(
//
//     params: AddProductsToCartMutationVariables,
//
//     options?: MethodOptions<CustomQuery<'addProductsToCart'>>
//
// ): Promise<RES>;
//
//
// async function handler(req: NextApiRequest, res: NextApiResponse) {
//     console.log("the req", req.body);
//
//
//     const cartId = await getCookie("cart-id", {req, res});
//     console.log("the cartId is sexy", cartId);
//
//     const token = await getCookie("auth-token", {req, res});
//     console.log("the cartId is sdddddddddddddddddddddddexy", token);
//
//     const {sku, paramsColor, params, value} = req.body;
//
//     const response = await sdk.magento.addProductsToCart<AddProductsToCartResponse>(
//         {
//
//             cartId: cartId as string,
//
//             cartItems: [
//
//                 {
//
//                     sku: sku as string,
//
//                     quantity: value as number,
//
//                     selected_options: [
//
//                         // option IDs retrieved from product
//
//                         paramsColor as string,
//                         params as string,
//                     ]
//
//                 }
//
//             ]
//
//         },
//
//         {
//             customHeaders: {
//                 Authorization: `Bearer ${token ? token : null}`
//             }
//         }
//     );
//
//
//
//         res.status(200).json({data: response});
//
// }
//
// export default handler

// export default withMiddleware(authMiddleware)(handler); //// thes fuction cab be sing with middlware


import { NextApiRequest, NextApiResponse } from 'next';
import { sdk } from '../../../../sdk.config';
import { getCookie } from 'cookies-next';
import { serialize } from 'cookie';
import { AddProductsToCartResponse } from '@vue-storefront/magento-sdk';
import { AddProductsToCartMutationVariables } from '@vue-storefront/magento-types';
import fetchHomePage from "@/utils/fetchHomePage";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log('Received Request Body:', req.body);

        const cartId = await getCookie('cart-id', {req, res});
        const token = await getCookie('auth-token', {req, res});

        console.log('Cart ID:', cartId);
        console.log('Auth Token:', token);


        if (!cartId) {
            return res.status(400).json({error: 'Cart ID is missing.'});
        }

        const {sku, paramsColor, params, value} = req.body;

        if (!sku || !value) {
            return res.status(400).json({error: 'SKU and quantity are required.'});
        }

        // Attempt to add products to the cart
        const response = await sdk.magento.addProductsToCart<AddProductsToCartResponse>(
            {
                cartId: cartId as string,
                cartItems: [
                    {
                        sku: sku as string,
                        quantity: value as number,
                        selected_options: [paramsColor as string, params as string],
                    },
                ],
            },
            {
                customHeaders: {
                    Authorization: `Bearer ${token || ''}`,
                },
            }
        );
console.log('response', response);
        // Handle errors in the response
        if (response.errors?.length) {
            const errorMessage = response.errors[0].message;
            console.error('Add to Cart Error:', errorMessage);

            // if (errorMessage==`The current user cannot perform operations on cart ${cartId}`) {

                console.log('User cart issue detected. Creating a new guest cart.');

                // Create a new guest cart
                const {data: {data: {createEmptyCart: createEmptyCart}}} = await fetchHomePage.createEmptyCart(token);
                console.log('New cart ID:', createEmptyCart);
                // Set new cart ID in the cookie
                res.setHeader(
                    'Set-Cookie',
                    serialize('cart-id', createEmptyCart, {
                        httpOnly: false,
                        secure: process.env.NODE_ENV === 'production',
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7, // 1 week
                    })
                );

                // Retry adding products to the new cart
                const retryResponse = await sdk.magento.addProductsToCart<AddProductsToCartResponse>(
                    {
                        cartId: createEmptyCart,
                        cartItems: [
                            {
                                sku: sku as string,
                                quantity: value as number,
                                selected_options: [paramsColor as string, params as string],
                            },
                        ],
                    },
                    {
                        customHeaders: {
                            Authorization: `Bearer ${token || ''}`,
                        },
                    }
                );

                return res.status(200).json({data: retryResponse});
            // }

            // If other errors, send the error response
            // return res.status(400).json({error: errorMessage});
        }

        // If no errors, send the successful response
        return res.status(200).json({data: response});
    } catch (error) {
        console.error('Unexpected Error:', error);
        return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
}
