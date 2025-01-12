import { useRef, useState, type KeyboardEvent } from 'react';
import classNames from 'classnames';
import Layout from "@/components/accountuser/layout";
import PageInfoUser from "@/components/accountuser/profileuser/profileAdress";
import Newcount from "@/components/accountuser/profileuser/newcount";
import ResetPassword from "@/components/accountuser/profileuser/resetpassword";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {AppDispatch, RootState, wrapper} from "@/store";
import {sdk} from "../../../sdk.config";
import Customer from "@/pages/user/dashboarduser/[...customer]";
import {getCookie} from "cookies-next";
import {authntication} from "@/store/slices/userSlice";
function getPreviousIndex(current: number, elements: HTMLButtonElement[]) {
    for (let index = current - 1; index >= 0; index -= 1) {
        if (!elements[index].disabled) {
            return index;
        }
    }
    for (let index = elements.length - 1; index > -1; index -= 1) {
        if (!elements[index].disabled) {
            return index;
        }
    }
    return current;
}

function getNextIndex(current: number, elements: HTMLButtonElement[]) {
    for (let index = current + 1; index < elements.length; index += 1) {
        if (!elements[index].disabled) {
            return index;
        }
    }
    for (let index = 0; index < elements.length; index += 1) {
        if (!elements[index].disabled) {
            return index;
        }
    }
    return current;
}

interface Tab {
    label: string;
    disabled?: boolean;
}

const tabs: Tab[] = [
    { label: 'AccountUser'},
    { label: 'New-count' },
    { label: 'Reseter-Password' },
    { label: 'Support' },
    { label: 'Delivery & Returns' },
];
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

export default function TabsBasic({customer}:{customer: Props}) {
    console.log('customer', customer)
    const tablistRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
    const isActive = (tab: Tab) => activeTab.label === tab.label;
    const tabId = (label: string) => `${label}-tab`;
    const panelId = (label: string) => `${label}-panel`;

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const elements = Array.from(tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') || []);
        const current = elements.findIndex((el) => event.currentTarget === el);
        const nextTab = getNextIndex(current, elements);
        const prevTab = getPreviousIndex(current, elements);
        const lastTab = elements.length - 1;

        const goTo = (index: number) => () => {
            event.stopPropagation();
            event.preventDefault();
            const goToElement = elements[index];
            goToElement.focus();
            goToElement.click();
            goToElement.scrollIntoView();
        };

        const interactionsMap = new Map([
            ['ArrowLeft', goTo(prevTab)],
            ['ArrowRight', goTo(nextTab)],
            ['Home', goTo(0)],
            ['End', goTo(lastTab)],
        ]);

        const interaction = interactionsMap.get(event.key);
        interaction?.();
    };

    return (
        <Layout>
            <div
                ref={tablistRef}
                role="tablist"
                aria-label="Select tab"
                aria-orientation="horizontal"
                className="flex gap-2 border-b border-b-neutral-200 pb-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        type="button"
                        role="tab"
                        id={tabId(tab.label)}
                        aria-controls={panelId(tab.label)}
                        aria-selected={isActive(tab)}
                        disabled={tab.disabled}
                        tabIndex={isActive(tab) ? 0 : -1}
                        onClick={() => setActiveTab(tab)}
                        onKeyDown={handleKeyDown}
                        className={classNames(
                            'px-4 py-2 rounded-md font-medium whitespace-nowrap text-neutral-500 hover:enabled:bg-primary-100 hover:enabled:text-primary-800 active:enabled:bg-primary-200 active:enabled:text-primary-900 disabled:text-disabled-500 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:shadow-[inset_0_0_0_4px_rgb(255,255,255)]',
                            {'!bg-neutral-100 !text-black': isActive(tab)},
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {tabs.map((tab) => (
                <div key={tab.label} role="tabpanel" id={panelId(tab.label)} aria-labelledby={tabId(tab.label)}>
                    {
                        isActive(tab)
                        &&
                        <>

                            {
                                <main className="p-4 text-neutral-500">

                                    {tab.label === 'AccountUser' && (
                                        <PageInfoUser customer={customer}/>
                                    )}
                                </main>
                            },


                            {
                                <main className="p-4 text-neutral-500">
                                    {tab.label === 'New-count' && (
                                        <Newcount/>
                                    )}
                                </main>
                            },

                            {
                                <main className="p-4 text-neutral-500">
                                    {tab.label === 'Reseter-Password' && (
                                        <ResetPassword/>
                                    )}
                                </main>
                            }
                        </>

                    }


                </div>
            ))}
        </Layout>
    );

}

export async function getServerSideProps(context) {
    // Fetch data from external API

    let {req, res} = context;
    let token =await  getCookie('auth-token', {req, res})
    console.log('tokenxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', token)
    const customer = await sdk.magento.customer({
        customHeaders: {
            Authorization: `Bearer ${token || ''}`,
        }
    });
    console.log('helllo admin im her', customer)


    return {
        props: {
            customer: customer.data.customer
        }
    };
}




