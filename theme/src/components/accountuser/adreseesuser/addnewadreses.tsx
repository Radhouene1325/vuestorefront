// import React, {useState, useId, FormEventHandler, ChangeEvent, FocusEvent} from 'react';
// import {
//     SfModal,
//     SfButton,
//     SfIconClose,
//     useDisclosure,
//     SfRatingButton,
//     SfInput,
//     SfSelect,
//     SfCheckbox, SfListItem, SfRadio, SfLoaderCircular
// } from '@storefront-ui/react';
// import useSWRMutation, {TriggerWithoutArgs} from "swr/mutation";
// import {BASEURL} from "@/BASEURL/URL";
// import authenticationuser from "@/utils/authentication";
// import fetchHomePage from "@/utils/fetchHomePage";
//
// interface TriggerWithoutArgs<T0, T1, T2, T3> {
// }
//
// export default function NewAdreses({
//                                        isOpen,
//                                        open,
//                                        close,
//                                        countries
//                                    }: {
//     isOpen: boolean,
//     open: () => void,
//     close: () => void,
//     countries?: unknown
// }) {
//
//     const [rating, setRating] = useState(0);
//     const modalTitleId = useId();
//     const modalDescId = useId();
//     let createCustomerAddress: TriggerWithoutArgs<any, any, string, never>;
//     let createAdress: any;
//     let isCreatingCustomerAddress: boolean;
//     ({
//         trigger: createCustomerAddress,
//         data: createAdress,
//         isMutating: isCreatingCustomerAddress
//     } = useSWRMutation(
//         `${BASEURL}/api/createCustomerAddress/createCustomerAddress`,
//         authenticationuser.createNewUser
//     ));
//
//
//     const {trigger: REGION, data: region, error: Error} = useSWRMutation(
//         `${BASEURL}/api/country/regionid/regionid`,
//         fetchHomePage.regionId
//     )
//
//     const handleSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
//         const selectedCountry = event.target.value; // Get the selected value (country ID)
//         console.log('Selected country:', selectedCountry);
//         if (selectedCountry) {
//             await REGION(selectedCountry)
//         }
//     };
//
//
//
//     const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
//         e.preventDefault();
//         /* your submit handler e.g.: */
//         const form = e.target as HTMLFormElement;
//
//         // data can be accessed in form of FormData
//         const formData = new FormData(form);
//         // or JSON object
//         const formJSON = Object.fromEntries(formData.entries());
//         console.log(formJSON);
//         let infoRegion = region?.data?.available_regions.filter((region) => {
//             return region.id == formJSON.city
//         });
//         console.log(infoRegion)
//         if (!infoRegion) {
//             alert("please select a region   or  please select a country or not existe regin in your cuntry");
//
//         } else {
//             if (!formJSON) {
//                 return ".....we are not able to process your request. Please try again later"
//             }
//             try {
//
//
//                 await trigger({formJSON, infoRegion}); // POST { name, email } to /api/send-data
//
//
//             } catch (err) {
//                 console.error('Error sending data:', err);
//             }
//         }
//
//
//     };
//
//     const [streetIsValid, setStreetIsValid] = useState(true);
//
//     const validateStreet = (e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
//         setStreetIsValid(!!e.target.value);
//     };
//
//     return (
//         <>
//             {/*<SfButton className="absolute right-1/2 top-1/2 translate-x-[50%]" onClick={open}>*/}
//             {/*    Open rating modal again*/}
//             {/*</SfButton>*/}
//             <SfModal
//                 open={isOpen}
//                 onClose={close}
//                 className="min-w-[376px] md:w-[480px]"
//                 as="section"
//                 role="alertdialog"
//                 aria-labelledby={modalTitleId}
//                 aria-describedby={modalDescId}
//             >
//                 <div className="flex justify-center py-10 bg-neutral-100 min-h-screen">
//                     {/* Form wrapper */}
//                     <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
//                         <div className="mb-6">
//                             <h2 className="text-2xl font-bold mb-1">Billing Address</h2>
//                             <p className="text-sm text-neutral-600">
//                                 Please provide your billing details below.
//                             </p>
//                         </div>
//
//                         <form
//                             onSubmit={onSubmit}
//                             className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 text-neutral-900"
//                         >
//                             {/* First Name */}
//                             <label className="flex flex-col gap-1">
//                                 <span className="typography-text-sm font-medium">First Name</span>
//                                 <SfInput
//                                     name="firstname"
//                                     autoComplete="given-name"
//                                     required
//                                     className="border border-neutral-300 rounded-md px-3 py-2
//                      focus:outline-none focus:ring-2 focus:ring-blue-500
//                      focus:border-transparent placeholder-neutral-400"
//                                 />
//                             </label>
//
//                             {/* Last Name */}
//                             <label className="flex flex-col gap-1">
//                                 <span className="typography-text-sm font-medium">Last Name</span>
//                                 <SfInput
//                                     name="lastname"
//                                     autoComplete="family-name"
//                                     required
//                                     className="border border-neutral-300 rounded-md px-3 py-2
//                      focus:outline-none focus:ring-2 focus:ring-blue-500
//                      focus:border-transparent placeholder-neutral-400"
//                                 />
//                             </label>
//
//                             {/* Phone */}
//                             <label className="flex flex-col gap-1 col-span-full">
//                                 <span className="typography-text-sm font-medium">Phone</span>
//                                 <SfInput
//                                     name="telephone"
//                                     type="tel"
//                                     autoComplete="tel"
//                                     required
//                                     className="border border-neutral-300 rounded-md px-3 py-2
//                      focus:outline-none focus:ring-2 focus:ring-blue-500
//                      focus:border-transparent placeholder-neutral-400"
//                                 />
//                             </label>
//
//                             {/* Country */}
//                             <label className="flex flex-col gap-1">
//                                 <span className="typography-text-sm font-medium">Country</span>
//                                 <SfSelect
//                                     name="country"
//                                     placeholder="-- Select --"
//                                     autoComplete="country-name"
//                                     required
//                                     onChange={handleSelect}
//                                     className="border border-neutral-300 rounded-md px-3 py-2
//                      focus:outline-none focus:ring-2 focus:ring-blue-500
//                      focus:border-transparent text-neutral-900 placeholder-neutral-400"
//                                 >
//                                     {countries.map((countryName) => (
//                                         <option
//                                             key={(countryName as { id: string }).id}
//                                             value={(countryName as { id: string }).id}
//                                         >
//                                             {(countryName as { full_name_english: string }).full_name_english}
//                                         </option>
//                                     ))}
//                                 </SfSelect>
//                             </label>
//
//                             {/* City */}
//                             <label className="flex flex-col gap-1">
//                                 <span className="typography-text-sm font-medium">City</span>
//                                 <SfSelect
//                                     name="city"
//                                     placeholder="-- Select --"
//                                     autoComplete="address-level2"
//                                     required
//                                     className="border border-neutral-300 rounded-md px-3 py-2
//                      focus:outline-none focus:ring-2 focus:ring-blue-500
//                      focus:border-transparent text-neutral-900 placeholder-neutral-400"
//                                 >
//                                     {region?.data?.available_regions?.map((region) => (
//                                         <option key={region.id} value={region.id}>
//                                             {region.name}
//                                         </option>
//                                     ))}
//                                 </SfSelect>
//                             </label>
//
//                             {/* Street */}
//                             <label className="flex flex-col gap-1 col-span-full">
//                                 <span className="typography-text-sm font-medium">Street</span>
//                                 <SfInput
//                                     name="street"
//                                     autoComplete="address-line1"
//                                     onBlur={validateStreet}
//                                     onChange={validateStreet}
//                                     required
//                                     invalid={!streetIsValid}
//                                     className={`border rounded-md px-3 py-2
//                      focus:outline-none focus:ring-2
//                      ${
//                                         streetIsValid
//                                             ? 'border-neutral-300 focus:ring-blue-500 focus:border-transparent'
//                                             : 'border-negative-400 focus:ring-negative-500 focus:border-transparent'
//                                     }
//                      placeholder-neutral-400`}
//                                 />
//                                 {!streetIsValid && (
//                                     <strong className="typography-error-sm text-negative-700 font-medium mt-1">
//                                         Please provide a valid street name
//                                     </strong>
//                                 )}
//                                 <small className="typography-hint-xs text-neutral-500 mt-1">
//                                     Street address or P.O. Box
//                                 </small>
//                             </label>
//
//                             {/* Apt Number */}
//                             <label className="flex flex-col gap-1">
//                                 <span className="typography-text-sm font-medium">Apt#, Suite, etc</span>
//                                 <SfInput
//                                     name="aptNo"
//                                     className="border border-neutral-300 rounded-md px-3 py-2
//                      focus:outline-none focus:ring-2 focus:ring-blue-500
//                      focus:border-transparent placeholder-neutral-400"
//                                 />
//                                 <small className="typography-hint-xs text-neutral-500 mt-1">Optional</small>
//                             </label>
//
//
//
//                             {/* ZIP Code */}
//                             <label className="flex flex-col gap-1">
//                                 <span className="typography-text-sm font-medium">ZIP Code</span>
//                                 <SfInput
//                                     name="zipCode"
//                                     placeholder="e.g., 12345"
//                                     autoComplete="postal-code"
//                                     required
//                                     className="border border-neutral-300 rounded-md px-3 py-2
//                      focus:outline-none focus:ring-2 focus:ring-blue-500
//                      focus:border-transparent placeholder-neutral-400"
//                                 />
//                             </label>
//
//                             {/* Use as Shipping Address */}
//                             <label className="flex items-center gap-2 col-span-full mt-2">
//                                 <SfCheckbox name="useAsShippingAddress"/>
//                                 Use as shipping address
//                             </label>
//
//
//                             {/* Buttons */}
//                             <div className="flex gap-4 col-span-full justify-end mt-4">
//                                 <SfButton type="reset" variant="secondary">
//                                     Clear All
//                                 </SfButton>
//                                 {/*<SfButton type="submit" disabled={!shippingData}>Save</SfButton>*/}
//                             </div>
//                         </form>
//
//
//                     </div>
//
//
//                 </div>
//
//             </SfModal>
//
//
//
//         </>
//     );
// }


