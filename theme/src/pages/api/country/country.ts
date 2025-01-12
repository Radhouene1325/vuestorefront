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
import {CountriesResponse} from "@vue-storefront/magento-sdk";
import {MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {CustomQuery} from "@vue-storefront/middleware";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import {CountryInformationQuery, CustomHeaders} from "@vue-storefront/magento-types";
import {ApolloQueryResult} from "@apollo/client/core";




export declare function countries<RES extends CountriesResponse>(

    options?: MethodOptions<CustomQuery<'countries'>>

): Promise<RES>;


export declare function country(context: Context, id: string, customQuery?: CustomQuery, customHeaders?: CustomHeaders): Promise<ApolloQueryResult<CountryInformationQuery>>;


export type CountryInformationQuery = {
    country?: {
        id?: string | null | undefined;
        two_letter_abbreviation?: string | null | undefined;
        full_name_locale?: string | null | undefined;
        full_name_english?: string | null | undefined;
        available_regions?: Array<{
            id?: number | null | undefined;
            code?: string | null | undefined;
            name?: string | null | undefined;
        } | null | undefined> | null | undefined;
    } | null | undefined;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Extract necessary fields from the request body
        const id  = req.body;


        const customQuery = {   countries: 'countries-custom-query',   metadata: {     fields: 'full_name_english'   } }
        const result = await sdk. magento. countries<CountryInformationQuery>({ id},customQuery );

        console.log("the result",result);

        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
