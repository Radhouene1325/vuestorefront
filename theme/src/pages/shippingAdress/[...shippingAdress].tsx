import {
    SfSelect,
    SfInput,
    SfCheckbox,
    SfButton,
    SfListItem,
    SfRadio,
    SfIconCheckCircle,
    SfIconClose, SfLoaderCircular
} from '@storefront-ui/react';
import React, {FormEventHandler, ChangeEvent, FocusEvent, useState, FormEvent, useMemo, useEffect} from 'react';
import {GetServerSideProps} from "next";
import fetchHomePage from "@/utils/fetchHomePage";
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import {useRouter} from "next/router";
import {sdk} from "../../../sdk.config";
import authenticationuser from "@/utils/authentication";
import {getCookie} from "cookies-next";
import ProductCard from "@/components/categories/productsCart/ProductsCart";
import {Pagination} from "@/components/categories/pagination/Pagination";
// Here you should provide a list of countries you want to support
// or use an up-to-date country list like: https://www.npmjs.com/package/country-list
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

export default function AddressCustmer({data, customerCart,addresses}) {
 console.log(addresses)
    console.log(customerCart.data)

    const Router = useRouter()

    ////////////setBillingAddressOnCar/////

    const {trigger, data: adress, error, isMutating} = useSWRMutation(
        `${BASEURL}/api/setShippingAddressesOnCart/setShippingAddressesOnCart`,
        sendData
    );
    const {trigger: setBillingAddres, data: billing, isMutating: isSettingBillingAddres} = useSWRMutation(
        `${BASEURL}/api/setBillingAddressOnCart/setBillingAddressOnCart`,
        sendData
    );
    /////////////////setBillingAddressOnCar/////////////

    const {countries} = data as const
    console.log(countries)


    const {trigger:REGION,data:region,error:Error} = useSWRMutation(
        `${BASEURL}/api/country/regionid/regionid`,
        fetchHomePage.regionId
    )

    const handleSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = event.target.value; // Get the selected value (country ID)
        console.log('Selected country:', selectedCountry);
        if(selectedCountry){
            await REGION(selectedCountry)
        }
    };
    console.log(region?.data?.available_regions);


    const [streetIsValid, setStreetIsValid] = useState(true);

const [billingAddress, setBillingAddress] = useState<Record<string, any>> ({})


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
        let infoRegion = region?.data?.available_regions.filter((region: { id: FormDataEntryValue; }) => {
            return region.id ==formJSON.city
        });
        console.log(infoRegion)
        if(!infoRegion){
            alert("please select a region   or  please select a country or not existe regin in your cuntry");

        }else{
            if (!formJSON) {
                return ".....we are not able to process your request. Please try again later"
            }
            try {
                setBillingAddress({formJSON, infoRegion})
                await trigger({formJSON, infoRegion}); // POST { name, email } to /api/send-data

                if(formJSON?.useAsShippingAddress){
                    await setBillingAddres({formJSON, infoRegion});
                }

            } catch (err) {
                console.error('Error sending data:', err);
            }
        }


    };


    console.log(billing?.data?.data?.setBillingAddressOnCart?.cart?.billing_address)
    console.log(adress)

    // let adressUser = adress?.data.data.createCustomerAddress
    useMemo(async () => {
        if (adress) {
            // if(billing?.data?.data?.setBillingAddressOnCart?.cart?.billing_address === undefined){
            // }else {
            //     await Router.push(`/chekout/chekout`)
            // }

                await Router.push(`/buildingAdress/buildingAdress`)
            // await Router.push(billing?.data?.data?.setBillingAddressOnCart?.cart?.billing_address === undefined ? `/buildingAdress/buildingAdress` : `/buildingAdress/verifyBuildingAdress/verifyBuildingAdress`);
        }
    }, [adress,billing]);


    console.log(streetIsValid)


    // const handleSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
    //     const adress = event.target.value; // Get the selected value (country ID)
    //     console.log(adress);
    //     console.log('Selected country:', adress);
    //     // if(selectedCountry){
    //     //     await REGION(selectedCountry)
    //     // }
    // };

    const [checkedState, setCheckedState] = useState(false);

