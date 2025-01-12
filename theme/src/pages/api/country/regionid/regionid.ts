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

import {queryIdRegion} from "../../../../../customQueryMagento/queryProductsWichList";
import { sdk } from '../../../../../sdk.config';




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const id = req.body;
        console.log("the id",id);
        // Extract necessary fields from the request body
        const queryVariables = {

            id:id as string,
        };


// use custom mutation and variables to fetch response adjusted to your needs

        const result = await sdk.magento.customQuery({

            query:queryIdRegion,

            queryVariables

        });

        console.log('result is her okyXXXXXXXXXXXXXXX hello', result.data.country)

        res.status(200).json({ data: result.data.country });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
