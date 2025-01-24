import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie, setCookie} from "cookies-next";
import { parse } from "cookie";
import { serialize } from "cookie";
import {GenerateCustomerTokenInput, GenerateCustomerTokenResponse} from "@vue-storefront/magento-sdk";
import {MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
 import {CustomQuery} from "@vue-storefront/middleware";
import jwt from 'jsonwebtoken';

export declare function generateCustomerToken<RES extends GenerateCustomerTokenResponse>(

    params: GenerateCustomerTokenInput,

    options?: MethodOptions<CustomQuery<'generateCustomerToken'>>

): Promise<RES>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if (req.method !== 'POST') {
            res.setHeader('Allow', ['POST']);
            return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
        }


        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }


        const response = await sdk.magento.generateCustomerToken<GenerateCustomerTokenResponse>({

            email:email as string,
            password:password as string
        });
        console.log("the response",response);

        const token = response.data?.generateCustomerToken?.token;
        const decoded = jwt.decode(token, process.env.JWT_SECRET as string);

        // Serialize the cookie
        const currentTime = Math.floor(Date.now() / 1000)


        const expirationTime = decoded.exp as number; ///thes expire time for the token

        const expiresIn = expirationTime - currentTime

        if (expiresIn > 0) {
            console.log(`Token will expire in ${expiresIn} seconds.`);
        } else {
            console.log('Token has already expired.');
        }

        if (!token) {
            return res.status(500).json({ message: 'Token generation failed.' });
        }

        res.setHeader(
            'Set-Cookie',
            serialize('auth-token', token, {
                httpOnly: true, // Prevent JavaScript access
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                sameSite: "strict", // Protect against CSRF
                path: "/", // Make cookie accessible across the site
                maxAge: expirationTime, // 1 week
            })
        );


        res.status(200).json({message: 'Authentication successful.'});


    }catch (e) {
        throw new Error(e instanceof Error ? e.message : String(e))
    }



}