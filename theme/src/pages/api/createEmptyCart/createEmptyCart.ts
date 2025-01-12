import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie, setCookie} from "cookies-next";
import { parse } from "cookie";
import { serialize } from "cookie";
import {CreateEmptyCartResponse} from "@vue-storefront/magento-sdk";
import {MethodBaseOptions} from "@vue-storefront/magento-sdk/lib/types"; // Import cookie serialization utility

export declare function createEmptyCart<RES extends CreateEmptyCartResponse>(

    options?: MethodBaseOptions

): Promise<RES>;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let customerToken=req.headers.cookie;
    const response = await sdk.magento.createEmptyCart<CreateEmptyCartResponse>({
        customHeaders: {
            Authorization:`Bearer ${customerToken}`
        }
    });
    console.log("the response",response);
    // Serialize the cookie

    res.status(200).json({data: response});

}