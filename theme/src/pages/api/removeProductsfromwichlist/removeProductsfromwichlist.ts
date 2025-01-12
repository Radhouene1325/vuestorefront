import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";

export interface AddProductToWishListResponse {

    itemsId: number;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("Request body:", req.body);

        const {id}: { id: number; } = req.body;
console.log(id)



        const cartIdWichList = await getCookie("wichlist-id", { req, res });
        const token = await getCookie("auth-token", { req, res });

        if (!cartIdWichList || !token) {
            return res.status(401).json({ error: "Missing wishlist ID or authorization token." });
        }

        const response = await sdk.magento.removeProductsFromWishlist(
            {
                id: cartIdWichList,
                items: [id],
            },
            {
                customHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        res.status(200).json({ data: response });
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        res.status(500).json({ error: "An error occurred while adding product to wishlist." });
    }
}

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
