import {NextApiRequest, NextApiResponse} from 'next'
import {getCookie} from "cookies-next";
import {string} from "postcss-selector-parser";
import mysql from "mysql2/promise";
import {sdk} from "../../../../../sdk.config";
import jwt from "jsonwebtoken";

import bcrypt from 'bcrypt'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const {isemail,password,newToken}=req.body;
   console.log('dcdcdcscsdcsdcdssdcsd', isemail,password)
    let resetRequests=[]
    try {
        // Create a MySQL connection
        const connection = await mysql.createConnection({
            host: 'magento.test', // Update with your database host
            user: 'magento', // Update with your database username
            password: 'magento', // Update with your database password
            database: 'magento' // Update with your Magento database name
        });

        // Query to fetch the reset password token
        const [rows] = await connection.execute(
            `SELECT email, rp_token, rp_token_created_at
             FROM customer_entity
             WHERE email = ?`,
            [isemail]
        );
        console.log('result is qwsqwsqwwqws x dsdcdscddddcsddcsasssdwedefrreregrgergerwdewewfwecerwfewfwe   wefewfewssssssssssssssssssssssher oky', rows[0].rp_token )
        resetRequests = rows;
        bcrypt.compare(rows[0]?.rp_token, '0:3:RxCl4H9Pb51k+7qFe9AhmT7DXqAEH/0jrpPIgXU3DpTxuWfVRXEXqJDsgHs2c/YtTsT2BIdwQI+YWDXA', function(err, result) {
            if (result) {
                console.log("✅ Token is valid!");
            } else {
                console.log("❌ Invalid token!");
            }
        });

        const test=jwt.decode(rows[0]?.rp_token,process.env.JWT_SECRET)
        console.log('sssssssssssssssssssssssssssssssss', test)

        // console.log('result is ssswqwwqwqwqwqwqwqwqsssssssss x dsdcdscddddcsddcsasssdwedefrreregrgergerwdewewfwecerwfewfwe   wefewfewssssssssssssssssssssssher oky', resetRequests)
        // If a token exists, store it

        // const data0 = await fetch('http://magento.test/rest/default/V1/customers/resetPassword', {
        //     method: 'POST',
        //     body: {
        //         email: rows[0]?.email,
        //
        //         newPassword: password,
        //
        //         resetToken: rows[0]?.rp_token
        //     }
        //
        // });
        //
        //
        // console.log('result is ssssssssssss ddewx dsdcdscddddcsddcsasssd21e12e12e2212e12e12e12e1e2ee',data0)


        const response= await sdk.magento.resetPassword( {

            email: rows[0]?.email,

            newPassword:password,

            resetPasswordToken: rows[0]?.rp_token,
            recaptchaToken:newToken

        });
        console.log('result is ssssssssssss ddewx dsdcdscddddcsddcsasssd21e12e12e2212e12e12e12e1e2ee', response)

        res.status(200).json({ data: 'response' });
        // Close the connection
        // await connection.end();
    } catch (error) {
        console.error("Database error:", error);
    }
}