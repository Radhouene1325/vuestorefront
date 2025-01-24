// import {NextApiRequest, NextApiResponse} from 'next'
// import {sdk} from "../../../../sdk.config";
// import gql from "graphql-tag";
//
// module.exports = {
//
//     integrations: {
//
//         magento: {
//
//             customQueries: {
//
//                 'countries-custom-query': ({ variables, metadata }) => ({
//
//                     variables,
//
//                     query: `
//
//              query countriesList {
//
//                countries {
//
//                  ${metadata?.fields}
//
//                }
//
//              }
//
//            `
//
//                 }),
//
//             },
//
//         }
//
//     }
//
// };
//
//
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const id = req.body;
//     console.log("the id",id);
//     // const customQuery ={
//     //     countries: 'countries-custom-query',
//     //
//     //     metadata: {
//     //
//     //         fields: `    available_regions {
//     //   code
//     //   id
//     //   name
//     // }
//     // full_name_english
//     // full_name_locale
//     // id
//     // three_letter_abbreviation
//     // two_letter_abbreviation`
//     //
//     //     }
//     // }
//     // const x = await sdk.magento.countries(id,{customQuery});
//     // console.log("the x",x.data.countries);
//
//     const customQuery = {
//
//         countries: 'countries-custom-query',
//
//         metadata: {
//
//             fields: 'full_name_english'
//
//         }
//
//     };
//
//
//     const result = await sdk.magento.countries({ customQuery });
//     res.status(200).json({ data: result});
//
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { sdk } from '../../../../sdk.config';
import gql from "graphql-tag";
import {
    CountriesResponse,
    CreateCustomerMutation,
    CreateCustomerResponse,
    GenerateCustomerTokenResponse
} from "@vue-storefront/magento-sdk";
import {MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {CustomQuery} from "@vue-storefront/middleware";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import {CountryInformationQuery, CustomerCreateInput, CustomHeaders} from "@vue-storefront/magento-types";
import {ApolloQueryResult} from "@apollo/client/core";
import {FetchResult} from "@apollo/client";
import jwt from "jsonwebtoken";
import {serialize} from "cookie";


export declare function createCustomer(
    context: Context,
    input: CustomerCreateInput,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
): Promise<FetchResult<CreateCustomerMutation>>;

export interface ICreateCustomer {
    email:string,
    firstname:string,
    lastname:string,
    password:string,
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { email, firstname, lastname,password }: ICreateCustomer = req.body;
console.log("the req", req.body);
    try {
        // Extract necessary fields from the request body
        const customQuery = {

            customer: 'create customer-custom-query',

            metadata: {

                fields: 'email firstname lastname'

            }

        };

        const params = {

            email,

            firstname,

            lastname,
            password,

        }
        const result = await sdk.magento.createCustomer(params)


        console.log("the result",result?.data.createCustomerV2.customer.email);

        if(result?.data.createCustomerV2.customer.email) {


            if (!result?.data.createCustomerV2.customer.email || !req.body.password) {
                return res.status(400).json({message: 'Email and password are required.'});
            }


            const response = await sdk.magento.generateCustomerToken({

                email: result?.data?.createCustomerV2?.customer?.email as string,
                password: req?.body?.password as string,

            });
            console.log("the response", response);

            const token = response.data?.generateCustomerToken?.token;
            const decoded = jwt.decode(token, process.env.JWT_SECRET as string);

            // Serialize the cookie
            const currentTime = Math.floor(Date.now() / 1000)


            const expirationTime = decoded?.exp as number; ///thes expire time for the token

            const expiresIn = expirationTime - currentTime

            if (expiresIn > 0) {
                console.log(`Token will expire in ${expiresIn} seconds.`);
            } else {
                console.log('Token has already expired.');
            }

            if (!token) {
                return res.status(500).json({message: 'Token generation failed.'});
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






        }


        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
