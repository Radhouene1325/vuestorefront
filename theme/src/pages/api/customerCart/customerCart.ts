import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie, setCookie} from "cookies-next";
import { parse } from "cookie";
import { serialize } from "cookie";
import {GetAvailableCustomerPaymentMethodsResponse} from "@vue-storefront/magento-sdk";
import {MethodBaseOptions} from "@vue-storefront/magento-sdk/lib/types";
import {AxiosRequestConfig} from "axios"; // Import cookie serialization utility


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // let customerToken = "eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjIsInV0eXBpZCI6MywiaWF0IjoxNzM1OTEwODgwLCJleHAiOjE3MzU5MTQ0ODB9.NoUMv6bgLGwU0vXSOW09-zt_ZQKp_QXH_o9gUWCtxjM";
    let customerToken = await getCookie('token', {req, res});



    const response =  await sdk.magento.customerCart({
             customHeaders: {
                 Authorization: `Bearer ${customerToken || ''}`,
            }
         });


    console.log("the response", response);
    // Serialize the cookie


    res.status(200).json({data: response});

};