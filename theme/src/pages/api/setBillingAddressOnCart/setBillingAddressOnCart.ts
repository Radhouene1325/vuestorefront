import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";
import { parse } from 'cookie';

import {GetAvailableCustomerPaymentMethodsResponse, SetBillingAddressOnCartResponse} from "@vue-storefront/magento-sdk";
import {MethodBaseOptions, MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {AxiosRequestConfig} from "axios";
import {BillingAddressInput, SetBillingAddressOnCartInput} from "@vue-storefront/magento-types";
import {CustomQuery} from "@vue-storefront/middleware"; // Import cookie serialization utility

export declare function setBillingAddressOnCart<RES extends SetBillingAddressOnCartResponse>(

    params: SetBillingAddressOnCartInput,

    options?: MethodOptions<CustomQuery<'setBillingAddressOnCart'>>

): Promise<RES>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {



    const cartId =await getCookie('cart-id', { req, res });
    const token =await getCookie('auth-token', { req, res });

    console.log('cartId:', cartId);
    console.log('token:', token);
console.log("the reqssssssssssssssssssssssss seccesss", req.body);

    // const cartId =await getCookie('cart-id',{ req, res });
    // console.log("the cartId is sexy",cartId);

    // const {
    //     city,
    //     country_code,
    //     default_billing,
    //     default_shipping,
    //     firstname,
    //     lastname,
    //     id,
    //     postcode,
    //     prefix,
    //     region,
    //     street,
    //     suffix,
    //     telephone,
    //     vat_id
    // } = req.body
    // console.log("the is her dvfvfvfd req", lastname);
    const {

        country,

        firstname,
        lastname,

        street,
        telephone,
        zipCode
    } = req.body.formJSON
console.log("the is her dvfvfvfd req", lastname,firstname,street,telephone,zipCode);
    const billingAddressInput: SetBillingAddressOnCartInput = {
        cart_id: cartId as string,
        billing_address: {
            address: {
                firstname,
                lastname: lastname, // Add the missing `lastname` field
                city:req.body.infoRegion[0].name,
                country_code:country,
                street: [street],
                telephone,
                region: req.body.infoRegion[0].code, // Update with correct region if necessary
                postcode:zipCode,
                save_in_address_book: true,
            },
        },
    };


    const response = await sdk.magento.setBillingAddressOnCart<SetBillingAddressOnCartResponse>(
        billingAddressInput,
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