import {NextApiRequest, NextApiResponse} from 'next'
import {sdk} from "../../../../sdk.config";
import {CountryCodeEnum, CustomerAddressInput} from "@vue-storefront/magento-types";
import {CreateCustomerAddressResponse} from "@vue-storefront/magento-sdk";
import {MethodOptions} from "@vue-storefront/magento-sdk/lib/types";
import {CustomQuery} from "@vue-storefront/middleware";
import {getCookie} from "cookies-next";
export declare type CustomHeaders = Record<string, string>;

export declare function createCustomerAddress<RES extends CreateCustomerAddressResponse>(

    params: CustomerAddressInput,

    options?: MethodOptions<CustomQuery<'createCustomerAddress'>>

): Promise<RES>;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
console.log("the req of customer adress  her secces",req.body);
    const token =await getCookie('auth-token',{ req, res });
    console.log("the cartId is sexy",token);

const {  firstname,
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
console.log("the is her dvfvfvfd req", country);

let {formattedCode}=req.body;


    const addressInput:CustomerAddressInput = {

        city: city ,

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

        }

    }

   console.log("the customerToken",addressInput);
    const response = await sdk.magento.createCustomerAddress<CreateCustomerAddressResponse>(

        { ...addressInput},
        {
            customHeaders: {
                Authorization: `Bearer ${token}`,
            },
        }

    );
    console.log("the response",response);
    res.status(200).json({ data: response});

}