import React, {
    useState,
    useId,
    FormEventHandler,
    ChangeEvent,
    FocusEvent, useEffect,
} from 'react';
import {
    SfModal,
    SfButton,
    SfIconClose,
    useDisclosure,
    SfRatingButton,
    SfInput,
    SfSelect,
    SfCheckbox,
    SfListItem,
    SfRadio,
    SfLoaderCircular,
} from '@storefront-ui/react';
import useSWRMutation, { TriggerWithoutArgs } from 'swr/mutation';
import { BASEURL } from '@/BASEURL/URL';
import authenticationuser from '@/utils/authentication';
import fetchHomePage from '@/utils/fetchHomePage';
import {pushAdresseCustomer} from "@/store/slices/counterSlice";
import {useDispatch} from "react-redux";

// Define interfaces for props and data structures
interface Country {
    id: string;
    full_name_english: string;
}

interface Region {
    id: string;
    name: string;
}

interface NewAddressesProps {

    open: boolean;

    countries: Country[];
}

interface FormJSON {
    firstname: string;
    lastname: string;
    telephone: string;
    country: string;
    city: string;
    street: string;
    aptNo?: string;
    zipCode: string;
    useAsShippingAddress: boolean;
}

export default function NewAddresses({

                                         open,

                                         countries,
                                     }: NewAddressesProps) {
    const [rating, setRating] = useState(0);
    const modalTitleId = useId();
    const modalDescId = useId();
const dispatch = useDispatch()
    // SWR Mutation for creating customer address
    const {
        trigger: createCustomerAddress,
        data: createAddressData,
        isMutating: isCreatingCustomerAddress,
        error: createAddressError,
    } = useSWRMutation(
        `${BASEURL}/api/createCustomerAddress/createCustomerAddress`,
        authenticationuser.createNewUser
    );

    // SWR Mutation for fetching regions based on country
    const {
        trigger: fetchRegions,
        data: regionsData,
        error: regionsError,
        isMutating: isFetchingRegions,
    } = useSWRMutation(
        `${BASEURL}/api/country/regionid/regionid`,
        fetchHomePage.regionId
    );

    const [streetIsValid, setStreetIsValid] = useState(true);
    const [formErrors, setFormErrors] = useState<string | null>(null);

    // Handle country selection to fetch regions
    const handleSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = event.target.value;
        if (selectedCountry) {
            await fetchRegions(selectedCountry);
        }
    };

    // Validate street input
    const validateStreet = (
        e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
    ) => {
        setStreetIsValid(!!e.target.value.trim());
    };

    // Handle form submission
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setFormErrors(null);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries()) as unknown as FormJSON;
console.log(formJSON)
        console.log(regionsData)
        // Validate region
        const infoRegion = regionsData?.data?.available_regions.filter(
            (region: Region) => region.id === JSON.parse( formJSON.city)
        );