console.log(checkedState)
    //
    // useMemo(async () => {
    //     console.log(billingAddress);
    //
    //     if (checkedState) {
    //         console.log("Use billing address as shipping address add")
    //                 await setBillingAddres(billingAddress)
    //     } else {
    //         console.log("Use billing address as shipping address remove")
    //     }
    //
    // }, [checkedState]);
    // console.log(billing);


    return (
        <div className="container mx-auto ">
            {/* Main Flexbox Layout */}
            <div className="flex flex-col lg:flex-row gap-8 pt-40">
                {/* Left Column: Billing Form */}

                <div className="container mx-auto p-8">
                    {/* Main Flexbox Layout */}
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Left Column: Billing Form */}
                        <div className="flex-1">
                            <form
                                className="grid grid-cols-1 gap-4 bg-white p-6 rounded-md shadow-md lg:grid-cols-2 lg:gap-6"
                                onSubmit={onSubmit}
                            >
                                <h2 className="col-span-full text-lg font-bold md:text-xl">
                                    Create New Shipping Address
                                </h2>

                                {/* First Name */}
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-gray-700">First Name</span>
                                    <input
                                        type="text"
                                        name="firstname"
                                        autoComplete="given-name"
                                        required
                                        disabled={isMutating}
                                        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm
                  placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </label>

                                {/* Last Name */}
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-gray-700">Last Name</span>
                                    <input
                                        type="text"
                                        name="lastname"
                                        autoComplete="family-name"
                                        required
                                        disabled={isMutating}
                                        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm
                  placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </label>

                                {/* Phone */}
                                <label className="col-span-full flex flex-col gap-1">
                                    <span className="text-sm font-medium text-gray-700">Phone</span>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        autoComplete="tel"
                                        required
                                        disabled={isMutating}
                                        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm
                  placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </label>

                                {/* Country */}
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-gray-700">Country</span>
                                    <select
                                        name="country"
                                        required
                                        disabled={isMutating}
                                        onChange={handleSelect}
                                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">-- Select --</option>
                                        {countries.map((country) => (
                                            <option key={country.id} value={country.id}>
                                                {country.full_name_english}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                {/* City */}
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-gray-700">City</span>
                                    <select
                                        name="city"
                                        placeholder="-- Select --"
                                        autoComplete="address-level2"
                                        required
                                        disabled={isMutating}
                                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        {region?.data?.available_regions?.map((region: {
                                            id: React.Key | readonly string[] | null | undefined;
                                            name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined;
                                        }) => (
                                            <option key={region.id} value={region.id}>
                                                {region.name}
                                            </option>
                                        ))}
                                    </select>


                                </label>

                                {/* Street */}
                                <label className="col-span-full flex flex-col gap-1">
                                    <span className="text-sm font-medium text-gray-700">Street</span>
                                    <input
                                        type="text"
                                        name="street"
                                        autoComplete="address-line1"
                                        onBlur={validateStreet}
                                        onChange={validateStreet}
                                        required
                                        disabled={isMutating}
                                        className={`rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-indigo-500
                  placeholder:text-gray-400 
                  ${
                                            streetIsValid
                                                ? 'border-gray-300 text-gray-900 focus:border-indigo-500'
                                                : 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                                        }
                `}
                                    />
                                    {!streetIsValid && (
                                        <strong className="text-sm font-medium text-red-700">
                                            Please provide a valid street name
                                        </strong>
                                    )}
                                    <small className="mt-1 text-xs text-gray-500">
                                        Street address or P.O. Box
                                    </small>
                                </label>

                                {/* Apt Number */}
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-gray-700">Apt#, Suite, etc</span>
                                    <input
                                        name="aptNo"
                                        disabled={isMutating}
                                        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm
                  placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <small className="mt-1 text-xs text-gray-500">Optional</small>
                                </label>

                                {/* State */}
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-gray-700">State</span>
                                    <select
                                        name="state"
                                        required
                                        disabled={isMutating}
                                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
                  focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">-- Select --</option>
                                        {states.map((stateName) => (
                                            <option key={stateName}>{stateName}</option>
                                        ))}
                                    </select>
                                </label>

                                {/* ZIP Code */}
                                <label className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-gray-700">ZIP Code</span>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        placeholder="e.g., 12345"
                                        autoComplete="postal-code"
                                        required
                                        disabled={isMutating}
                                        className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm
                  placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </label>

                                {/* Use as Shipping Address */}
                                <label className="col-span-full flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="useAsShippingAddress"
                                        checked={checkedState}
                                        onChange={() => setCheckedState(!checkedState)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-gray-700">
                Use billing address as shipping address
              </span>
                                </label>

                                {/* Buttons */}
                                <div className="col-span-full flex justify-end gap-4">
                                    <button
                                        type="reset"
                                        disabled={isMutating}
                                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium
                  text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isMutating}
                                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium
                  text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* (Right Column can go here if needed) */}
                    </div>
                </div>
                {/*<div className="w-50 md:w-90 flex flex-col gap-8">*/}
                {/*    <h2 className="text-lg font-bold">Shipping Address</h2>*/}

                {/*    /!* Scrollable container *!/*/}
                {/*    <div className="max-h-[830px] overflow-y-auto">*/}

                {/*        <div >*/}
                {/*            {addresses?.addresses?.map((address) => (*/}
                {/*                <div*/}
                {/*                    key={address.id}*/}
                {/*                    className="flex flex-col min-w-[325px] max-w-full lg:w-40 relative border border-neutral-200 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 p-4"*/}
                {/*                >*/}
                {/*                    <h3 className="font-medium typography-text-base mb-2">*/}
                {/*                        Customer Information*/}
                {/*                    </h3>*/}
                {/*                    <p className="text-sm">*/}
                {/*                        <strong>Nome:</strong> {address.firstname || 'N/A'}*/}
                {/*                    </p>*/}
                {/*                    <p className="text-sm">*/}
                {/*                        <strong>Cognome:</strong> {address.lastname || 'N/A'}*/}
                {/*                    </p>*/}
                {/*                    <p className="text-sm">*/}
                {/*                        <strong>Telefono:</strong> {address.telephone || 'N/A'}*/}
                {/*                    </p>*/}
                {/*                    <p className="text-sm">*/}
                {/*                        <strong>Country Code:</strong> {address.country_code || 'N/A'}*/}
                {/*                    </p>*/}
                {/*                    <p className="text-sm">*/}
                {/*                        <strong>Region:</strong> {address.region?.region || 'N/A'}*/}
                {/*                    </p>*/}
                {/*                    <p className="text-sm">*/}
                {/*                        <strong>street:</strong> {address.postcode || 'N/A'},{address.street[0] || 'N/A'},*/}
                {/*                    </p>*/}
                {/*                    <SfButton size="sm" variant="tertiary" className="mt-4" onClick={() => {handleSelect(address.id)}}>*/}
                {/*                        Select*/}
                {/*                    </SfButton>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}


            </div>




        </div>



        /*<div className="flex flex-col lg:flex-row justify-between p-8 gap-8">
            {/!* Product Cards *!/}

            {/!* Billing Form *!/}
            <form className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 text-neutral-900" onSubmit={onSubmit}>
                <h2 className="col-span-full typography-headline-4 md:typography-headline-3 font-bold">Shipping
                    Address</h2>

                {/!* First Name *!/}
                <label className="flex flex-col gap-1">
                    <span className="typography-text-sm font-medium">First Name</span>
                    <SfInput name="firstname" autoComplete="given-name" required/>
                </label>

                {/!* Last Name *!/}
                <label className="flex flex-col gap-1">
                    <span className="typography-text-sm font-medium">Last Name</span>
                    <SfInput name="lastname" autoComplete="family-name" required/>
                </label>

                {/!* Phone *!/}
                <label className="flex flex-col gap-1 col-span-full">
                    <span className="typography-text-sm font-medium">Phone</span>
                    <SfInput name="telephone" type="tel" autoComplete="tel" required/>
                </label>

                {/!* Country *!/}
                <label className="flex flex-col gap-1">
                    <span className="typography-text-sm font-medium">Country</span>
                    <SfSelect name="country" placeholder="-- Select --" autoComplete="country-name" required
                              onChange={handleSelect}>
                        {countries.map((countryName) => (
                            <option key={countryName.id} value={countryName.id}>{countryName.full_name_english}</option>
                        ))}
                    </SfSelect>
                </label>
                {/!* City *!/}
                <label className="flex flex-col gap-1">
                    <span className="typography-text-sm font-medium">City</span>
                    <SfSelect name="city" placeholder="-- Select --" autoComplete="address-level2" required
                    >
                        {region?.data?.available_regions?.map((region) => (
                            <option key={region.id} value={region.id}>{region.name}</option>
                        ))}
                    </SfSelect>
                </label>

                {/!* Street *!/}
                <label className="flex flex-col gap-1 col-span-full">
                    <span className="typography-text-sm font-medium">Street</span>
                    <SfInput
                        name="street"
                        autoComplete="address-line1"
                        onBlur={validateStreet}
                        onChange={validateStreet}
                        required
                        invalid={!streetIsValid}
                    />
                    {!streetIsValid && (
                        <strong className="typography-error-sm text-negative-700 font-medium">Please provide a valid
                            street name</strong>
                    )}
                    <small className="typography-hint-xs text-neutral-500 mt-1">Street address or P.O. Box</small>
                </label>

                {/!* Apt Number *!/}
                <label className="flex flex-col gap-1">
                    <span className="typography-text-sm font-medium">Apt#, Suite, etc</span>
                    <SfInput name="aptNo"/>
                    <small className="typography-hint-xs text-neutral-500 mt-1">Optional</small>
                </label>

                {/!*!/!* City *!/!*!/}
                {/!*<label className="flex flex-col gap-1">*!/}
                {/!*    <span className="typography-text-sm font-medium">City</span>*!/}
                {/!*    <SfInput name="city" autoComplete="address-level2" required/>*!/}
                {/!*</label>*!/}

                {/!* State *!/}
                <label className="flex flex-col gap-1">
                    <span className="typography-text-sm font-medium">State</span>
                    <SfSelect name="state" placeholder="-- Select --" autoComplete="address-level1" required>
                        {states.map((stateName) => (
                            <option key={stateName}>{stateName}</option>
                        ))}
                    </SfSelect>
                </label>

                {/!* ZIP Code *!/}
                <label className="flex flex-col gap-1">
                    <span className="typography-text-sm font-medium">ZIP Code</span>
                    <SfInput name="zipCode" placeholder="e.g., 12345" autoComplete="postal-code" required/>
                </label>

                {/!* Use as Shipping Address *!/}
                <label className="flex items-center gap-2 col-span-full">
                    <SfCheckbox name="useAsShippingAddress"/>
                    Use a billing adress as shipping address
                </label>

                <div>
                    {shippingMethode.map(({amount, available, carrier_code,method_code,method_title,price_excl_tax,price_incl_tax}) => (
                        <SfListItem
                            as="label"
                            key={carrier_code}
                            slotPrefix={
                                <SfRadio
                                    name="delivery-options"
                                    value={carrier_code}
                                    checked={checkedState === carrier_code}
                                    onChange={(event) => {
                                        setCheckedState(event.target.value);
                                    }}
                                />
                            }
                            slotSuffix={<span className="text-gray-900"><span>{price_excl_tax.currency}</span> {price_excl_tax.value} EURO</span>}
                            className="!items-start max-w-sm border rounded-md border-neutral-200 first-of-type:mr-4 first-of-type:mb-4"
                        >
                            {method_title}
                            {/!*<span className="text-xs text-gray-500 break-words">{date}</span>*!/}
                        </SfListItem>
                    ))}
                </div>
                {/!* Buttons *!/}
                <div className="flex gap-4 col-span-full justify-end">
                    <SfButton type="reset" variant="secondary">
                        Clear All
                    </SfButton>
                    <SfButton type="submit">Save</SfButton>
                </div>
            </form>

            {


                addresses?.addresses?.map((address) => (
                    <div className="flex flex-col gap-4 lg:gap-6 lg:flex-nowrap">
                        <div
                            key="hello"
                            className="flex flex-col min-w-[325px] max-w-[375px] lg:w-[496px] relative border border-neutral-200 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {/!* Link *!/}
                            <a
                                className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-md"
                                href="#"
                                aria-label="View customer billing details"
                            />

                            {/!* Card Content *!/}
                            <div className="flex flex-col items-start p-4 grow">
                                <div className="mb-4">
                                    <h3 className="font-medium typography-text-base">Customer Information</h3>
                                </div>

                                {/!* Name *!/}
                                <div className="flex flex-col gap-1 mb-4">
                <span className="font-normal typography-text-sm text-neutral-700">
                    <strong>Nome:</strong> {customerCart?.data?.customerCart?.billing_address?.firstname || 'N/A'}
                </span>
                                    <span className="font-normal typography-text-sm text-neutral-700">
                    <strong>Cognome:</strong> {customerCart?.data?.customerCart?.billing_address?.lastname || 'N/A'}
                </span>
                                    <span className="font-normal typography-text-sm text-neutral-700">
                    <strong>Telefono:</strong> {customerCart?.data?.customerCart?.billing_address?.telephone || 'N/A'}
                </span>
                                </div>

                                {/!* Address Details *!/}
                                <div className="flex flex-col gap-1 mb-4">
                <span className="font-medium typography-text-base">
                    <strong>Country Code:</strong> {customerCart?.data?.customerCart?.billing_address?.country?.code || 'N/A'}
                </span>
                                    <span className="font-normal typography-text-sm text-neutral-700">
                    <strong>Region:</strong> {customerCart?.data?.customerCart?.billing_address?.region?.label || 'N/A'}
                </span>
                                    <span className="font-normal typography-text-sm text-neutral-700">
                    <strong>Region Code:</strong> {customerCart?.data?.customerCart?.billing_address?.region?.code || 'N/A'}
                </span>
                                </div>

                                {/!* Button *!/}
                                <SfButton
                                    size="sm"
                                    variant="tertiary"
                                    className="relative mt-auto"
                                    aria-label="Select this billing address"
                                >
                                    Select
                                </SfButton>
                            </div>
                        </div>
                    </div>
                ))

            }


        </div>
*/
    );
};



// const Shipppingmethode=({shippingMethode}: { shippingMethode: { amount: number; carrier_code: string; method_title: string; price_excl_tax: { currency: string; value: number } }[] })=>{
//     const [checkedState, setCheckedState] = useState('');
//     console.log(checkedState)
//     const {trigger: getShippingMethode, data: shippingData, error: ErrorShippingMethode,isMutating:mutating} = useSWRMutation(
//         `${BASEURL}/api/setShippingMethodsOnCart/setShippingMethodsOnCart`,
//         fetchHomePage.setShippingMethodsOnCart
//     )
//
//
//     const handelSelectMethodeShipping = async(event: ChangeEvent<HTMLSelectElement>)=>{
//         console.log(event.target.value)
//         setCheckedState(event.target.value);
//
//         let res=shippingMethode.filter((e: { carrier_code: string; })=>e.carrier_code==event.target.value)
//         if (res) {
//             await getShippingMethode(res[0]);
//         }
//
//     }
//
//     return(
//         <div className="col-span-full">
//               <>hello</>
//             {shippingMethode?.map(
//                 ({
//                      amount,
//                      carrier_code,
//                      method_title,
//                      price_excl_tax,
//                  }) => (
//                     <SfListItem
//                         as="label"
//                         key={carrier_code}
//                         slotPrefix={
//                             <SfRadio
//                                 name="delivery-options"
//                                 value={carrier_code}
//                                 checked={checkedState === carrier_code}
//                                 onChange={(event: ChangeEvent<HTMLInputElement>) => handelSelectMethodeShipping(event as unknown as ChangeEvent<HTMLSelectElement>)}
//                             />
//                         }
//                         slotSuffix={
//                             <span className="text-gray-900">
//                                            <span>{price_excl_tax.currency}</span>
//                                 {price_excl_tax.value}{' '}
//
//                                 EURO
//                                                </span>
//                         }
//                         className="!items-start max-w-sm border rounded-md border-neutral-200 first-of-type:mr-4 first-of-type:mb-4"
//                     >
//                         {method_title}
//                     </SfListItem>
//                 )
//             )}
//             {mutating && <div className="flex gap-4 flex-wrap">
//                 <SfLoaderCircular className="!text-cyan-700" size="2xl"/>
//
//             </div>}
//         </div>
//         )
//
// }
//

export const getServerSideProps: GetServerSideProps = async (context: any, ...rest: any) => {
    const {req, res} = context

    const {data: {data: data}} = await fetchHomePage.countries()


    let customerToken = await getCookie('auth-token', {req, res});
    // console.log('hello tokensdclksdcjdnsc', customerToken)
    const cartId = await getCookie('cart-id', {req, res})
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
    // console.log('her is the cusimer adress is oky ', customerToken);


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
    // console.log('her is the cusimer adress is oky ', addresses);
    const a = await sdk.magento.getAvailableShippingMethods({cart_id: cartId},{
        customHeaders: {
            Authorization: `Bearer ${customerToken || ''}`,
        }
    });
    console.log('her is the cusimer adress ssssssssssssssssssssis oky ', a );


    return {
        props: {
            data,
            customerCart,
            // shippingMethode: result?.data?.customerCart?.shipping_addresses[0]?.available_shipping_methods,
            addresses,
            shippingMethode: result?.data?.customerCart?.shipping_addresses?.[0]?.available_shipping_methods || [],

        },
    };
};
