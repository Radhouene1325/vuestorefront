import {NextApiRequest, NextApiResponse} from 'next'
import {getCookie} from "cookies-next";
import {string} from "postcss-selector-parser";
import {sdk} from "../../../../../sdk.config";
import { load } from 'recaptcha-v3';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        console.log("Request body:", req.body);
        // const recaptcha = await load("6Lehdb8qAAAAAM1gawNPMXfUdUU3m-0ZCkicwdpz"); // Replace with your reCAPTCHA v3 site key
        // const token = await recaptcha.execute("requestPasswordResetEmail");

        // const {id}: { id: number; } = req.body;
        // console.log(id)
        // @ts-expect-error: Update the type definition of RequestPasswordResetEmailInput to include the token field if necessary
        // token: req.body.newToken,
        // form: "CUSTOMER_FORGOT_PASSWORD",

console.log(  'aaaaaaaaaaaaaaaaa',
    req.body)
const {email}=req.body;
        const response = await sdk.magento.requestPasswordResetEmail ({
           email:req.body.email,
           // @ts-ignore - Added token field; ensure API supports it
                recaptchaToken:'6LfkJcAqAAAAAGZ3QxMSR2iZbtYvSqed6z8W9Lr1',
           // from: "CUSTOMER_FORGOT_PASSWORD",



        },
        )

        console.log('result is sssssssdeewedwedwedwedeeewdwedwedessssssssssssssssssssssssssssssher oky', response.data.requestPasswordResetEmail)


        res.status(200).json({ data: response });


    // catch (error) {
    //     console.error("Error adding product to wishlist:", error);
    //     res.status(500).json({ error: "An error occurred while adding product to wishlist." });
    // }
}