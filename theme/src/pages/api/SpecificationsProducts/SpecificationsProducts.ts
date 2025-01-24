




import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";
import { parse } from 'cookie';

import {
    GetAvailableCustomerPaymentMethodsResponse,
    SetBillingAddressOnCartResponse,
    SetShippingAddressesOnCartMutation, SetShippingMethodsOnCartMutation, SubscribeEmailToNewsletterMutation
} from "@vue-storefront/magento-sdk";
import {MethodBaseOptions, MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {AxiosRequestConfig} from "axios";
import {
    BillingAddressInput, CustomHeaders,
    SetBillingAddressOnCartInput,
    SetShippingAddressesOnCartInput, SetShippingMethodsOnCartInput, SubscribeEmailToNewsletterMutationVariables
} from "@vue-storefront/magento-types";
import {CustomQuery} from "@vue-storefront/middleware";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import {FetchResult} from "@apollo/client"; // Import cookie serialization utility


export default async function handler(req: NextApiRequest, res: NextApiResponse) {



    const cartId =await getCookie('cart-id', { req, res });
    const token =await getCookie('auth-token', { req, res });

    console.log('cartId:', cartId);
    console.log('token:', token);
    console.log("the reqssssssssssssssssssssssss seccesss", req.query);


    const response = await sdk.magento.productDetails({

        // pageSize: 4,
        //
        // currentPage: 3,

        filter: {
            url_key: {
                eq: req.query.url_key,

            },
            new:{
                eq:'1'
            }

        }

    });
    console.log("the response", response);
    // Serialize the cookie


    res.status(200).json({data: response});

};