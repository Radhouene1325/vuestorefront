import { type ChangeEvent, type FormEvent, type KeyboardEvent, useState, useRef, useId, useEffect } from 'react';
import {
    SfButton,
    SfInput,
    SfSelect,
    SfSwitch,
    SfCheckbox,
    SfRadio,
    SfIconEmail,
    SfIconExpandMore,
    useDisclosure,
    SfListItem,
    useTrapFocus,
    useDropdown,
    SfIconCheck,
    InitialFocusType, SfIconPerson, SfIconLockOpen,
} from '@storefront-ui/react';
import classNames from 'classnames';
import { offset } from '@floating-ui/react-dom';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Field, Label, Switch } from '@headlessui/react'

import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import authenticationuser from "@/utils/authentication";
import { SfIconCheckCircle, SfIconClose } from '@storefront-ui/react';
import {useRouter} from "next/router";
type SelectOption = {
    label: string;
    value: string;
};



export default function Newcount() {
    const [agreed, setAgreed] = useState(false)

    const [email, setEmail] = useState('');
    const [firstname, setFisrtname] = useState('');
    const [lastname, setLastname] = useState('');

    const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [phoneNumberIsInvalid, setPhoneNumberIsInvalid] = useState(false);

const {trigger, data,error, isMutating}=useSWRMutation(
    `${BASEURL}/api/createCustomer/createCustomer`,
    authenticationuser.createNewUser
)


    const sendForm =async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let email = formData.get('email');
        setEmail(email ? String(email) : '');
        let password = formData.get('password');

        let firstname = formData.get('firstname');
        setFisrtname(firstname ? String(firstname) : '');
        let lastname = formData.get('lastname');
        setLastname(lastname ? String(lastname) : '');


        if (email && password && firstname && lastname) {
            await trigger({email,password,firstname,lastname})
        }


    };
   // console.log(data.data.errors)
    const [visibolPassword,setVisibolPassword]=useState<boolean>(false)

    const visibol = () => {
        setVisibolPassword(!visibolPassword);
    }
const router=useRouter()
    useEffect(() => {


        if(data?.data?.data?.createCustomerV2?.customer){
            router.push('/')
        }

    }, [data?.data?.data?.createCustomerV2?.customer]);
