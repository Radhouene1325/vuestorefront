import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const SS =getCookie("auth-token");
    console.log("the cartId is sdddddddddddddddddddddddexy",SS);
    const ss =await  getCookie("auth-token", { req, res });
    console.log("the cartId is qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",ss);

    const {sku} = req.query;
    console.log("sku",sku);
    const token = req.headers['authorization']?.split(' ')[1];  // Get token from the Authorization header
console.log("token",token);
    try {
        const response = await sdk.magento.productDetails({
            filter: {

                sku: {

                    eq: sku

                }

            }


        })

        res.status(200).json({data: response});


    }catch(e){
        console.error('Direct fetch error:', e);
    }



};