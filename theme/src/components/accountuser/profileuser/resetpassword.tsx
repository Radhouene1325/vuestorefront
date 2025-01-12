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
    InitialFocusType,
} from '@storefront-ui/react';
import classNames from 'classnames';
import { offset } from '@floating-ui/react-dom';
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import authenticationuser from "@/utils/authentication";

type SelectOption = {
    label: string;
    value: string;
};



export default function ResetPassword() {
    const [personalInformation, setPersonalInformation] = useState(true);
    const [password, setPassword] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(['safety-alerts']);
    const [pushNotifications, setPushNotifications] = useState('');
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedValueCombobox, setSelectedValueCombobox] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean | undefined>();
    const [snippets, setSnippets] = useState<{ label: string; value: string }[]>([]);
    const [isDisabled] = useState(false);
    const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [areaCodeIsInvalid, setAreaCodeIsInvalid] = useState(false);
    const [phoneNumberIsInvalid, setPhoneNumberIsInvalid] = useState(false);

    const {trigger: UPDATEPASSWORD, data: NEWPASSWORD,error:ERROR, isMutating: ISMUTATINGPASSWORD} = useSWRMutation(
        `${BASEURL}/api/changeCustomerPassword/changeCustomerPassword`,
        authenticationuser.authentication
    );
    const sendFormResstUser = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let email=formData.get('email')
        let currentPassword=formData.get('old-password')
        let newPassword=formData.get('new-password')
        // let phone=formData.get('phone')

        await UPDATEPASSWORD({

            email,
            currentPassword,
            newPassword
        })
console.log(email,currentPassword,newPassword)


    };
    return (
        <div className="flex justify-center items-start  min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
                <h1 className="mb-6 text-3xl font-bold text-center">resetPassword</h1>
                <form onSubmit={sendFormResstUser} className="space-y-6">

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Email *
                        </label>
                        <SfInput
                            name="email"
                            // value={email}
                            type="email"
                            required
                            invalid={emailIsInvalid}
                            slotPrefix={<SfIconEmail/>}

                            className="w-full"
                        />
                        {emailIsInvalid && (
                            <p className="mt-1 text-sm text-red-600">
                                The field cannot be empty
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            old-password *
                        </label>
                        <SfInput
                            name="old-password"
                            // value={phoneNumber}
                            type="password"
                            invalid={phoneNumberIsInvalid}
                            required
                            placeholder="e.g. 123 456 7890"
                            className="w-full placeholder-gray-500"

                        />
                        {phoneNumberIsInvalid && (
                            <p className="mt-1 text-sm text-red-600">
                                The field cannot be empty
                            </p>
                        )}
                    </div>


                    {/* Phone Number Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            New-password *
                        </label>
                        <SfInput
                            name="new-password"
                            // value={phoneNumber}
                            type="password"
                            //invalid={phoneNumberIsInvalid}
                            required
                            placeholder="e.g. 123 456 7890"
                            className="w-full placeholder-gray-500"

                        />
                        {phoneNumberIsInvalid && (
                            <p className="mt-1 text-sm text-red-600">
                                The field cannot be empty
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
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

