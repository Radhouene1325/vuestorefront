import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";
import { serialize } from "cookie";
import {BASEURL} from "@/BASEURL/URL";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("the request", req.body);
    const {currentPassword, newPassword} = req.body;
const token=await getCookie('auth-token', {req, res});
console.log("the token", token);

    const result = await sdk.magento.changeCustomerPassword({


        currentPassword: currentPassword,
        newPassword: newPassword,
    },{
        customHeaders: {
            Authorization: `Bearer ${token}`,
        }
    });

    if(!result.errors) {
        res.setHeader(
            'Set-Cookie',
            serialize('auth-token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 0, // Immediately expire the cookie
            })
        );
        // Redirect to the home page


    }

    res.status(200).json({data: result});

};