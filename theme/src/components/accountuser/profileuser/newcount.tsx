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

type SelectOption = {
    label: string;
    value: string;
};

const emailNotificationOptions = [
    {
        label: 'Safety Alerts and Messages *',
        value: 'safety-alerts',
        hint: 'Get notified when something goes wrong on your profile',
        disabled: true,
        checked: true,
    },
    {
        label: 'Deals and Offers',
        value: 'deals-and-offers',
        hint: 'Once a week you will receive information about upcoming offers',
    },
    {
        label: 'Company Information',
        value: 'company-information',
        hint: 'Reports and information about planned changes',
    },
];
const radioOptions = [
    {
        label: 'Everything',
        value: 'everything',
        name: 'radio-1',
    },
    {
        label: 'Same as email',
        value: 'same-as-email',
        name: 'radio-1',
    },
    {
        label: 'No push notifications',
        value: 'no-push',
        name: 'radio-1',
    },
];
const dropdownOptions = [
    {
        label: 'Fashion and Apparel',
        value: 'Fashion and Apparel',
    },
    {
        label: 'Health and Wellness',
        value: 'Health and Wellness',
    },
    {
        label: 'Home Decor',
        value: 'Home Decor',
    },
    {
        label: 'Technology and Gadgets',
        value: 'Technology and Gadgets',
    },
    {
        label: 'Beauty and Cosmetics',
        value: 'Beauty and Cosmetics',
    },
    {
        label: 'Outdoor and Adventure',
        value: 'Outdoor and Adventure',
    },
    {
        label: 'Parenting and Baby Products',
        value: 'Parenting and Baby Products',
    },
    {
        label: 'Books and Literature',
        value: 'Books and Literature',
    },
    {
        label: 'Sports and Fitness',
        value: 'Sports and Fitness',
    },
    {
        label: 'Food and Cooking',
        value: 'Food and Cooking',
    },
];
const options = [
    {
        label: 'Afghanistan',
        value: 'afghanistan',
    },
    {
        label: 'Albania',
        value: 'albania',
    },
    {
        label: 'Angola',
        value: 'angola',
    },
    {
        label: 'Bahamas',
        value: 'bahamas',
    },
    {
        label: 'Bangladesh',
        value: 'bangladesh',
    },
    {
        label: 'Canada',
        value: 'canada',
    },
    {
        label: 'Chile',
        value: 'chile',
    },
    {
        label: 'Czech Republic',
        value: 'czech Republic',
    },
    {
        label: 'Colombia',
        value: 'colombia',
    },
    {
        label: 'Congo',
        value: 'congo',
    },
    {
        label: 'Croatia',
        value: 'croatia',
    },
    {
        label: 'Cuba',
        value: 'cuba',
    },
    {
        label: 'Denmark',
        value: 'denmark',
    },
    {
        label: 'Dominica',
        value: 'dominica',
    },
    {
        label: 'Egypt',
        value: 'egypt',
    },
    {
        label: 'Ethiopia',
        value: 'ethiopia',
    },
    {
        label: 'Estonia',
        value: 'estonia',
    },
];
const areaCodes = [
    { label: '1', value: '1' },
    { label: '20', value: '20' },
    { label: '45', value: '45' },
    { label: '53', value: '53' },
    { label: '56', value: '56' },
    { label: '57', value: '57' },
    { label: '93', value: '93' },
    { label: '243', value: '243' },
    { label: '244', value: '244' },
    { label: '251', value: '251' },
    { label: '355', value: '355' },
    { label: '372', value: '372' },
    { label: '385', value: '385' },
    { label: '420', value: '420' },
    { label: '880', value: '880' },
];