console.log(data?.data?.errors)
    // data?.data?.errors?
    return (
        // <div className="flex justify-center items-start  min-h-screen bg-gray-50 px-4">
        //     <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
        //         {data?.data?.data?.createCustomerV2?.customer &&
        //             (<div
        //                     role="alert"
        //                     className="flex items-start md:items-center max-w-[600px] shadow-md bg-positive-100 pr-2 pl-4 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
        //                 >
        //                     <SfIconCheckCircle className="my-2 mr-2 text-positive-700 shrink-0"/>
        //                     <p className="py-2 mr-2">new account is create seccsefely.</p>
        //                     <button
        //                         type="button"
        //                         className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900 focus-visible:outline focus-visible:outline-offset"
        //                         aria-label="Close positive alert"
        //                     >
        //                         <SfIconClose className="hidden md:block"/>
        //                         <SfIconClose size="sm" className="block md:hidden"/>
        //                     </button>
        //                 </div>
        //             )
        //         }
        //         {data?.data?.errors && (
        //             <div
        //                 role="alert"
        //                 className="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
        //             >
        //                 <p className="py-2 mr-2">{data?.data?.errors.map((e: { message: string; })=>e.message)} </p>
        //                 <button
        //                     type="button"
        //                     className="py-1.5 px-3 md:py-2 md:px-4 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 ml-auto font-medium focus-visible:outline focus-visible:outline-offset"
        //                 >
        //                     Retry
        //                 </button>
        //                 <button
        //                     type="button"
        //                     className="p-1.5 md:p-2 ml-2 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 focus-visible:outline focus-visible:outline-offset"
        //                     aria-label="Close error alert"
        //                 >
        //                     <SfIconClose className="hidden md:block"/>
        //                     <SfIconClose size="sm" className="block md:hidden"/>
        //                 </button>
        //             </div>
        //         )}
        //
        //
        //         <h1 className="mb-6 text-3xl font-bold text-center">Add now count</h1>
        //         <form onSubmit={sendForm} className="space-y-6">
        //             {/* Personal Information Toggle */}
        //
        //
        //             {/* First & Last Name Fields Side by Side */}
        //             <div className="flex flex-col md:flex-row md:space-x-4">
        //                 <label className="flex-1">
        //       <span className="block mb-1 font-medium text-gray-700">
        //         First Name *
        //       </span>
        //                     <SfInput
        //                         // value={username}
        //                         invalid={usernameIsInvalid}
        //                         required
        //                         name='firstname'
        //                         className="w-full"
        //                     />
        //                     {!firstname && (
        //                         <p className="mt-1 text-sm text-red-600">
        //                             The field cannot be empty
        //                         </p>
        //                     )}
        //                 </label>
        //
        //                 <label className="flex-1 mt-4 md:mt-0">
        //       <span className="block mb-1 font-medium text-gray-700">
        //         Last Name *
        //       </span>
        //                     <SfInput
        //                         // value={username}
        //                         name='lastname'
        //                         invalid={usernameIsInvalid}
        //                         required
        //
        //                         className="w-full"
        //                     />
        //                     {!lastname && (
        //                         <p className="mt-1 text-sm text-red-600">
        //                             The field cannot be empty
        //                         </p>
        //                     )}
        //                 </label>
        //             </div>
        //
        //             {/* Email Field */}
        //             <div>
        //                 <label className="block mb-1 font-medium text-gray-700">
        //                     Email *
        //                 </label>
        //                 <SfInput
        //                     // value={email}
        //                     type="email"
        //                     name='email'
        //                     placeholder="e.g. <EMAIL>"
        //                     required
        //                     invalid={emailIsInvalid}
        //                     slotPrefix={<SfIconEmail/>}
        //
        //                     className="w-full"
        //                 />
        //                 {!email && (
        //                     <p className="mt-1 text-sm text-red-600">
        //                         The field cannot be empty
        //                     </p>
        //                 )}
        //             </div>
        //
        //             {/* Phone Number Field */}
        //             <div>
        //                 <label className="block mb-1 font-medium text-gray-700">
        //                     Password *
        //                 </label>
        //                 <SfInput
        //                     // value={phoneNumber}
        //                     type={visibolPassword ? 'text' : "password"}
        //                     name='password'
        //                     slotPrefix={<SfIconPerson/>} slotSuffix={<SfIconLockOpen onClick={visibol}/>}
        //                     // invalid={phoneNumberIsInvalid}
        //                     required
        //                     placeholder="e.g. 123 456 7890"
        //                     className="w-full placeholder-gray-500"
        //
        //                 />
        //                 {phoneNumberIsInvalid && (
        //                     <p className="mt-1 text-sm text-red-600">
        //                         The field cannot be empty
        //                     </p>
        //                 )}
        //             </div>
        //
        //             {/* Submit Button */}
        //             <div className="flex justify-center">
        //                 <button
        //                     type="submit"
        //                     className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        //                 >
        //                     Submit
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">New
                    Account</h2>
                {data?.data?.data?.createCustomerV2?.customer &&
                    (<div
                            role="alert"
                            className="flex items-start md:items-center max-w-[600px] shadow-md bg-positive-100 pr-2 pl-4 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
                        >
                            <SfIconCheckCircle className="my-2 mr-2 text-positive-700 shrink-0"/>
                            <p className="py-2 mr-2">new account is create seccsefely.</p>
                            <button
                                type="button"
                                className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900 focus-visible:outline focus-visible:outline-offset"
                                aria-label="Close positive alert"
                            >
                                <SfIconClose className="hidden md:block"/>
                                <SfIconClose size="sm" className="block md:hidden"/>
                            </button>
                        </div>
                    )
                }
                {data?.data?.errors && (
                    <div
                        role="alert"
                        className="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
                    >
                        <p className="py-2 mr-2">{data?.data?.errors.map((e: { message: string; }) => e.message)} </p>
                        <button
                            type="button"
                            className="py-1.5 px-3 md:py-2 md:px-4 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 ml-auto font-medium focus-visible:outline focus-visible:outline-offset"
                        >
                            Retry
                        </button>
                        <button
                            type="button"
                            className="p-1.5 md:p-2 ml-2 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 focus-visible:outline focus-visible:outline-offset"
                            aria-label="Close error alert"
                        >
                            <SfIconClose className="hidden md:block"/>
                            <SfIconClose size="sm" className="block md:hidden"/>
                        </button>
                    </div>
                )}
            </div>
            <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={sendForm}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                autoComplete="given-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="lastname"
                                name="lastname"
                                type="text"
                                autoComplete="family-name"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <div className="relative flex items-center">
                                <SfIconEmail className="absolute left-3 pointer-events-none"/>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full pl-10 rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-900">
                            Password
                        </label>
                        <div className="mt-2.5">
                                <div className="relative flex items-center">
                                    <SfIconPerson className="absolute left-3 pointer-events-none"/>
                                    <input
                                        id="password"
                                        type={visibolPassword ? 'text' : "password"}
                                        name='password'
                                        autoComplete="organization"
                                        className="block w-full pl-10 pr-10 rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                    />
                                    <SfIconLockOpen className="absolute right-3 cursor-pointer" onClick={visibol}/>
                                </div>
                        </div>
                    </div>
                    {/*      <div className="sm:col-span-2">*/}
                    {/*          <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">*/}
                    {/*              Phone number*/}
                    {/*          </label>*/}
                    {/*          <div className="mt-2.5">*/}
                    {/*              <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">*/}
                    {/*                  <div className="grid shrink-0 grid-cols-1 focus-within:relative">*/}
                    {/*                      <select*/}
                    {/*                          id="country"*/}
                    {/*                          name="country"*/}
                    {/*                          autoComplete="country"*/}
                    {/*                          aria-label="Country"*/}
                    {/*                          className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"*/}
                    {/*                      >*/}
                    {/*                          <option>US</option>*/}
                    {/*                          <option>CA</option>*/}
                    {/*                          <option>EU</option>*/}
                    {/*                      </select>*/}
                    {/*                      <ChevronDownIcon*/}
                    {/*                          aria-hidden="true"*/}
                    {/*                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"*/}
                    {/*                      />*/}
                    {/*                  </div>*/}
                    {/*                  <input*/}
                    {/*                      id="phone-number"*/}
                    {/*                      name="phone-number"*/}
                    {/*                      type="text"*/}
                    {/*                      placeholder="123-456-7890"*/}
                    {/*                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"*/}
                    {/*                  />*/}
                    {/*              </div>*/}
                    {/*          </div>*/}
                    {/*      </div>*/}
                    {/*      <div className="sm:col-span-2">*/}
                    {/*          <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">*/}
                    {/*              Message*/}
                    {/*          </label>*/}
                    {/*          <div className="mt-2.5">*/}
                    {/*<textarea*/}
                    {/*    id="message"*/}
                    {/*    name="message"*/}
                    {/*    rows={4}*/}
                    {/*    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"*/}
                    {/*    defaultValue={''}*/}
                    {/*/>*/}
                    {/*          </div>*/}
                    {/*      </div>*/}
                    {/*      <Field className="flex gap-x-4 sm:col-span-2">*/}
                    {/*          <div className="flex h-6 items-center">*/}
                    {/*              <Switch*/}
                    {/*                  checked={agreed}*/}
                    {/*                  onChange={setAgreed}*/}
                    {/*                  className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"*/}
                    {/*              >*/}
                    {/*                  <span className="sr-only">Agree to policies</span>*/}
                    {/*                  <span*/}
                    {/*                      aria-hidden="true"*/}
                    {/*                      className="size-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"*/}
                    {/*                  />*/}
                    {/*              </Switch>*/}
                    {/*          </div>*/}
                    {/*          <Label className="text-sm/6 text-gray-600">*/}
                    {/*              By selecting this, you agree to our{' '}*/}
                    {/*              <a href="#" className="font-semibold text-indigo-600">*/}
                    {/*                  privacy&nbsp;policy*/}
                    {/*              </a>*/}
                    {/*              .*/}
                    {/*          </Label>*/}
                    {/*      </Field>*/}
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}


