import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";
import {Context} from "@vue-storefront/magento-api/server/types/context";
import {CustomHeaders, UpdateCustomerAddressMutationVariables} from "@vue-storefront/magento-types";
import {CustomQuery} from "@vue-storefront/middleware";
import {FetchResult} from "@apollo/client";
import {UpdateCustomerAddressMutation} from "@vue-storefront/magento-sdk";

export declare function updateCustomerAddress(
    context: Context,
    params: UpdateCustomerAddressMutationVariables,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders
): Promise<FetchResult<UpdateCustomerAddressMutation>>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("Request body:", req.body);


        const {
            firstname,
            lastname,
            telephone,
            country,

            city,
            street,
            aptNo,
            state,
            zipCode,
            useAsbillingAddress,
            useAsShippingAddress
        } = req.body.formJSON;


        const token = await getCookie("auth-token", { req, res });

        const {id, input}: { id: string, input: {city: string }; } = req.body;


        const response = await sdk.magento.updateCustomerAddress(

            {
                id: req.body.idAdress as string,

                input: {    city: city ,

                    country_code: country,

                    default_billing: useAsbillingAddress,

                    default_shipping: useAsShippingAddress,

                    firstname: firstname,

                    lastname: lastname,

                    postcode: zipCode,

                    street: street,

                    telephone: telephone,

                    region: {

                        region_code: req.body.infoRegion[0].code,

                        region_id: req.body.infoRegion[0].id,

                        region: req.body.infoRegion[0].name

                    } }

            },
            {
                customHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        res.status(200).json({ data: response });
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        res.status(500).json({ error: "An error occurred while adding product to wishlist." });
    }
}

// const wishlist = await sdk.magento.addProductToWishList({
//
//     // Wishlist ID
//
//     id: '258',
//
//     // Products to add to wishlist with given ID
//
//     items: [{quantity: 1, sku: 'WSH12'}]
//
// });
// console.log('slmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm addedededdde wiwh list', wishlist)
