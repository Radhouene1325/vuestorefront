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
import { SfLoaderCircular } from '@storefront-ui/react';

export interface Props {
    date_of_birth: string,
    default_billing: string,
    default_shipping: string,
    email: string,
    firstname: string,
    is_subscribed: false,
    lastname: string,
    middlename: string,
    prefix: string,
    suffix: string,
    taxvat: string,
    addresses: [],
    __typename: 'Customer'
}
export default function PageInfoUser({customer}:{customer:Props}) {
    console.log(customer);
    const [personalInformation, setPersonalInformation] = useState(true);
    const [username, setUsername] = useState('');
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



    const { close, toggle, isOpen } = useDisclosure();
    const [selectedOption, setSelectedOption] = useState<SelectOption>();
    const id = useId();
    const listboxId = useId();
    const selectTriggerRef = useRef<HTMLDivElement>(null);


    const {trigger: UPDATE, data: NEWADRESS,error:ERROR, isMutating: ISMUTATINGADRESS} = useSWRMutation(
        `${BASEURL}/api/updateCustomer/updateCustomer`,
        authenticationuser.authentication
    );


    const sendForm = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let email=formData.get('email')
        let nome=formData.get('firstname')
        let cognome=formData.get('lastname')
        let phone=formData.get('phone')

        await UPDATE({

            nome,
            cognome,
            phone
        })



    };
    console.log(NEWADRESS)

    return (
        <div className="flex justify-center items-start  min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
                <h1 className="mb-6 text-3xl font-bold text-center"> Information</h1>
                <form onSubmit={sendForm} className="space-y-6">
                    {/* Personal Information Toggle */}
                    <label className="flex items-center justify-between cursor-pointer mb-4">
            <span className="font-medium text-red-700">
             enable for update your personal adress
            </span>
                        <SfSwitch
                            checked={personalInformation}
                            onChange={() => setPersonalInformation(!personalInformation)}
                        />
                    </label>

                    {/* First & Last Name Fields Side by Side */}
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <label className="flex-1">
              <span className="block mb-1 font-medium text-gray-700">
                First Name *
              </span>
                            <SfInput
                                disabled={personalInformation}
                                name="firstname"
                                type="text"

                                // value={username}
                                invalid={usernameIsInvalid}
                                defaultValue={customer.firstname || ''}
                                required
                                className="w-full"
                            />
                            {usernameIsInvalid && (
                                <p className="mt-1 text-sm text-red-600">
                                    The field cannot be empty
                                </p>
                            )}
                        </label>

                        <label className="flex-1 mt-4 md:mt-0">
              <span className="block mb-1 font-medium text-gray-700">
                Last Name *
              </span>
                            <SfInput
                                disabled={personalInformation}
                                // value={username}
                                defaultValue={customer.lastname || ''}
                                invalid={usernameIsInvalid}
                                required
                                name="lastname"
                                type="text"
                                className="w-full"
                            />
                            {usernameIsInvalid && (
                                <p className="mt-1 text-sm text-red-600">
                                    The field cannot be empty
                                </p>
                            )}
                        </label>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Email *
                        </label>
                        <SfInput
                            disabled={personalInformation}
                            // value={email}
                            defaultValue={customer.email || ''}
                            name="email"
                            type="email"
                            required
                            invalid={emailIsInvalid}
                            slotPrefix={<SfIconEmail/>}
                            onInput={() => (email ? setEmailIsInvalid(false) : setEmailIsInvalid(true))}
                            onBlur={() => (email ? setEmailIsInvalid(false) : setEmailIsInvalid(true))}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full"
                        />
                        {emailIsInvalid && (
                            <p className="mt-1 text-sm text-red-600">
                                The field cannot be empty
                            </p>
                        )}
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Phone *
                        </label>
                        <SfInput
                            disabled={personalInformation}
                            name="phone"
                            defaultValue={customer.telephone || ''}
                            // value={phoneNumber}
                            type="tel"
                            invalid={phoneNumberIsInvalid}
                            required
                            placeholder="e.g. 123 456 7890"
                            className="w-full placeholder-gray-500"
                            onInput={() =>
                                phoneNumber ? setPhoneNumberIsInvalid(false) : setPhoneNumberIsInvalid(true)
                            }
                            onBlur={() =>
                                phoneNumber ? setPhoneNumberIsInvalid(false) : setPhoneNumberIsInvalid(true)
                            }
                            onChange={(event) => setPhoneNumber(event.target.value)}
                        />
                        {phoneNumberIsInvalid && (
                            <p className="mt-1 text-sm text-red-600">
                                The field cannot be empty
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <>
                            {/* Submit button or loader */}
                            {!ISMUTATINGADRESS ? (
                                <button
                                    type="submit"
                                    className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Submit
                                </button>
                            ) : (
                                <div className="flex gap-4 flex-wrap">
                                    <SfLoaderCircular className="!text-cyan-700" size="2xl" />
                                </div>
                            )}

                            {/* Error message */}
                            {ERROR && (
                                <div
                                    role="alert"
                                    className="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md mt-4"
                                >
                                    <p className="py-2 mr-2">The password change was failed.</p>
                                </div>
                            )}
                        </>

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