//
//
//
// import { useRef, useState, type KeyboardEvent } from 'react';
// import classNames from 'classnames';
// import Layout from "@/components/accountuser/layout";
//
// function getPreviousIndex(current: number, elements: HTMLButtonElement[]) { /* ... */ }
// function getNextIndex(current: number, elements: HTMLButtonElement[]) { /* ... */ }
//
// interface Tab {
//     label: string;
//     disabled?: boolean;
// }
//
// const tabs: Tab[] = [
//     { label: 'Features'},
//     { label: 'Specifications', disabled: true },
//     { label: 'Reviews' },
//     { label: 'Support' },
//     { label: 'Delivery & Returns' },
// ];
//
// export default function TabsBasic() {
//     const tablistRef = useRef<HTMLDivElement>(null);
//     const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
//     const isActive = (tab: Tab) => activeTab.label === tab.label;
//     const tabId = (label: string) => `${label}-tab`;
//     const panelId = (label: string) => `${label}-panel`;
//
//     const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => { /* ... */ };
//
//     return (
//         <Layout>
//             <div
//                 ref={tablistRef}
//                 role="tablist"
//                 aria-label="Select tab"
//                 aria-orientation="horizontal"
//                 className="flex gap-2 border-b border-b-neutral-200 pb-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
//             >
//                 {tabs.map((tab) => (
//                     <button
//                         key={tab.label}
//                         type="button"
//                         role="tab"
//                         id={tabId(tab.label)}
//                         aria-controls={panelId(tab.label)}
//                         aria-selected={isActive(tab)}
//                         disabled={tab.disabled}
//                         tabIndex={isActive(tab) ? 0 : -1}
//                         onClick={() => setActiveTab(tab)}
//                         onKeyDown={handleKeyDown}
//                         className={classNames(
//                             'px-4 py-2 rounded-md font-medium whitespace-nowrap text-neutral-500 hover:enabled:bg-primary-100 hover:enabled:text-primary-800 active:enabled:bg-primary-200 active:enabled:text-primary-900 disabled:text-disabled-500 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:shadow-[inset_0_0_0_4px_rgb(255,255,255)]',
//                             { '!bg-neutral-100 !text-black': isActive(tab) },
//                         )}
//                     >
//                         {tab.label}
//                     </button>
//                 ))}
//             </div>
//
//             {tabs.map((tab) => (
//                 <div key={tab.label} role="tabpanel" id={panelId(tab.label)} aria-labelledby={tabId(tab.label)} hidden={!isActive(tab)}>
//                     {isActive(tab) && (
//                         <>
//                             {tab.label === 'Features' && (
//                                 <div className="p-4 text-neutral-500">
//                                     <h2>Features</h2>
//                                     <p>Details about features go here...</p>
//                                 </div>
//                             )}
//                             {tab.label === 'Specifications' && (
//                                 <div className="p-4 text-neutral-500">
//                                     <h2>Specifications</h2>
//                                     <p>Details about specifications go here...</p>
//                                 </div>
//                             )}
//                             {tab.label === 'Reviews' && (
//                                 <div className="p-4 text-neutral-500">
//                                     <h2>Reviews</h2>
//                                     <p>Customer reviews go here...</p>
//                                 </div>
//                             )}
//                             {tab.label === 'Support' && (
//                                 <div className="p-4 text-neutral-500">
//                                     <h2>Support</h2>
//                                     <p>Support information goes here...</p>
//                                 </div>
//                             )}
//                             {tab.label === 'Delivery & Returns' && (
//                                 <div className="p-4 text-neutral-500">
//                                     <h2>Delivery & Returns</h2>
//                                     <p>Delivery and return policy goes here...</p>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             ))}
//         </Layout>
//     );
// }

