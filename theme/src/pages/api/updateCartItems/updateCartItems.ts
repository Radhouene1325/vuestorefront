




import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";
import { parse } from 'cookie';

import {
    GetAvailableCustomerPaymentMethodsResponse,
    SetBillingAddressOnCartResponse,
    SetShippingAddressesOnCartMutation,
    SetShippingMethodsOnCartMutation,
    SubscribeEmailToNewsletterMutation,
    UpdateCartItemsMutation
} from "@vue-storefront/magento-sdk";
import {MethodBaseOptions, MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {AxiosRequestConfig} from "axios";
import {
    BillingAddressInput,
    CustomHeaders,
    SetBillingAddressOnCartInput,
    SetShippingAddressesOnCartInput,
    SetShippingMethodsOnCartInput,
    SubscribeEmailToNewsletterMutationVariables,
    UpdateCartItemsInput
} from "@vue-storefront/magento-types";
import {CustomQuery} from "@vue-storefront/middleware";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import {FetchResult} from "@apollo/client";
export declare function updateCartItems(
    context: Context,
    input: UpdateCartItemsInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
): Promise<FetchResult<UpdateCartItemsMutation>>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {



    const cartId =await getCookie('cart-id', { req, res });
    const token =await getCookie('auth-token', { req, res });

    console.log('cartId:', cartId);
    console.log('token:', token);
    console.log("the reqssssssssssssssssssssssss seccesss", req.body);

    const {idItem, value}: { idItem: string, value: number; } = req.body;

    const email=req.body
    console.log("the is her dvfvfvfd req", email);
    const response = await sdk.magento.updateCartItems<UpdateCartItemsMutation>(
        {
            cart_id: cartId,
            // 'MY=',
            cart_items: [{

                cart_item_uid: idItem,

                quantity: value // update the quantity to 10

            }]
        },
        {
            customHeaders: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log("the response", response);
    // Serialize the cookie


    res.status(200).json({data: response});

};