import React from 'react'
import Link from 'next/link'
import {format} from 'path'
import {SfButton} from "@storefront-ui/react";

// import { ChevronRightIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { SfAccordionItem, SfIconChevronLeft } from '@storefront-ui/react';
import { useState } from 'react';

interface OrderProps {
    infoOrder?: any
}
import {
    SfIconContactSupport,
    SfIconFacebook,
    SfIconHelp,
    SfIconInstagram,
    SfIconCall,
    SfIconPinterest,
    SfIconTwitter,
    SfIconYoutube,
    SfLink,
    SfListItem,
} from '@storefront-ui/react';

const categories = [
    {
        label: 'How to buy',
        subcategories: [
            {
                subcategoryLabel: 'Payment methods',
                link: '#',
            },
            {
                subcategoryLabel: 'Order pickup',
                link: '#',
            },
            {
                subcategoryLabel: 'Purchase status',
                link: '#',
            },
            {
                subcategoryLabel: 'Track orders',
                link: '#',
            },
            {
                subcategoryLabel: 'Returns',
                link: '#',
            },
        ],
    },
    {
        label: 'Help',
        subcategories: [
            {
                subcategoryLabel: 'Help centers',
                link: '#',
            },
            {
                subcategoryLabel: 'Security & fraud',
                link: '#',
            },
            {
                subcategoryLabel: 'Feedback',
                link: '#',
            },
            {
                subcategoryLabel: 'Contact',
                link: '#',
            },
        ],
    },
    {
        label: 'Services',
        subcategories: [
            {
                subcategoryLabel: 'Gift cards',
                link: '#',
            },
            {
                subcategoryLabel: 'Order pickup',
                link: '#',
            },
            {
                subcategoryLabel: 'Purchase status',
                link: '#',
            },
            {
                subcategoryLabel: 'Track orders',
                link: '#',
            },
        ],
    },
    {
        label: 'About',
        subcategories: [
            {
                subcategoryLabel: 'About us',
                link: '#',
            },
            {
                subcategoryLabel: 'Order pickup',
                link: '#',
            },
            {
                subcategoryLabel: 'Purchase status',
                link: '#',
            },
            {
                subcategoryLabel: 'Track orders',
                link: '#',
            },
            {
                subcategoryLabel: 'Returns',
                link: '#',
            },
        ],
    },
];
const socialMedia = [
    {
        label: 'Facebook',
        link: '#',
        icon: () => <SfIconFacebook />,
    },
    {
        label: 'Twitter',
        link: '#',
        icon: () => <SfIconTwitter />,
    },
    {
        label: 'Instagram',
        link: '#',
        icon: () => <SfIconInstagram />,
    },
    {
        label: 'Pinterest',
        link: '#',
        icon: () => <SfIconPinterest />,
    },
    {
        label: 'Youtube',
        link: '#',
        icon: () => <SfIconYoutube />,
    },
];


