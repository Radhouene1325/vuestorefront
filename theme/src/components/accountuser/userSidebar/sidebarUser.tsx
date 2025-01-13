// import React, { Fragment } from "react";
// import Link from "next/link";
// import {
//     SfAccordionItem,
//     SfIconClose,
//     SfIconChevronLeft,
//     SfIconArrowBack,
//     SfButton,
//     SfChip,
//     SfListItem,
//     SfCounter,
//     SfSelect,
// } from "@storefront-ui/react";
// import { useState } from "react";
// type SortOption = {
//     label: string;
//     value: string;
// };
//
// const sortOptions: SortOption[] = [
//     { label: "Sort by Name", value: "name" },
//     { label: "Sort by Date", value: "date" },
//     { label: "Sort by Relevance", value: "relevance" },
// ];
//
// // Optional: dummy handler for clearing filters
// const handleClearFilters = () => {
//     console.log("Filters cleared!");
// };
// // {handleCloseSidebar}:{handleCloseSidebar:()=>void}
// export default function Sidebar() {
//     const [isOpen, setIsOpen] = useState(true);
//
//     const handleCloseSidebar = () => {
//         setIsOpen(false);
//     };
//
//     if (!isOpen) {
//         return null;
//     }
//
//     return (
//         <aside className="w-full md:max-w-[376px] bg-white md:rounded-md shadow-sm">
//             {/* Header with Title & Close (Mobile only) */}
//             <div className="flex items-center justify-between p-4 border-b border-neutral-200">
//                 <h4 className="font-bold typography-headline-4">My Account</h4>
//                 <button
//
//                     type="button"
//                     className="sm:hidden text-neutral-500"
//                     aria-label="Close filters panel"
//                     onClick={handleCloseSidebar} // Close the sidebar on mobile
//                 >
//                     <SfIconClose />
//                 </button>
//             </div>
//
//
//             {/* Sort (Optional) */}
//             <div className="p-4 border-b border-neutral-200">
//                 <h5 className="pb-2 mb-2 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest">
//                     Sort by
//                 </h5>
//                 <SfSelect aria-label="Sorting">
//                     {sortOptions.map((option) => (
//                         <option value={option.value} key={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </SfSelect>
//             </div>
//
//             {/* PERSONAL DETAILS */}
//             <div className="flex justify-between p-4 hover:bg-green-50 cursor-pointer">
//                 <p className="mb-0 font-medium typography-headline-5">
//                     Personal Details
//                 </p>
//                 <SfIconChevronLeft className="text-neutral-500" />
//             </div>
//             <hr/>
//             <ul className="px-4 pb-4 text-sm">
//                 <li className="mb-2">
//                     <Link href="/user/dashboarduser/info" className="block p-2 rounded-md hover:bg-green-50">
//                         {/* Tailwind classes for hover effect */}
//
//                         My Profile
//                     </Link>
//                 </li>
//                 <li className="mb-2">
//                     <Link href="/accountuser/addresses" className="block p-2 rounded-md hover:bg-green-50">
//
//                         Addresses
//                     </Link>
//                 </li>
//                 <li className="mb-2">
//                     <Link href="/accountuser/newsletter" className="block p-2 rounded-md hover:bg-green-50">
//
//                         My Newsletter
//                     </Link>
//                 </li>
//                 <li className="mb-2">
//                     <Link href="/accountuser/wishlist" className="block p-2 rounded-md hover:bg-green-50">
//
//                         My Wishlist
//                     </Link>
//                 </li>
//             </ul>
//
//
//             {/* ORDER DETAILS */}
//
//             <div className="flex justify-between p-4 hover:bg-green-50 cursor-pointer">
//                 <p className="mb-0 font-medium typography-headline-5">
//                     Order Details
//                 </p>
//                 <SfIconChevronLeft className="text-neutral-500"/>
//             </div>
//             <hr className="my-2" />
//             <ul className="px-4 pb-4 text-sm">
//                 <li className="mb-2">
//                     <Link href="/accountuser/orders" className="block p-2 rounded-md hover:bg-green-50">
//                         Order History
//
//                     </Link>
//                 </li>
//                 <li className="mb-2">
//                     <Link href="/accountuser/reviews" className="block p-2 rounded-md hover:bg-green-50">
//
//                         My Reviews
//                     </Link>
//                 </li>
//                 <li>
//                     <button
//                         onClick={() => alert("Logged out!")}
//                         className="block w-full text-left p-2 rounded-md hover:bg-green-50"
//                     >
//                         Logout
//                     </button>
//                 </li>
//             </ul>
//
//
//             {/* Example: Filter section or any other expansions if needed */}
//             <Fragment>
//                 {/* Example accordion item if you want to keep some filters or other details */}
//                 <div className="flex justify-between p-4 hover:bg-green-50 cursor-pointer">
//                     <p className="mb-0 font-medium typography-headline-5">
//                         Extra Section
//                     </p>
//                     <SfIconChevronLeft className="text-neutral-500"/>
//                 </div>
//
//
//             </Fragment>
//
//             {/* Optional: bottom buttons (if desired) */}
//             <div className="p-4 flex justify-between">
//                 <SfButton
//                     variant="secondary"
//                     className="w-full mr-3 hover:bg-green-50"
//                     onClick={handleClearFilters}
//                 >
//                     Clear
//                 </SfButton>
//                 <SfButton className="w-full hover:bg-green-600 hover:text-white">
//                     Save
//                 </SfButton>
//             </div>
//         </aside>
//     );
// }

