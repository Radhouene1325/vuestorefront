import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";
import { parse } from 'cookie';

import {
    GetAvailableCustomerPaymentMethodsResponse,
    SetBillingAddressOnCartResponse,
    SetShippingAddressesOnCartMutation
} from "@vue-storefront/magento-sdk";
import {MethodBaseOptions, MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {AxiosRequestConfig} from "axios";
import {
    BillingAddressInput, CustomHeaders,
    SetBillingAddressOnCartInput,
    SetShippingAddressesOnCartInput
} from "@vue-storefront/magento-types";
import {CustomQuery} from "@vue-storefront/middleware";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import {FetchResult} from "@apollo/client"; // Import cookie serialization utility

export declare function setShippingAddressesOnCart(
    context: Context,
    input: SetShippingAddressesOnCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
): Promise<FetchResult<SetShippingAddressesOnCartMutation>>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {



    const cartId =await getCookie('cart-id', { req, res });
    const token =await getCookie('auth-token', { req, res });

    console.log('cartId:', cartId);
    console.log('token:', token);
    console.log("the reqssssssssssssssssssssssss seccesss", req.body);

    const {

        country,

        firstname,
        lastname,

        street,
        telephone,
        zipCode
    } = req.body.formJSON
    console.log("the is her dvfvfvfd req", lastname,firstname,street,telephone,zipCode);
    const params = {

        cart_id:cartId,

        shipping_addresses: [

            {

                address: {

                    firstname,

                    lastname,

                    city:req.body.infoRegion[0].name,

                    country_code:country,

                    street: [street],

                    telephone,

                    region: req.body.infoRegion[0].code,

                    postcode: zipCode,

                    save_in_address_book: true

                },

            }

        ]

    };






    const response = await sdk.magento.setShippingAddressesOnCart<SetShippingAddressesOnCartMutation>(
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