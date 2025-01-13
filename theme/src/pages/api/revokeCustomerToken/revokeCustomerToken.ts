import { NextApiRequest, NextApiResponse } from 'next';
import { sdk } from "../../../../sdk.config";
import { serialize } from "cookie";
import {getCookie} from "cookies-next";
export interface AddProductToWishListResponse {
    itemsId: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let token= await getCookie('auth-token', {req, res});
    try {
        // Revoke customer token using the SDK
        const revokeResponse = await sdk.magento.revokeCustomerToken(
        {
            customHeaders: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
        console.log("the revoke response", revokeResponse);
        if (revokeResponse) {
            // Clear cookies related to the cart, authentication, and wishlist
            // res.setHeader(
            //     'Set-Cookie',
            //     serialize('cart-id', '', {
            //         httpOnly: true,
            //         secure: process.env.NODE_ENV === 'production', // Use 'secure' only if cookies were initially set as secure
            //         sameSite: 'strict', // Add this to match common configurations
            //         path: '/', // Ensure the same path as when the cookie was set
            //         maxAge: 0, // Expire immediately
            //     })
            // );

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

            // res.setHeader(
            //     'Set-Cookie',
            //     serialize('wichlist-id', '', {
            //         httpOnly: true,
            //         secure: process.env.NODE_ENV === 'production',
            //         sameSite: 'strict',
            //         path: '/',
            //         maxAge: 0,
            //     })
            // );
        }

        // Return success response
        res.status(200).json({ data: revokeResponse });
    } catch (error) {
        console.error("Error revoking customer token:", error);

        // Return error response
        res.status(500).json({ error: "An error occurred while revoking the customer token." });
    }
}