// components/accountuser/userSidebar/sidebar.tsx

// components/accountuser/userSidebar/sidebar.tsx

import React, {Fragment, useMemo} from 'react';
import Link from 'next/link';
import {
    SfIconClose,
    SfIconChevronLeft,
    SfSelect,
    SfButton,
} from '@storefront-ui/react';
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import Authentication from "@/utils/authentication"; // Import necessary Storefront UI components
import {useRouter} from "next/router";
type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const sortOptions = [
    { label: 'Sort by Name', value: 'name' },
    { label: 'Sort by Date', value: 'date' },
    { label: 'Sort by Relevance', value: 'relevance' },
];

export default function Sidebar({isOpen, onClose}: SidebarProps) {
    const router = useRouter()
    const handleClearFilters = () => {
        console.log('Filters cleared!');
    };

    const {trigger, data, error, isMutating} = useSWRMutation(
        `${BASEURL}/api/revokeCustomerToken/revokeCustomerToken`,
        Authentication.authentication
    );


    const loggout = async () => {


        await trigger({id:'hello'})
    };
    useMemo(async() => {
        if (data) {
          await   router.push('/')
        }
    }, [data]);

    const sidebarClasses = `
    fixed top-0 left-0 h-full bg-white shadow-lg z-50
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:relative md:translate-x-0
    md:max-w-[376px] w-full
  `;

    return (
        <aside className={sidebarClasses}>
            {/* Header with Title & Close (Mobile only) */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                <h4 className="font-bold typography-headline-4">My Account</h4>
                <button
                    type="button"
                    className="md:hidden text-neutral-500 focus:outline-none"
                    aria-label="Close sidebar"
                    onClick={onClose}
                >
                    <SfIconClose/>
                </button>
            </div>

            {/* Sort Section */}
            <div className="p-4 border-b border-neutral-200">
                <h5 className="pb-2 mb-2 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest">
                    Sort by
                </h5>
                <SfSelect aria-label="Sorting">
                    {sortOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </SfSelect>
            </div>

            {/* PERSONAL DETAILS */}
            <div className="flex justify-between p-4 hover:bg-green-50 cursor-pointer">
                <p className="mb-0 font-medium typography-headline-5">Personal Details</p>
                <SfIconChevronLeft className="text-neutral-500"/>
            </div>
            <hr/>
            <ul className="px-4 pb-4 text-sm">
                <li className="mb-2">
                    <Link href="/user/myprofile" className="block p-2 rounded-md hover:bg-green-50">
                        My Profile
                    </Link>
                </li>
                <li className="mb-2">
                    <Link href="/user/dashboarduser/user/adress" className="block p-2 rounded-md hover:bg-green-50">
                        Addresses
                    </Link>
                </li>
                <li className="mb-2">
                    <Link href="/user/newsletter/newsletter" className="block p-2 rounded-md hover:bg-green-50">
                        My Newsletter
                    </Link>
                </li>
                <li className="mb-2">
                    <Link href="/user/wichlist/wishlist" className="block p-2 rounded-md hover:bg-green-50">
                        My Wishlist
                    </Link>
                </li>
            </ul>

            {/* ORDER DETAILS */}
            <div className="flex justify-between p-4 hover:bg-green-50 cursor-pointer">
                <p className="mb-0 font-medium typography-headline-5">Order Details</p>
                <SfIconChevronLeft className="text-neutral-500"/>
            </div>
            <hr className="my-2"/>
            <ul className="px-4 pb-4 text-sm">
                <li className="mb-2">
                    <Link href="/user/dashboarduser/orders" className="block p-2 rounded-md hover:bg-green-50">
                        Order History
                    </Link>
                </li>
                <li className="mb-2">
                    <Link href="/user/dashboarduser/reviews" className="block p-2 rounded-md hover:bg-green-50">
                        My Reviews
                    </Link>
                </li>
                <li>
                    <button
                        onClick={loggout}
                        className="block w-full text-left p-2 rounded-md hover:bg-green-50"
                    >
                        Logout
                    </button>
                </li>
            </ul>

            {/* Extra Section (optional) */}
            <Fragment>
                <div className="flex justify-between p-4 hover:bg-green-50 cursor-pointer">
                    <p className="mb-0 font-medium typography-headline-5">Extra Section</p>
                    <SfIconChevronLeft className="text-neutral-500"/>
                </div>
            </Fragment>

            {/* Bottom buttons */}
            <div className="p-4 flex justify-between">
                <SfButton
                    variant="secondary"
                    className="w-full mr-3 hover:bg-green-50"
                    onClick={handleClearFilters}
                >
                    Clear
                </SfButton>
                <SfButton className="w-full hover:bg-green-600 hover:text-white">
                    Save
                </SfButton>
            </div>
        </aside>
    );
};
