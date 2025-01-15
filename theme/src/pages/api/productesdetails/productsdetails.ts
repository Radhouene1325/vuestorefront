import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const SS =getCookie("auth-token");
    console.log("the cartId is sdddddddddddddddddddddddexy",SS);
    const ss =await  getCookie("auth-token", { req, res });
    console.log("the cartId is qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",req.body);

    const {sku,value,slug} = req.body.sku;
    console.log("sku",sku);
       console.log("valzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzue", slug[0]);

    const token = req.headers['authorization']?.split(' ')[1];  // Get token from the Authorization header
console.log("token",token);

    try {
        const response = await sdk.magento.productDetails({
            filter: {

                sku: {

                    eq: sku

                },
                // color: {
                //     eq:JSON.stringify(JSON.parse(sku).object.colorCode)||''
                //     /*JSON.parse(sku).object.colorCode*/
                // },
                //
                // name: {
                //     match: slug[0] as string ? slug[0] as string : null
                // }


            },



        })
        console.log("response",response.data.products.items);

        res.status(200).json({data: response});


    }catch(e){
        console.error('Direct fetch error:', e);
    }



};