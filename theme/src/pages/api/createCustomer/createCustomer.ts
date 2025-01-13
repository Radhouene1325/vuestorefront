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
import {CountriesResponse, CreateCustomerMutation} from "@vue-storefront/magento-sdk";
import {MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {CustomQuery} from "@vue-storefront/middleware";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import {CountryInformationQuery, CustomerCreateInput, CustomHeaders} from "@vue-storefront/magento-types";
import {ApolloQueryResult} from "@apollo/client/core";
import {FetchResult} from "@apollo/client";


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
        const result = await sdk.magento.createCustomer<CreateCustomerMutation>(params)


        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
