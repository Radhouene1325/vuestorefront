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


import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
    {
        name: 'Push to deploy.',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'SSL certificates.',
        description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
        icon: LockClosedIcon,
    },
    {
        name: 'Database backups.',
        description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
        icon: ServerIcon,
    },
]

// Here you should provide a list of countries you want to support
// or use an up-to-date country list like: https://www.npmjs.com/package/country-list
const countries = ['Germany', 'Great Britain', 'Poland', 'United States of America'] as const;
const states = ['California', 'Florida', 'New York', 'Texas'] as const;
async function sendData(url: string, { arg }: { arg: unknown }) {
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

export default function AddressCustmer({
    data,
    customerCart,
    addresses,
    shippingMethode,
}: {
    data: { countries: typeof countries };
    customerCart: any;
    addresses: any;
    shippingMethode: any;
}) {

    console.log(customerCart)
console.log(shippingMethode)
    const Router = useRouter();

    ////////////setBillingAddressOnCar    createCustomerAddress/////
// console.log(Object.keys(customerCart.data.customerCart.billing_address).length)
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
        let infoRegion = region?.data?.available_regions.filter((region: { id: FormDataEntryValue; }) => {
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
            Router.push(`/chekout/chekout`)
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

        let res=shippingMethode.filter((e: { carrier_code: string; })=>e.carrier_code==event.target.value)
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
   const [adressIsSelected,setAdressIsSelected]=useState<Record<string,any>> ({})
    const selectAdress = (id: number) => {

        console.log(id)
        let addressSelect= addresses?.addresses?.filter((address: { id: any; })=>address.id==id)
        console.log(addressSelect)
        setAdressIsSelected(addressSelect[0])
    };
    return (

        <>

            <div className="overflow-hidden bg-white  sm:py-24 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        {/* Left column */}

                        <div className="lg:pt-4 lg:pr-8">
                            <div className="lg:max-w-lg">
                                {/* Features list */}
                                <dl className="mt-8 max-w-xl space-y-6 text-base leading-7 text-gray-700 lg:max-w-none">
                                    <dd className="inline">
                                        <form
                                            className="p-4 flex gap-4 flex-wrap text-neutral-900 bg-white border border-gray-200 rounded-md shadow-sm"
                                            onSubmit={onSubmit}
                                        >
                                            <h2 className="w-full text-lg md:text-xl font-bold">
                                                Billing address
                                            </h2>

                                            {/* First Name */}
                                            <label className="w-full md:w-auto flex-grow flex flex-col gap-1 mt-4 md:mt-0">
                <span className="text-sm font-medium text-gray-800">
                  First Name
                </span>
                                                <input
                                                    type="text"
                                                    name="firstname"
                                                    defaultValue={adressIsSelected?.firstname || ''}
                                                    autoComplete="given-name"
                                                    required
                                                    className="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </label>

                                            {/* Last Name */}
                                            <label className="w-full md:w-auto flex-grow flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-800">
                  Last Name
                </span>
                                                <input
                                                    type="text"
                                                    name="lastname"
                                                    defaultValue={adressIsSelected?.lastname || ''}
                                                    autoComplete="family-name"
                                                    required
                                                    className="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </label>

                                            {/* Phone */}
                                            <label className="w-full flex flex-col gap-1">
                                                <span className="text-sm font-medium text-gray-800">Phone</span>
                                                <input
                                                    type="tel"
                                                    name="telephone"
                                                    defaultValue={adressIsSelected?.telephone || ''}
                                                    autoComplete="tel"
                                                    required
                                                    className="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </label>

                                            {/* Country + City */}
                                            <div className="w-full flex flex-col gap-1">
                                                <label className="text-sm font-medium text-gray-800">
                                                    Country
                                                </label>
                                                <select
                                                    name="country"
                                                    onChange={handleSelect}
                                                    required
                                                    className="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    <option value="">-- Select --</option>
                                                    {countries.map((countryName) => (
                                                        <option key={countryName.id} value={countryName.id}>
                                                            {countryName.full_name_english}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* City */}
                                                <label className="mt-3 text-sm font-medium text-gray-800">
                                                    City
                                                </label>
                                                <select
                                                    name="city"
                                                    required
                                                    className="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    <option value="">-- Select --</option>
                                                    {region?.data?.available_regions?.map((r) => (
                                                        <option key={r.id} value={r.id}>
                                                            {r.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Street */}
                                            <div className="w-full md:w-auto flex-grow flex flex-col gap-1">
                                                <label className="text-sm font-medium text-gray-800">
                                                    Street
                                                </label>
                                                <input
                                                    name="street"
                                                    defaultValue={adressIsSelected?.street || ''}
                                                    autoComplete="address-line1"
                                                    onBlur={validateStreet}
                                                    onChange={validateStreet}
                                                    required
                                                    className={`mt-1 rounded-md border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                                                        streetIsValid
                                                            ? 'border-gray-300 text-gray-900 placeholder-gray-400'
                                                            : 'border-red-500 text-red-900 placeholder-red-300'
                                                    }`}
                                                />
                                                {/* Validation messages */}
                                                {!streetIsValid && (
                                                    <strong className="text-sm font-medium text-red-700 mt-1">
                                                        Please provide a street name
                                                    </strong>
                                                )}
                                                <small className="text-xs text-gray-500">
                                                    Street address or P.O. Box
                                                </small>
                                            </div>

                                            {/* Apt #, Suite, etc */}
                                            <div className="w-full md:w-[120px] flex flex-col gap-1">
                                                <label className="text-sm font-medium text-gray-800">
                                                    Apt#, Suite, etc
                                                </label>
                                                <input
                                                    name="aptNo"
                                                    className="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                                <small className="text-xs text-gray-500">Optional</small>
                                            </div>

                                            {/* State */}
                                            <label className="w-full md:w-auto flex-grow flex flex-col gap-1">
                                                <span className="text-sm font-medium text-gray-800">State</span>
                                                <select
                                                    name="state"
                                                    required
                                                    className="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    <option value="">-- Select --</option>
                                                    {states.map((stateName) => (
                                                        <option key={stateName}>{stateName}</option>
                                                    ))}
                                                </select>
                                            </label>

                                            {/* ZIP Code */}
                                            <label className="w-full md:w-[120px] flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-800">
                  ZIP Code
                </span>
                                                <input
                                                    name="zipCode"
                                                    placeholder="e.g., 12345"
                                                    defaultValue={adressIsSelected?.postcode || ''}
                                                    autoComplete="postal-code"
                                                    required
                                                    className="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </label>

                                            {/* Shipping method */}
                                            <div className="col-span-full w-full mt-4">
                                                <p className="mb-2 text-sm font-medium text-gray-800">
                                                    Shipping Method
                                                </p>
                                                <div className="flex flex-col gap-2">
                                                    {shippingMethode?.map((method) => (
                                                        <label
                                                            key={method.carrier_code}
                                                            className="flex items-start gap-2 p-3 border border-gray-200 rounded-md hover:shadow-sm transition-shadow"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="delivery-options"
                                                                value={method.carrier_code}
                                                                checked={checkedState === method.carrier_code}
                                                                onChange={handelSelectMethodeShipping}
                                                                className="h-4 w-4 mt-1 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                            />
                                                            <div className="flex flex-col text-sm text-gray-700">
                                                                <span className="font-medium">{method.method_title}</span>
                                                                <span>
                          {method.price_excl_tax.currency}
                                                                    {method.price_excl_tax.value} &nbsp;EURO
                        </span>
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                                {mutating && (
                                                    <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                                                        <svg
                                                            className="h-5 w-5 animate-spin text-cyan-700"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            />
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 0 1 8-8v8z"
                                                            />
                                                        </svg>
                                                        <span>Updating shipping method...</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action buttons */}
                                            <div className="w-full flex gap-4 mt-6 md:justify-end">
                                                <button
                                                    type="reset"
                                                    className="w-full md:w-auto inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Clear all
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="w-full md:w-auto inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        {/* Right column: screenshot or image */}
                        <div className="flex items-center justify-center py-8">
                            <div className="w-full max-w-4xl flex flex-col gap-8 px-4">
                                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                                    Shipping Address
                                </h2>

                                {/* Scrollable container */}
                                <div className="max-h-[830px] overflow-y-auto">
                                    {/* Two-column grid on >= sm screens; single column on mobile */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {addresses?.addresses?.map((address) => (
                                            <div
                                                key={address.id}
                                                className="relative flex flex-col rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
                                            >
                                                <h3 className="mb-2 text-base font-medium text-gray-700">
                                                    Customer Information
                                                </h3>

                                                <p className="text-sm text-gray-600">
                                                    <strong>Nome:</strong> {address.firstname || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Cognome:</strong> {address.lastname || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Telefono:</strong> {address.telephone || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Country Code:</strong>{' '}
                                                    {address.country_code || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Region:</strong>{' '}
                                                    {address.region?.region || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Street:</strong>{' '}
                                                    {address.postcode || 'N/A'}, {address.street?.[0] || 'N/A'}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() => selectAdress(address.id)}
                                                    className="mt-4 inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                                                >
                                                    Select
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
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
            shippingMethode: result?.data?.customerCart?.shipping_addresses?.[0]?.available_shipping_methods || [],
        },
    };
};





