import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../../sdk.config";
import {CartTotalQtyResponse} from "@vue-storefront/magento-sdk";
import {CartQueryVariables} from "@vue-storefront/magento-types";
import {MethodBaseOptions} from "@vue-storefront/magento-sdk/lib/types";
import { parse } from 'cookie';
import {getCookie} from "cookies-next";
import { NextResponse } from 'next/server';

export declare function cartTotalQty<RES extends CartTotalQtyResponse>(

    params: CartQueryVariables,

    options?: MethodBaseOptions

): Promise<RES>;




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log("heloo", req);



    const AA =await getCookie('cart-id',{ req, res });
    console.log("the cartId is sexy",AA);
    // const authToken = await getCookie('auth-token', {req, res});
    // console.log("heloo auth token fdhjvfdivfdvifdvfdv", authToken);
    // console.log("heloo", req);
    const {cartId} = req.query;
    const token =  req.headers.cookie;
    console.log('cdssvadsvadsvdsvfvfv    sdcdscd',token)

    console.log('Raw cookies from forward:', req.headers.cookie);


    // const cookies = parse(req.headers.cookie || '');
    // console.log("Parsed Cookies:", cookies);
    //
    // const authToken = cookies['auth-token'];


    try {
        const response = await sdk.magento.cartTotalQty<CartTotalQtyResponse>(
            {cartId: cartId},
            {
                customHeaders: {
                    Authorization: `Bearer ${token}`,
                    withCredentials: true
                }
            },
        );



        res.status(200).json({data: response});


    } catch (e) {
        console.error('Direct fetch error:', e);
    }


};



