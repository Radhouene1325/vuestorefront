import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";
import {authMiddleware} from "../../../../middleware/auth";

import {withMiddleware} from "../../../../utils/withMiddleware";
import {serialize} from "cookie";


export interface AddProductToWishListResponse {
    quanatity: number;
    sku: string;
}
 async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("Request body:", req.body);

        const { quanatity, sku }:{quanatity:number,sku:string} = req.body;

        if (!quanatity || typeof quanatity !== "number") {
            return res.status(400).json({ error: "Invalid or missing 'quantity' in request body." });
        }

        if (!sku) {
            return res.status(400).json({ error: "Invalid or missing 'sku' in request body." });
        }

        const cartIdWichList = await getCookie("wichlist-id", { req, res });
        const token = await getCookie("auth-token", { req, res });

        if (!cartIdWichList || !token) {
            return res.status(401).json({ error: "Missing wishlist ID or authorization token." });
        }

        const response = await sdk.magento.addProductToWishList(
            {
                id: cartIdWichList,
                items: [{ quantity: parseFloat(quanatity), sku }],
            },
            {
                customHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if(response){
            res.setHeader(
                'Set-Cookie',
                serialize('auth-token', '', {

                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                    maxAge: 0,
                })
            );
        }

        res.status(200).json({ data: response });
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        res.status(500).json({ error: "An error occurred while adding product to wishlist." });
    }
}

export default withMiddleware(authMiddleware)(handler) //// thes fuction cab be sing with middlware

// const wishlist = await sdk.magento.addProductToWishList({
//
//     // Wishlist ID
//
//     id: '258',
//
//     // Products to add to wishlist with given ID
//
//     items: [{quantity: 1, sku: 'WSH12'}]
//
// });
// console.log('slmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm addedededdde wiwh list', wishlist)
