import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../../sdk.config";
import {CartResponse, CartTotalQtyResponse, RelatedProductsQuery} from "@vue-storefront/magento-sdk";
import {CartQueryVariables, GetProductSearchParams} from "@vue-storefront/magento-types";
import {MethodBaseOptions, MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {CustomQuery} from "@vue-storefront/middleware";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import { CustomHeaders } from "../createCustomerAddress/createCustomerAddress";
import {ApolloQueryResult} from "@apollo/client/core";

// export declare function relatedProducts(
//     context: Context,
//     searchParams?: GetProductSearchParams,
//     customQuery?: CustomQuery,
//     customHeaders?: CustomHeaders
// ): Promise<ApolloQueryResult<RelatedProductsQuery>>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {cartId} = req.query;
    console.log("skssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssu",cartId);
    // let customerToken="eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjIsInV0eXBpZCI6MywiaWF0IjoxNzM1OTEyMzM3LCJleHAiOjE3MzU5MTU5Mzd9.kvwmuzNiEmDFhqlcKrMZw7Heo4t49CahyN0irhbs9v0"
    // const token =  req.headers.cookie;
    const {SKUPRODUCT} = req.query;
    console.log("skssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssu",req.body);
    console.log("",SKUPRODUCT);

    try {

        const response = await sdk.magento.relatedProduct({



            filter: {

                sku: {

                    eq: 'WP12'

                }

            }

        });


        res.status(200).json({data: response});


    }catch(e){
        console.error('Direct fetch error:', e);
    }



};



