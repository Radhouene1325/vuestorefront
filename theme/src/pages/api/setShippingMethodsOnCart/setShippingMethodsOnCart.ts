




import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";
import { parse } from 'cookie';

import {
    GetAvailableCustomerPaymentMethodsResponse,
    SetBillingAddressOnCartResponse,
    SetShippingAddressesOnCartMutation, SetShippingMethodsOnCartMutation
} from "@vue-storefront/magento-sdk";
import {MethodBaseOptions, MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {AxiosRequestConfig} from "axios";
import {
    BillingAddressInput, CustomHeaders,
    SetBillingAddressOnCartInput,
    SetShippingAddressesOnCartInput, SetShippingMethodsOnCartInput
} from "@vue-storefront/magento-types";
import {CustomQuery} from "@vue-storefront/middleware";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import {FetchResult} from "@apollo/client"; // Import cookie serialization utility

export declare function setShippingMethodsOnCart(
    context: Context,
    input: SetShippingMethodsOnCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
): Promise<FetchResult<SetShippingMethodsOnCartMutation>>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {



    const cartId =await getCookie('cart-id', { req, res });
    const token =await getCookie('auth-token', { req, res });

    console.log('cartId:', cartId);
    console.log('token:', token);
    console.log("the reqssssssssssssssssssssssss seccesss", req.body);

const {carrier_code,method_code,method_title,value,currency}:{carrier_code:string,method_code:string,method_title:string,value:number,currency:string}=req.body;
const params = {
    cart_id:cartId,
    shipping_methods: [
        {
            carrier_code,
            method_code,

        }
    ]
}



    const response = await sdk.magento.setShippingMethodsOnCart<SetShippingAddressesOnCartMutation>(
        params,
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