const contactOptions = [
    {
        label: 'Shipping address',
        link: '#',
        details: ['Find answers online anytime'],
        icon: () => <SfIconHelp size="lg" />,
    },
    {
        label: 'Shipping methode',
        link: '#',
        details: ['Mon–Fri, 5am–10pm PT', 'Sat–Sun, 6am–9pm PT'],
        icon: () => <SfIconContactSupport size="lg" />,
    },
    {
        label: 'billing address',
        link: '#',
        details: ['Mon–Fri, 5am–10pm PT', 'Sat–Sun, 6am–9pm PT'],
        icon: () => <SfIconCall size="lg" />,
    },
    {
        label: 'Payment method',
        link: '#',
        details: ['Mon–Fri, 5am–10pm PT', 'Sat–Sun, 6am–9pm PT'],
        icon: () => <SfIconCall size="lg" />,
    },
];
const bottomLinks = [
    {
        label: 'Terms',
        link: '#',
    },
    {
        label: 'Privacy policy',
        link: '#',
    },
];
const Order = ({infoOrder}: OrderProps) => {
    let items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log(infoOrder)

    const [active, setActive] = useState<string | null>(null);

    const isOpen = (id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => id === active;

    const handleToggle = (id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => (open: boolean) => {
        if (open) {
            setActive(id);
        } else if (isOpen(id)) {
            setActive(null);
        }
    };
    return (
        // <>
        //     {infoOrder.items.map((order: {
        //             increment_id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined;
        //             status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined
        //         }) =>
        //             <main>
        //                 <li>
        //                     <Link
        //                         href={`/orders/`
        //                         }
        //                     >
        //                         <div className="block hover:bg-gray-50">
        //                             <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
        //                                 <div>
        //                                     <p className="text-sm font-medium text-indigo-600 truncate">
        //                                         Order #
        //                                         {order.increment_id}
        //
        //                                     </p>
        //                                     <p className="mt-2 flex items-center text-sm text-gray-500">
        //         <span className="truncate">
        //           Placed on 20:15:30 2021-09-15
        //             {/*{format(new Date(order.created_at), 'PPP')}*/}
        //
        //         </span>
        //                                     </p>
        //                                     <p className="mt-2 flex items-center text-sm text-gray-500">
        //         <span
        //             className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        //           {/*{order.status} */}
        //             {order.status}
        //         </span>
        //                                     </p>
        //                                 </div>
        //                                 <div className="ml-2 flex-shrink-0 flex">
        //                                     {/*<ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>*/}
        //                                 </div>
        //                 <SfButton>vue order</SfButton>
        //                             </div>
        //                         </div>
        //                     </Link>
        //                 </li>
        //             </main>
        //     )
        //
        //     }
        // </>

        <>
            <div className="">
                <div className=" py-2 gap-x-4 md:self-start">

                    <div className="border border-neutral-200 rounded-md divide-y text-neutral-900">
                        {
                            infoOrder?.items?.map((order: {
                                    increment_id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined;
                                    status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined
                                }) =>


                                    <SfAccordionItem
                                        key={order.increment_id}
                                        summary={
                                            <>
                                                <div
                                                    className=" p-3 font-medium hover:bg-neutral-100 active:neutral-100">

                                                    <p className="text-sm font-medium text-indigo-600 truncate">Order
                                                        Number: {order.increment_id}</p>
                                                    <p className="text-sm font-medium text-indigo-600 truncate">Order Status
                                                        :{order.status}</p>
                                                    <p className="text-sm font-medium text-indigo-600 truncate">Order Status
                                                        :{order.carrier} .... voire detials</p>
                                                    <SfIconChevronLeft
                                                        className={classNames('text-neutral-500', {
                                                            'rotate-90': isOpen(order.increment_id),
                                                            '-rotate-90': !isOpen(order.increment_id),
                                                        })}
                                                    />
                                                </div>
                                            </>
                                        }
                                        onToggle={handleToggle(order.increment_id)}
                                        open={isOpen(order.increment_id)}
                                    >
                                        <div>
                                            {order?.items.map((item: { item: any }) => (
                                                <>
                                                    <div className="mt-6 border-t border-gray-100">
                                                        <dl className="divide-y divide-gray-100">
                                                            <div
                                                                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm/6 font-medium text-gray-900">Products
                                                                    name
                                                                </dt>
                                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"> {item.product.name}
                                                                </dd>
                                                            </div>
                                                            <div
                                                                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm/6 font-medium text-gray-900">Discount
                                                                </dt>
                                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"> {item.product.price_range.maximum_price.discount.amount_off}$
                                                                </dd>
                                                            </div>
                                                            <div
                                                                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm/6 font-medium text-gray-900">regular
                                                                    price
                                                                </dt>
                                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"> {item.product.price_range.maximum_price.regular_price.value}$</dd>
                                                            </div>
                                                            <div
                                                                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm/6 font-medium text-gray-900">final
                                                                    price
                                                                </dt>
                                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{item.product.price_range.maximum_price.final_price.value}$</dd>
                                                            </div>

                                                            {item?.selected_options.map((option, index) => (
                                                                <div key={index}
                                                                     className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                    <dt className="text-sm font-medium text-gray-900">{option.label}</dt>

                                                                    {/* Conditionally Render Background Color for Color Option */}
                                                                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                                                                        {option.label === "Color" ? (
                                                                            <span
                                                                                className="inline-block px-4 py-2 rounded-md border border-gray-300 text-white"
                                                                                style={{backgroundColor: option.value.toLowerCase()}} // Dynamically apply color
                                                                            >
                                                                              {option.value}
                                                                              </span>
                                                                        ) : (
                                                                            option.value
                                                                        )}
                                                                    </dd>
                                                                </div>
                                                            ))}

                                                            <div
                                                                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm/6 font-medium text-gray-900">image
                                                                </dt>
                                                                <img   width={90} // Set exact size
                                                                       height={60}
                                                                       className="rounded-md border border-gray-300"src={item.product.thumbnail.url} />
                                                            </div>

                                                            <div
                                                                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm/6 font-medium text-gray-900">About</dt>
                                                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
                                                                    dangerouslySetInnerHTML={{__html: item.product.description.html}}>
                                                                </dd>
                                                            </div>
                                                            {/*<div*/}
                                                            {/*    className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">*/}
                                                            {/*    <dt className="text-sm/6 font-medium text-gray-900">Attachments</dt>*/}
                                                            {/*    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">*/}
                                                            {/*        <ul role="list"*/}
                                                            {/*            className="divide-y divide-gray-100 rounded-md border border-gray-200">*/}
                                                            {/*            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">*/}
                                                            {/*                <div className="flex w-0 flex-1 items-center">*/}
                                                            {/*                    <svg*/}
                                                            {/*                        className="size-5 shrink-0 text-gray-400"*/}
                                                            {/*                        viewBox="0 0 20 20"*/}
                                                            {/*                        fill="currentColor" aria-hidden="true"*/}
                                                            {/*                        data-slot="icon">*/}
                                                            {/*                        <path fill-rule="evenodd"*/}
                                                            {/*                              d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"*/}
                                                            {/*                              clip-rule="evenodd"/>*/}
                                                            {/*                    </svg>*/}
                                                            {/*                    <div*/}
                                                            {/*                        className="ml-4 flex min-w-0 flex-1 gap-2">*/}
                                                            {/*                         <span*/}
                                                            {/*                    className="truncate font-medium">resume_back_end_developer.pdf</span>*/}
                                                            {/*                        <span*/}
                                                            {/*                            className="shrink-0 text-gray-400">2.4mb</span>*/}
                                                            {/*                    </div>*/}
                                                            {/*                </div>*/}
                                                            {/*                <div className="ml-4 shrink-0">*/}
                                                            {/*                    <a href="#"*/}
                                                            {/*                       className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>*/}
                                                            {/*                </div>*/}
                                                            {/*            </li>*/}
                                                            {/*            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">*/}
                                                            {/*                <div className="flex w-0 flex-1 items-center">*/}
                                                            {/*                    <svg*/}
                                                            {/*                        className="size-5 shrink-0 text-gray-400"*/}
                                                            {/*                        viewBox="0 0 20 20"*/}
                                                            {/*                        fill="currentColor" aria-hidden="true"*/}
                                                            {/*                        data-slot="icon">*/}
                                                            {/*                        <path fill-rule="evenodd"*/}
                                                            {/*                              d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"*/}
                                                            {/*                              clip-rule="evenodd"/>*/}
                                                            {/*                    </svg>*/}
                                                            {/*                    <div*/}
                                                            {/*                        className="ml-4 flex min-w-0 flex-1 gap-2">*/}
                                                            {/*                   <span*/}
                                                            {/*                   className="truncate font-medium">coverletter_back_end_developer.pdf</span>*/}
                                                            {/*                        <span*/}
                                                            {/*                            className="shrink-0 text-gray-400">4.5mb</span>*/}
                                                            {/*                    </div>*/}
                                                            {/*                </div>*/}
                                                            {/*                <div className="ml-4 shrink-0">*/}
                                                            {/*                    <a href="#"*/}
                                                            {/*                       className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>*/}
                                                            {/*                </div>*/}
                                                            {/*            </li>*/}
                                                            {/*        </ul>*/}
                                                            {/*    </dd>*/}
                                                            {/*</div>*/}
                                                        </dl>
                                                    </div>

                                                </>
                                            ))

                                            }
                                        </div>

                                        <hr/>


                                    </SfAccordionItem>
                            )}
                    </div>

                </div>
                {/*<div className="flex items-center justify-center gap-6 py-2 my-4 md:ml-auto md:my-0">*/}
                {/*    {bottomLinks.map(({ label, link }) => (*/}
                {/*        <SfLink*/}
                {/*            key={label}*/}
                {/*            variant="secondary"*/}
                {/*            className="text-white no-underline typography-text-sm active:text-white active:underline hover:text-white hover:underline"*/}
                {/*            href={link}*/}
                {/*        >*/}
                {/*            {label}*/}
                {/*        </SfLink>*/}
                {/*    ))}*/}
                {/*</div>*/}

            </div>

            {/*<footer className="pt-10 bg-neutral-100">*/}
            {/*      */}
            {/*    </footer>*/}




            <main className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-md shadow p-8">

                    {/* Invoice Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">Invoice</h1>
                        <p className="text-gray-600 mt-1">
                            For work completed from{" "}
                            <time dateTime="2022-08-01">August 1, 2022</time> to{" "}
                            <time dateTime="2022-08-31">August 31, 2022</time>.
                        </p>
                    </div>

                    {/* Print Button */}
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
                        >
                            Print
                        </button>
                    </div>

                    {/* Invoice Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead className="bg-gray-100 border-b">
                            <tr>
                                <th scope="col" className="p-4 text-left font-medium text-gray-700">
                                    Project
                                </th>
                                <th scope="col" className="p-4 text-right font-medium text-gray-700">
                                    Hours
                                </th>
                                <th scope="col" className="p-4 text-right font-medium text-gray-700">
                                    Rate
                                </th>
                                <th scope="col" className="p-4 text-right font-medium text-gray-700">
                                    Price
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y">
                            <tr>
                                <td className="p-4">
                                    <div className="font-semibold text-gray-900">Logo redesign</div>
                                    <div className="text-sm text-gray-500">
                                        New logo and digital asset playbook.
                                    </div>
                                </td>
                                <td className="p-4 text-right">20.0</td>
                                <td className="p-4 text-right">$100.00</td>
                                <td className="p-4 text-right">$2,000.00</td>
                            </tr>

                            <tr>
                                <td className="p-4">
                                    <div className="font-semibold text-gray-900">Website redesign</div>
                                    <div className="text-sm text-gray-500">
                                        Design and program new company website.
                                    </div>
                                </td>
                                <td className="p-4 text-right">52.0</td>
                                <td className="p-4 text-right">$100.00</td>
                                <td className="p-4 text-right">$5,200.00</td>
                            </tr>

                            <tr>
                                <td className="p-4">
                                    <div className="font-semibold text-gray-900">Business cards</div>
                                    <div className="text-sm text-gray-500">
                                        Design and production of 3.5" x 2.0" business cards.
                                    </div>
                                </td>
                                <td className="p-4 text-right">12.0</td>
                                <td className="p-4 text-right">$100.00</td>
                                <td className="p-4 text-right">$1,200.00</td>
                            </tr>

                            <tr>
                                <td className="p-4">
                                    <div className="font-semibold text-gray-900">T-shirt design</div>
                                    <div className="text-sm text-gray-500">Three T-shirt design concepts.</div>
                                </td>
                                <td className="p-4 text-right">4.0</td>
                                <td className="p-4 text-right">$100.00</td>
                                <td className="p-4 text-right">$400.00</td>
                            </tr>
                            </tbody>
                            <tfoot className="border-t">
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="p-4 text-right font-normal text-gray-700"
                                >
                                    Subtotal
                                </th>
                                <td className="p-4 text-right font-semibold">$8,800.00</td>
                            </tr>
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="p-4 text-right font-normal text-gray-700"
                                >
                                    Tax
                                </th>
                                <td className="p-4 text-right font-semibold">$1,760.00</td>
                            </tr>
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="p-4 text-right font-medium text-gray-900"
                                >
                                    Total
                                </th>
                                <td className="p-4 text-right font-bold text-gray-900">$10,560.00</td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </main>






        </>

        ////////////order detaisl her
        // <div className="max-w-1xl px-1 sm:px-1 lg:px-1 ">
        //     <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Order Details</h1>
        //
        //     <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        //         <div className="px-4 py-5 sm:px-6">
        //             <h3 className="text-lg leading-6 font-medium text-gray-900">Order #
        //                 {/*{order.increment_id}*/}
        //                 00000051336</h3>
        //             <p className="mt-1 max-w-2xl text-sm text-gray-500">
        //                 Placed on 20:15:30 2021-09-15
        //                 {/*{format(new Date(order.created_at), 'PPP')}*/}
        //             </p>
        //         </div>
        //         <div className="border-t border-gray-200">
        //             <dl>
        //                 {/* Order Status */}
        //                 <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        //                     <dt className="text-sm font-medium text-gray-500">Status</dt>
        //                     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        //                         {/*{order.status}*/}
        //                         is stock
        //                     </dd>
        //                 </div>
        //
        //                 {/* Shipping Address */}
        //                 <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        //                     <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
        //                     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        //                       radhouene
        //                         {/*{order.shipping_address.full_name}*/}
        //                         <br/>
        //                       01100 viterbo itsqlie
        //                         {/*{order.shipping_address.street.join(', ')}*/}
        //                         <br/>
        //                    italie,viterbo,01100
        //                         {/*{order.shipping_address.city}, {order.shipping_address.region} {order.shipping_address.postcode}*/}
        //                         <br/>
        //                     IT
        //                         {/*{order.shipping_address.country_id}*/}
        //                     </dd>
        //                 </div>
        //
        //                 {/* Items */}
        //                 <div className="bg-gray-50 px-4 py-5 sm:px-6">
        //                     <h3 className="text-lg leading-6 font-medium text-gray-900">Items</h3>
        //                     <ul className="mt-4 border-t border-gray-200 divide-y divide-gray-200">
        //                         {items.map((item) => (
        //                             <li
        //                                 // key={item.item_id}
        //                                 className="py-4 flex">
        //                                 <img
        //                                     src={item?.product_image || 'https://imgs.search.brave.com/HnucNzNI7AHQT2y_JJQkSupdYAMfwkceCfGMy7P0LAI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvUGhv/dG9GVExQL1AzLWlT/dG9jay0yMTY0MTU4/MTAzLmpwZw'}
        //                                     // alt={item.name}
        //                                     className="h-16 w-16 rounded-md object-cover flex-shrink-0"
        //                                 />
        //                                 <div className="ml-4 flex-1 flex flex-col">
        //                                     <div>
        //                                         <div className="flex justify-between text-sm">
        //                                             <p className="font-medium text-gray-900">
        //                                                 {/*{item.name}*/}
        //                                                 sac</p>
        //                                             <p className="text-gray-500">x
        //                                                 {/*{item.qty_ordered}*/}
        //                                                 5</p>
        //                                         </div>
        //                                         <p className="mt-1 text-sm text-gray-500">
        //                                           {/*  {item.sku}*/}
        //                                             mh02</p>
        //                                     </div>
        //                                     <div className="flex-1 flex items-end justify-between text-sm">
        //                                         <p className="text-gray-900">$
        //                                             {/*{item.price.toFixed(2)}*/}
        //                                             5322</p>
        //                                     </div>
        //                                 </div>
        //                             </li>
        //                         ))}
        //                     </ul>
        //                 </div>
        //
        //                 {/* Order Total */}
        //                 <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        //                     <dt className="text-sm font-medium text-gray-500">Total</dt>
        //                     <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        //                         {/*${order.grand_total.toFixed(2)}*/}
        //                         fffefrff
        //                     </dd>
        //                 </div>
        //             </dl>
        //         </div>
        //     </div>
        //
        //     <div className="mt-6">
        //         <Link href="/orders">
        //             <p className="text-indigo-600 hover:text-indigo-900">
        //                 &larr; Back to Order History
        //             </p>
        //         </Link>
        //     </div>
        // </div>
    );

}
export default Order
