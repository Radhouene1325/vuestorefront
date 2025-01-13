import {
    SfSelect,
    SfInput,
    SfCheckbox,
    SfButton,
    SfIconCheckCircle,
    SfIconClose,
    SfListItem, SfRadio, SfLoaderCircular
} from '@storefront-ui/react';
import React, {FormEventHandler, ChangeEvent, FocusEvent, useState, FormEvent, useMemo} from 'react';
import {GetServerSideProps} from "next";
import fetchHomePage from "@/utils/fetchHomePage";
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import {useRouter} from "next/router";
import {sdk} from "../../../sdk.config";
import authenticationuser from "@/utils/authentication";
import {getCookie} from "cookies-next";

// Here you should provide a list of countries you want to support
// or use an up-to-date country list like: https://www.npmjs.com/package/country-list
const countries = ['Germany', 'Great Britain', 'Poland', 'United States of America'] as const;
const states = ['California', 'Florida', 'New York', 'Texas'] as const;
async function sendData(url: string, { arg }) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        throw new Error('Failed to send data');
    }

    return response.json(); // parse JSON response
}

export default function AddressCustmer({data, customerCart, addresses, shippingMethode}) {

    console.log(customerCart)
console.log(shippingMethode)
    const Router = useRouter()

    ////////////setBillingAddressOnCar    createCustomerAddress/////

    const useCombinedMutations = () => {
        const {trigger: setBillingAddress, data: billing, isMutating: isSettingBillingAddress} = useSWRMutation(
            `${BASEURL}/api/setBillingAddressOnCart/setBillingAddressOnCart`,
            sendData
        );

        const {
            trigger: createCustomerAddress,
            data: createAdress,
            isMutating: isCreatingCustomerAddress
        } = useSWRMutation(
            `${BASEURL}/api/createCustomerAddress/createCustomerAddress`,
            sendData
        );

        const trigger = async (data: any) => {
            await setBillingAddress(data);
            await createCustomerAddress(data);
        };

        const isMutating = isSettingBillingAddress || isCreatingCustomerAddress;

        return {trigger, isMutating, billing, createAdress};
    };

// Usage
    const {trigger, billing, createAdress, isMutating} = useCombinedMutations();

    console.log(billing, createAdress)

    /////////////////setBillingAddressOnCar/////////////

    const {countries} = data
    console.log(countries)


    const {trigger: REGION, data: region, error: Error} = useSWRMutation(
        `${BASEURL}/api/country/regionid/regionid`,
        fetchHomePage.regionId
    )

    const handleSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = event.target.value; // Get the selected value (country ID)
        console.log('Selected country:', selectedCountry);
        if (selectedCountry) {
            await REGION(selectedCountry)
        }
    };
    console.log(region?.data?.available_regions);


    const [streetIsValid, setStreetIsValid] = useState(true);


    const validateStreet = (e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
        setStreetIsValid(!!e.target.value);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        /* your submit handler e.g.: */
        const form = e.target as HTMLFormElement;

        // data can be accessed in form of FormData
        const formData = new FormData(form);
        // or JSON object
        const formJSON = Object.fromEntries(formData.entries());
        console.log(formJSON);
        let infoRegion = region?.data?.available_regions.filter((region) => {
            return region.id == formJSON.city
        });
        console.log(infoRegion)
        if (!infoRegion) {
            alert("please select a region   or  please select a country or not existe regin in your cuntry");

        } else {
            if (!formJSON) {
                return ".....we are not able to process your request. Please try again later"
            }
            try {


              await trigger({formJSON, infoRegion}); // POST { name, email } to /api/send-data


            } catch (err) {
                console.error('Error sending data:', err);
            }
        }


    };

    useMemo(() => {
        if (billing && createAdress) {
            // Router.push(`/shippingAdress/shippingAdress`)
            Router.push(`/buildingAdress/verifyBuildingAdress/verifyBuildingAdress`)
        }
    }, [billing,createAdress]);


    console.log(streetIsValid)
    const [checkedState, setCheckedState] = useState('');
    console.log(checkedState)




    const {trigger: getShippingMethode, data: shippingData, error: ErrorShippingMethode,isMutating:mutating} = useSWRMutation(
        `${BASEURL}/api/setShippingMethodsOnCart/setShippingMethodsOnCart`,
        fetchHomePage.setShippingMethodsOnCart
    )


    const handelSelectMethodeShipping = async(event: ChangeEvent<HTMLSelectElement>)=>{
        console.log(event.target.value)
        setCheckedState(event.target.value);

        let res=shippingMethode.filter(e=>e.carrier_code==event.target.value)
        if (res) {
            await getShippingMethode(res[0]);
        }

    }

    // useMemo(async()=>{
    //     let res=shippingMethode.filter(e=>e.carrier_code==checkedState)
    //     console.log(res)
    //     if(res){
    //         await getShippingMethode(res[0]);
    //
    //     }
    //
    // },[checkedState])

    return (

        <>
            <div className="flex justify-center py-10 bg-neutral-100 min-h-screen">
                {/* Form wrapper */}
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-1">Billing Address</h2>
                        <p className="text-sm text-neutral-600">
                            Please provide your billing details below.
                        </p>
                    </div>

                    <form
                        onSubmit={onSubmit}
                        className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 text-neutral-900"
                    >
                        {/* First Name */}
                        <label className="flex flex-col gap-1">
                            <span className="typography-text-sm font-medium">First Name</span>
                            <SfInput
                                name="firstname"
                                autoComplete="given-name"
                                required
                                className="border border-neutral-300 rounded-md px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent placeholder-neutral-400"
                            />
                        </label>

                        {/* Last Name */}
                        <label className="flex flex-col gap-1">
                            <span className="typography-text-sm font-medium">Last Name</span>
                            <SfInput
                                name="lastname"
                                autoComplete="family-name"
                                required
                                className="border border-neutral-300 rounded-md px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent placeholder-neutral-400"
                            />
                        </label>

                        {/* Phone */}
                        <label className="flex flex-col gap-1 col-span-full">
                            <span className="typography-text-sm font-medium">Phone</span>
                            <SfInput
                                name="telephone"
                                type="tel"
                                autoComplete="tel"
                                required
                                className="border border-neutral-300 rounded-md px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent placeholder-neutral-400"
                            />
                        </label>

                        {/* Country */}
                        <label className="flex flex-col gap-1">
                            <span className="typography-text-sm font-medium">Country</span>
                            <SfSelect
                                name="country"
                                placeholder="-- Select --"
                                autoComplete="country-name"
                                required
                                onChange={handleSelect}
                                className="border border-neutral-300 rounded-md px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent text-neutral-900 placeholder-neutral-400"
                            >
                                {countries.map((countryName) => (
                                    <option key={countryName.id} value={countryName.id}>
                                        {countryName.full_name_english}
                                    </option>
                                ))}
                            </SfSelect>
                        </label>

                        {/* City */}
                        <label className="flex flex-col gap-1">
                            <span className="typography-text-sm font-medium">City</span>
                            <SfSelect
                                name="city"
                                placeholder="-- Select --"
                                autoComplete="address-level2"
                                required
                                className="border border-neutral-300 rounded-md px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent text-neutral-900 placeholder-neutral-400"
                            >
                                {region?.data?.available_regions?.map((region) => (
                                    <option key={region.id} value={region.id}>
                                        {region.name}
                                    </option>
                                ))}
                            </SfSelect>
                        </label>

                        {/* Street */}
                        <label className="flex flex-col gap-1 col-span-full">
                            <span className="typography-text-sm font-medium">Street</span>
                            <SfInput
                                name="street"
                                autoComplete="address-line1"
                                onBlur={validateStreet}
                                onChange={validateStreet}
                                required
                                invalid={!streetIsValid}
                                className={`border rounded-md px-3 py-2 
                     focus:outline-none focus:ring-2 
                     ${
                                    streetIsValid
                                        ? 'border-neutral-300 focus:ring-blue-500 focus:border-transparent'
                                        : 'border-negative-400 focus:ring-negative-500 focus:border-transparent'
                                }
                     placeholder-neutral-400`}
                            />
                            {!streetIsValid && (
                                <strong className="typography-error-sm text-negative-700 font-medium mt-1">
                                    Please provide a valid street name
                                </strong>
                            )}
                            <small className="typography-hint-xs text-neutral-500 mt-1">
                                Street address or P.O. Box
                            </small>
                        </label>

                        {/* Apt Number */}
                        <label className="flex flex-col gap-1">
                            <span className="typography-text-sm font-medium">Apt#, Suite, etc</span>
                            <SfInput
                                name="aptNo"
                                className="border border-neutral-300 rounded-md px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent placeholder-neutral-400"
                            />
                            <small className="typography-hint-xs text-neutral-500 mt-1">Optional</small>
                        </label>

                        {/* State */}
                        <label className="flex flex-col gap-1">
                            <span className="typography-text-sm font-medium">State</span>
                            <SfSelect
                                name="state"
                                placeholder="-- Select --"
                                autoComplete="address-level1"
                                required
                                className="border border-neutral-300 rounded-md px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent text-neutral-900 placeholder-neutral-400"
                            >
                                {states.map((stateName) => (
                                    <option key={stateName}>{stateName}</option>
                                ))}
                            </SfSelect>
                        </label>

                        {/* ZIP Code */}
                        <label className="flex flex-col gap-1">
                            <span className="typography-text-sm font-medium">ZIP Code</span>
                            <SfInput
                                name="zipCode"
                                placeholder="e.g., 12345"
                                autoComplete="postal-code"
                                required
                                className="border border-neutral-300 rounded-md px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent placeholder-neutral-400"
                            />
                        </label>

                        {/* Use as Shipping Address */}
                        <label className="flex items-center gap-2 col-span-full mt-2">
                            <SfCheckbox name="useAsShippingAddress"/>
                            Use as shipping address
                        </label>


                        <div className="col-span-full">

                            {shippingMethode?.map(
                                ({
                                     amount,
                                     carrier_code,
                                     method_title,
                                     price_excl_tax,
                                 }) => (
                                    <SfListItem
                                        as="label"
                                        key={carrier_code}
                                        slotPrefix={
                                            <SfRadio
                                                name="delivery-options"
                                                value={carrier_code}
                                                checked={checkedState === carrier_code}
                                                onChange={handelSelectMethodeShipping}
                                            />
                                        }
                                        slotSuffix={
                                            <span className="text-gray-900">
                                           <span>{price_excl_tax.currency}</span>
                                                {price_excl_tax.value}{' '}

                                                EURO
                                               </span>
                                        }
                                        className="!items-start max-w-sm border rounded-md border-neutral-200 first-of-type:mr-4 first-of-type:mb-4"
                                    >
                                        {method_title}
                                    </SfListItem>
                                )
                            )}
                            {mutating && <div className="flex gap-4 flex-wrap">
                                <SfLoaderCircular className="!text-cyan-700" size="2xl"/>

                            </div>}
                        </div>


                        {/* Buttons */}
                        <div className="flex gap-4 col-span-full justify-end mt-4">
                            <SfButton type="reset" variant="secondary">
                                Clear All
                            </SfButton>
                            <SfButton type="submit" disabled={!shippingData}>Save</SfButton>
                        </div>
                    </form>


                </div>
                <div className="w-50 md:w-90 flex flex-col gap-8">
                    <h2 className="text-lg font-bold">Shipping Address</h2>

                    {/* Scrollable container */}
                    <div className="max-h-[830px] overflow-y-auto">

                        <div>
                            {addresses?.addresses?.map((address) => (
                                <div
                                    key={address.id}
                                    className="flex flex-col min-w-[325px] max-w-full lg:w-40 relative border border-neutral-200 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
                                >
                                    <h3 className="font-medium typography-text-base mb-2">
                                        Customer Information
                                    </h3>
                                    <p className="text-sm">
                                        <strong>Nome:</strong> {address.firstname || 'N/A'}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Cognome:</strong> {address.lastname || 'N/A'}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Telefono:</strong> {address.telephone || 'N/A'}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Country Code:</strong> {address.country_code || 'N/A'}
                                    </p>
                                    <p className="text-sm">
                                        <strong>Region:</strong> {address.region?.region || 'N/A'}
                                    </p>
                                    <p className="text-sm">
                                        <strong>street:</strong> {address.postcode || 'N/A'},{address.street[0] || 'N/A'},
                                    </p>
                                    <SfButton size="sm" variant="tertiary" className="mt-4" onClick={() => {
                                        handleSelect(address.id)
                                    }}>
                                        Select
                                    </SfButton>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>





        </>


    );



};

export const getServerSideProps: GetServerSideProps = async (context: any, ...rest: any) => {
    const {req, res} = context

    const {data: {data: data}} = await fetchHomePage.countries()
const cartId=await getCookie('cart-id', {req, res});

    let customerToken = await getCookie('auth-token', {req, res});
    // console.log('hello tokensdclksdcjdnsc', customerToken)

    const {data: customerCart} = await authenticationuser.customerCart(customerToken as string)
    // console.log('customer count adress is a velibal', customerCart)

    // const result = await sdk.magento.customerCart({
    //     customHeaders: {
    //         Authorization: `Bearer ${token || ''}`,
    //     }
    // });
    // console.log('her is the cusimer adress is oky ', result.data.customerCart.billing_address);

    // const cartId=await getCookie('cart-id', {req, res})
    // console.log('cart id is ', cartId)
    // const result = await sdk.magento.getAvailableShippingMethods({
    //
    //     cart_id: cartId
    //
    // },{
    //     customHeaders: {
    //         Authorization: `Bearer ${customerToken || ''}`,
    //     }
    //     }
    //     );
    //
    // console.log('her is the cusimer adress is oky ', result.data.cart.shipping_addresses[0]);

    const result = await sdk.magento.getAvailableCustomerShippingMethods({
        customHeaders: {
            Authorization: `Bearer ${customerToken || ''}`,
        }
    },{cart_id: cartId});

    console.log('result is her oky hqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqello', result)


    const {data: {customer: addresses}} = await sdk.magento.getCustomerAddresses({
        customHeaders: {
            Authorization: `Bearer ${customerToken || ''}`,
        }
    });

    return {
        props: {
            data,
            customerCart,
            addresses,
            shippingMethode: result?.data?.customerCart?.shipping_addresses[0]?.available_shipping_methods,
        },
    };
};