export default function Newcount() {
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

    function handleEmailNotifications(event: ChangeEvent) {
        const { value } = event.target as HTMLInputElement;
        return emailNotifications.indexOf(value) > -1
            ? setEmailNotifications(emailNotifications.filter((option) => value !== option))
            : setEmailNotifications([...emailNotifications, value]);
    }

    const comboboxInputRef = useRef<HTMLInputElement>(null);
    const comboboxDropdownRef = useRef<HTMLUListElement>(null);

    const { isOpen: isOpenCombobox, close: closeCombobox, open: openCombobox, toggle: toggleCombobox } = useDisclosure();
    const { refs: comboboxRefs, style: comboboxStyle } = useDropdown({
        isOpen: isOpenCombobox,
        onClose: closeCombobox,
        placement: 'bottom-start',
        middleware: [offset(4)],
    });
    const comboboxId = useId();
    const comboboxListId = useId();

    const {
        current: currentFocus,
        focusables: focusableElements,
        updateFocusableElements,
    } = useTrapFocus(comboboxDropdownRef, {
        trapTabs: false,
        arrowKeysUpDown: true,
        activeState: isOpenCombobox,
        initialFocus: false,
    });

    const handleFocusInput = () => {
        comboboxInputRef.current?.focus();
    };

    const handleReset = () => {
        setSearchValue('');
        setSnippets([]);
        closeCombobox();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const phrase = event.target.value;
        setSelectedValueCombobox('');
        if (phrase) {
            setSearchValue(phrase);
        } else {
            handleReset();
        }
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') handleReset();
        if (event.key === 'Enter') closeCombobox();
        if (event.key === 'ArrowUp') {
            openCombobox();
            updateFocusableElements();
            if (isOpenCombobox && focusableElements.length > 0) {
                focusableElements[focusableElements.length - 1].focus();
            }
        }
        if (event.key === 'ArrowDown') {
            openCombobox();
            updateFocusableElements();
            if (isOpenCombobox && focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    };

    const selectOptionCombobox = (event: FormEvent, option: SelectOption) => {
        setSearchValue(option.label);
        setSelectedValueCombobox(option.label);
        closeCombobox();
        handleFocusInput();
    };

    const handleOptionItemKeyDownCombobox = (event: KeyboardEvent<HTMLButtonElement>, option: SelectOption) => {
        if (event.key === 'Escape') {
            handleFocusInput();
        } else if (event.key === ' ' || event.key === 'Enter') selectOptionCombobox(event, option);
    };

    const mockAutocompleteRequest = (phrase: string) => {
        const results = options.filter((option) => option.value.toLowerCase().startsWith(phrase.toLowerCase()));
        return results;
    };

    useEffect(() => {
        if (searchValue && !selectedValueCombobox) {
            const getSnippets = async () => {
                openCombobox();
                try {
                    const data = await mockAutocompleteRequest(searchValue);
                    setSnippets(data);
                } catch (error) {
                    closeCombobox();
                    console.error(error);
                }
            };
            getSnippets();
        }
    }, [searchValue]);

    const { close, toggle, isOpen } = useDisclosure();
    const [selectedOption, setSelectedOption] = useState<SelectOption>();
    const id = useId();
    const listboxId = useId();
    const selectTriggerRef = useRef<HTMLDivElement>(null);

    const { refs, style: dropdownStyle } = useDropdown({ isOpen, onClose: close });

    useTrapFocus(refs.floating, {
        arrowKeysUpDown: true,
        activeState: isOpen,
        initialFocus: InitialFocusType.autofocus,
    });

    const selectOption = (option: SelectOption) => {
        setSelectedOption(option);
        close();
        selectTriggerRef.current?.focus();
    };

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === ' ') toggle();
    };

    const handleOptionItemKeyDown = (event: KeyboardEvent<HTMLLIElement>, option: SelectOption) => {
        if (event.key === ' ' || event.key === 'Enter') selectOption(option);
    };

    const handleSelectChange = (event: ChangeEvent) => {
        setAreaCode((event.target as HTMLInputElement)?.value);
        return areaCode ? setAreaCodeIsInvalid(false) : setAreaCodeIsInvalid(true);
    };

    const sendForm = (event: React.FormEvent) => {
        event.preventDefault();
        const userData = {
            personalInformation,
            username,
            email,
            website,
            phone: {
                code: areaCode,
                number: phoneNumber,
            },
            country: selectedValueCombobox,
            interests: selectedOption?.label,
            description,
            emailNotifications,
            pushNotifications,
        };

        console.log(userData);
    };

    return (
        <div className="flex justify-center items-start  min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
                <h1 className="mb-6 text-3xl font-bold text-center">Add now count</h1>
                <form onSubmit={sendForm} className="space-y-6">
                    {/* Personal Information Toggle */}


                    {/* First & Last Name Fields Side by Side */}
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <label className="flex-1">
              <span className="block mb-1 font-medium text-gray-700">
                First Name *
              </span>
                            <SfInput
                                value={username}
                                invalid={usernameIsInvalid}
                                required
                                onInput={() =>
                                    username ? setUsernameIsInvalid(false) : setUsernameIsInvalid(true)
                                }
                                onBlur={() =>
                                    username ? setUsernameIsInvalid(false) : setUsernameIsInvalid(true)
                                }
                                onChange={(event) => setUsername(event.target.value)}
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
                                value={username}
                                invalid={usernameIsInvalid}
                                required
                                onInput={() =>
                                    username ? setUsernameIsInvalid(false) : setUsernameIsInvalid(true)
                                }
                                onBlur={() =>
                                    username ? setUsernameIsInvalid(false) : setUsernameIsInvalid(true)
                                }
                                onChange={(event) => setUsername(event.target.value)}
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
                            value={email}
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
                            Password *
                        </label>
                        <SfInput
                            value={phoneNumber}
                            type="password"
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