console.log(infoRegion)
        if (!infoRegion) {
            setFormErrors(
                'Please select a valid region or ensure the country has available regions.'
            );
            return;
        }

        try {
            await createCustomerAddress({ formJSON, infoRegion });
            // Optionally, close the modal or reset the form upon success
            close();
            form.reset();
        } catch (err) {
            console.error('Error sending data:', err);
            setFormErrors('An error occurred while processing your request.');
        }
    };
    // console.log(createAddressData.data.data.createCustomerAddress)

    useEffect(()=>{
        if(createAddressData?.data?.data?.createCustomerAddress)
        dispatch(pushAdresseCustomer(createAddressData?.data?.data?.createCustomerAddress))
    },[createAddressData])

    return (
        <>

            {open&&<div className="flex justify-center py-10 bg-neutral-100 min-h-screen"

                // className="min-w-[376px] md:w-[480px]"
                  is="section"
                  role="alertdialog"
            >
                {/* Form Container */}
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
                    <div className="mb-6">
                        <h2 id={modalTitleId} className="text-2xl font-bold mb-1">
                            Billing Address
                        </h2>
                        <p id={modalDescId} className="text-sm text-neutral-600">
                            Please provide your billing details below.
                        </p>
                    </div>

                    {/* Display form errors */}
                    {formErrors && (
                        <div
                            className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded"
                            role="alert"
                        >
                            {formErrors}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={onSubmit}
                        className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 text-neutral-900"
                        noValidate
                    >
                        {/* First Name */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="firstname" className="typography-text-sm font-medium">
                                First Name
                            </label>
                            <SfInput
                                id="firstname"
                                name="firstname"
                                autoComplete="given-name"
                                required
                                className="border border-neutral-300 rounded-md px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent placeholder-neutral-400"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="lastname" className="typography-text-sm font-medium">
                                Last Name
                            </label>
                            <SfInput
                                id="lastname"
                                name="lastname"
                                autoComplete="family-name"
                                required
                                className="border border-neutral-300 rounded-md px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent placeholder-neutral-400"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1 col-span-full">
                            <label htmlFor="telephone" className="typography-text-sm font-medium">
                                Phone
                            </label>
                            <SfInput
                                id="telephone"
                                name="telephone"
                                type="tel"
                                autoComplete="tel"
                                required
                                className="border border-neutral-300 rounded-md px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent placeholder-neutral-400"
                            />
                        </div>

                        {/* Country */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="country" className="typography-text-sm font-medium">
                                Country
                            </label>
                            <SfSelect
                                id="country"
                                name="country"
                                placeholder="-- Select --"
                                autoComplete="country-name"
                                required
                                onChange={handleSelect}
                                className="border border-neutral-300 rounded-md px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent text-neutral-900 placeholder-neutral-400"
                            >
                                <option value="" disabled>
                                    -- Select Country --
                                </option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.full_name_english}
                                    </option>
                                ))}
                            </SfSelect>
                        </div>

                        {/* City */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="city" className="typography-text-sm font-medium">
                                City
                            </label>
                            <SfSelect
                                id="city"
                                name="city"
                                placeholder={isFetchingRegions ? 'Loading regions...' : '-- Select City --'}
                                autoComplete="address-level2"
                                required
                                disabled={!regionsData?.data?.available_regions || isFetchingRegions}
                                className="border border-neutral-300 rounded-md px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent text-neutral-900 placeholder-neutral-400"
                            >
                                <option value="" disabled>
                                    -- Select City --
                                </option>
                                {regionsData?.data?.available_regions?.map((region: Region) => (
                                    <option key={region.id} value={region.id}>
                                        {region.name}
                                    </option>
                                ))}
                            </SfSelect>
                            {isFetchingRegions && (
                                <div className="flex items-center mt-2">
                                    <SfLoaderCircular size="small"/>
                                    <span className="ml-2 text-sm text-neutral-600">Loading regions...</span>
                                </div>
                            )}
                            {regionsError && (
                                <span className="text-sm text-red-600">
                  Failed to load regions. Please try again.
                </span>
                            )}
                        </div>

                        {/* Street */}
                        <div className="flex flex-col gap-1 col-span-full">
                            <label htmlFor="street" className="typography-text-sm font-medium">
                                Street
                            </label>
                            <SfInput
                                id="street"
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
                                    Please provide a valid street name.
                                </strong>
                            )}
                            <small className="typography-hint-xs text-neutral-500 mt-1">
                                Street address or P.O. Box
                            </small>
                        </div>

                        {/* Apt Number */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="aptNo" className="typography-text-sm font-medium">
                                Apt#, Suite, etc.
                            </label>
                            <SfInput
                                id="aptNo"
                                name="aptNo"
                                className="border border-neutral-300 rounded-md px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent placeholder-neutral-400"
                            />
                            <small className="typography-hint-xs text-neutral-500 mt-1">Optional</small>
                        </div>

                        {/* ZIP Code */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="zipCode" className="typography-text-sm font-medium">
                                ZIP Code
                            </label>
                            <SfInput
                                id="zipCode"
                                name="zipCode"
                                placeholder="e.g., 12345"
                                autoComplete="postal-code"
                                required
                                pattern="\d{5}(-\d{4})?"
                                title="Please enter a valid ZIP code (e.g., 12345 or 12345-6789)."
                                className="border border-neutral-300 rounded-md px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent placeholder-neutral-400"
                            />
                        </div>

                        {/* Use as Shipping Address */}
                        <div className="flex items-center gap-2 col-span-full mt-2">
                            <SfCheckbox id="useAsShippingAddress" name="useAsShippingAddress"/>
                            <label htmlFor="useAsShippingAddress" className="typography-text-sm">
                                Use as shipping address
                            </label>
                        </div>

                        {/* Submit and Reset Buttons */}
                        <div className="flex gap-4 col-span-full justify-end mt-4">
                            <SfButton type="reset" variant="secondary">
                                Clear All
                            </SfButton>
                            <SfButton type="submit" disabled={isCreatingCustomerAddress}>
                                {isCreatingCustomerAddress ? (
                                    <>
                                        <SfLoaderCircular size="small" className="mr-2"/>
                                        Saving...
                                    </>
                                ) : (
                                    'Save Address'
                                )}
                            </SfButton>
                        </div>
                    </form>
                </div>
            </div>

            }
        </>

    );
}
