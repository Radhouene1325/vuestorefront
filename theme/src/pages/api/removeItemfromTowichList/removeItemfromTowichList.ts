import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../../sdk.config";
import {CartResponse, CartTotalQtyResponse, DeleteCustomerAddressMutation} from "@vue-storefront/magento-sdk";
import {CartQueryVariables} from "@vue-storefront/magento-types";
import {MethodBaseOptions, MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {CustomQuery} from "@vue-storefront/middleware";
import {getCookie} from "cookies-next";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import { CustomHeaders } from "../createCustomerAddress/createCustomerAddress";
import {FetchResult} from "@apollo/client";
export declare function deleteCustomerAddress(
    context: Context,
    addressId: number,
    customHeaders?: CustomHeaders
): Promise<FetchResult<DeleteCustomerAddressMutation>>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token =await  getCookie('auth-token', {req, res});
    console.log("skssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssu",token);

    let id=req.body;
    console.log("heloo",id);
    try {

        const response = await sdk.magento.deleteCustomerAddress<DeleteCustomerAddressMutation>(
            {id: id},
            {
                customHeaders: {
                    Authorization: `Bearer ${token}`
                }
            },

        );


        res.status(200).json({data: response});


    }catch(e){
        console.error('Direct fetch error:', e);
    }



};



