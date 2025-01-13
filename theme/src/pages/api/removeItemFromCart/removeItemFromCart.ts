import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../../sdk.config";
import {CartResponse, CartTotalQtyResponse, RemoveItemFromCartMutation} from "@vue-storefront/magento-sdk";
import {CustomQuery} from "@vue-storefront/middleware";
import {CustomHeaders, RemoveItemFromCartInput} from "@vue-storefront/magento-types";
import type {FetchResult} from "@apollo/client/core";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import {getCookie} from "cookies-next";

export declare function removeItemFromCart(
    context: Context,
    input: RemoveItemFromCartInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
): Promise<FetchResult<RemoveItemFromCartMutation>>;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
let cartId=await getCookie('cart-id',{req, res});
let token=await getCookie('auth-token',{req, res});

console.log(cartId,token)
console.log("skssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssu",req.body);
    const params = { cart_id: cartId, cart_item_uid: req.body }


    try {

        const response = await sdk.magento.removeItemFromCart<CartResponse>(
            params,
            {
                customHeaders: {
                    Authorization: `Bearer ${token}`
                }
            },

        );
console.log("the response", response);

        res.status(200).json({data: response});


    }catch(e){
        console.error('Direct fetch error:', e);
    }



};



