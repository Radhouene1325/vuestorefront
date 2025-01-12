import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../../sdk.config";
import {CartResponse, CartTotalQtyResponse} from "@vue-storefront/magento-sdk";
import {CartQueryVariables} from "@vue-storefront/magento-types";
import {MethodBaseOptions, MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {CustomQuery} from "@vue-storefront/middleware";

export declare function cart<RES extends CartResponse>(

    params: CartQueryVariables,

    options?: MethodOptions<CustomQuery<'cart'>>

): Promise<RES>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {cartId} = req.query;
    console.log("skssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssu",cartId);
    let customerToken="eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjIsInV0eXBpZCI6MywiaWF0IjoxNzM1OTEyMzM3LCJleHAiOjE3MzU5MTU5Mzd9.kvwmuzNiEmDFhqlcKrMZw7Heo4t49CahyN0irhbs9v0"
    const token =  req.headers.cookie;
    try {

        const response = await sdk.magento.cart<CartResponse>(
            {cartId: cartId},
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



