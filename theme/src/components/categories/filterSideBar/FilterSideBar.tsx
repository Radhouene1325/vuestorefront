import {
    SfAccordionItem,
    SfButton,
    SfCheckbox,
    SfChip,
    SfCounter,
    SfIconCheck,
    SfIconChevronLeft,
    SfIconClose,
    SfListItem,
    SfRadio,
    SfThumbnail,
} from '@storefront-ui/react';
import React, {Fragment, useEffect, useMemo, useState} from 'react';
import classNames from 'classnames';
import {Aggregations} from "@/pages/categorie/[...sulg]";
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import fetchHomePage from "@/utils/fetchHomePage";
import {useRouter} from "next/router";
import {cartProductsFiltred, deleteFilter} from "@/store/slices/productsSlice";
import {useDispatch} from "react-redux";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu, MenuButton, MenuItem, MenuItems
} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon} from "@heroicons/react/20/solid";




const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
type FilterDetail = {
    id: string;
    label: string;
    value: string;
    counter?: number;
    link?: string;
};

type Node = {
    id: string;
    summary: string;
    type: string;
    details: FilterDetail[];
};


interface FiltersSideBarProps {
    aggregations?: Array<Aggregations>,
    toggleFiltere?: () => void
}

const  FiltersSideBar=({aggregations, toggleFiltere}: FiltersSideBarProps) =>{
    const dispatchEvent = useDispatch();
    const router = useRouter();
    console.log(router);
    const {uid} = router.query;
    console.log(aggregations);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [price, setPrice] = useState<string | null>(null);
    const [rating, setRating] = useState<string | null>(null);
    const [opened, setOpened] = useState<string[]>(aggregations?.map((item) => item.attribute_code) || []);
    console.log(selectedFilters);
    console.log(price);
    console.log(rating);


    const isAccordionItemOpen = (attribute_code: string) => opened.includes(attribute_code);





    const handleToggle = (attribute_code: string) => (open: boolean) => {
        if (open) {
            setOpened((current) => [...current, attribute_code]);
        } else {
            setOpened((current) => current.filter((item) => item !== attribute_code));
        }
    };

    console.log(opened);
    const {trigger, data, error, isMutating} = useSWRMutation(
        (arg: string | string[][] | Record<string, string> | URLSearchParams | undefined) => {
            const query = new URLSearchParams(arg).toString();

            return `${BASEURL}/api/productsCategory/productsCategories/${query}`;
        },


        fetchHomePage.filterProducts
    );

    // const handelSelectAttribute =async (e) => {
    //     // console.log(attribute_code);
    //     // const x = opened.includes(attribute_code);
    //     // console.log(x)
    //     // if(x) {
    //     //
    //     //
    //     //
    //     //     let selected = aggregations?.filter((item) => item.attribute_code === attribute_code);
    //     //     console.log(selected);
    //     //
    //     // }
    //
    //     setValueselected({
    //         ...valueselected,
    //         [e.target.name]: e.target.value
    //     })
    //
    //     let index = await trigger({valueselected, uid});
    //     console.log(index.data.data)
    //     dispatchEvent(cartProductsFiltred(index?.data.data));
    //
    // }



    const [valueselected, setValueselected] = useState<Record<string, string[]>>({});


    const [selectName, setSelectName] = useState<string>('');
    console.log(selectName);
    const isFilterSelected = (selectedValue: React.Key | readonly string[] | null | undefined) => {
        if (!selectName || !valueselected[selectName]) return false; // Avoid errors

        Object.keys(valueselected).length > 0 ? Object.keys(valueselected[selectName]).includes(selectedValue) : null;

    };
    const handelSelectAttribute = async (e) => {
        const { name, value } = e.target; // Extract name and value from event
        setSelectName(name);

        // setValueselected((prev) => {
        //     // If the attribute exists and is an array, update it
        //     if (Array.isArray(prev[name])) {
        //         // Toggle selection: If value is already present, remove it; otherwise, add it
        //         const updatedValues = prev[name].includes(value)
        //             ? prev[name].filter((v) => v !== value) // Remove if exists
        //             : [...prev[name], value]; // Add new value
        //
        //         return {
        //             ...prev,
        //             [name]: updatedValues,
        //         };
        //     }
        //
        //     // If the attribute is not an array, initialize it as an array
        //     return {
        //         ...prev,
        //         [name]: [value],
        //     };
        // });
        setValueselected((prev) => {
            if (!prev[name]) {
                return { ...prev, [name]: [value] }; // Initialize if not present
            }

            const updatedValues = prev[name].includes(value)
                ? prev[name].filter((v) => v !== value) // Remove if exists
                : [...prev[name], value]; // Add new value

            return { ...prev, [name]: updatedValues };
        });

    };
    console.log(valueselected);





    console.log(data?.data?.data.products.items);
    // dispatchEvent(cartProductsFiltred(data?.data?.data));

    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(valueselected).length > 0) {
                let index = await trigger({valueselected, uid});
                console.log(index.data.data);
                if(index?.data?.data){

                    dispatchEvent(cartProductsFiltred(index?.data?.data?.products?.items));
                }
            }
        };
        fetchData();
    }, [valueselected]);
    let handelShowProducts = async () => {
        let index = await trigger({valueselected, uid});
        console.log(index.data.data)
        // dispatchEvent(cartProductsFiltred(index?.data.data));

    }
    // useMemo(() => {
    //     if (data?.data?.data) {
    //         dispatchEvent(cartProductsFiltred(data?.data.data));
    //     }
    // }, [data?.data?.data])

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            console.log(url);
            console.log(url.startsWith("/categorie")); // Check if it's a category route

            if (router.query.uid !== null) {
                dispatchEvent(cartProductsFiltred([])); // Dispatch the action
                setValueselected({}); // Reset filters
                setSelectName(""); // Reset selected name
            }
        };

        // Listen to route change
        router.events.on("routeChangeComplete", handleRouteChange);

        // Cleanup event listener when component unmounts
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router]);



    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (
        <>




            {/*                    /!* Filters *!/*/}
                                <form className="hidden lg:block sticky top-[64px] left-0 h-[calc(100vh-64px)] w-72 overflow-y-auto bg-white border-r border-gray-200 px-4 shadow-md">
                                    <h3 className="sr-only">Categories</h3>
                                    {/*<ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">*/}
                                    {/*    {subCategories.map((category) => (*/}
                                    {/*        <li key={category.name}>*/}
                                    {/*            <a href={category.href}>{category.name}</a>*/}
                                    {/*        </li>*/}
                                    {/*    ))}*/}
                                    {/*</ul>*/}

                                    {aggregations?.map((section) => (
                                        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.label}</span>
                                                    <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                                                  <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                                                  </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    {section.options.map((option: { value: React.Key | readonly string[] | null | undefined; label: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, optionIdx: any) => (
                                                        <div key={Array.isArray(option.value) ? option.value.join(",") : option.value?.toString()} className="flex gap-3">
                                                            <div className="flex h-5 shrink-0 items-center">
                                                                <div className="group grid size-4 grid-cols-1">
                                                                    <input
                                                                        defaultValue={Array.isArray(option.value) ? option.value.join(",") : option.value?.toString() ?? ""}
                                                                        id={`filter-mobile-${section.label}-${optionIdx}`}
                                                                        name={`${section.attribute_code}`}
                                                                        type="checkbox"
                                                                        checked={isFilterSelected(option.value)}

                                                                        onChange={async(e: any) => {
                                                                            await handelSelectAttribute(e);
                                                                        }}
                                                                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                    />
                                                                    <svg
                                                                        fill="none"
                                                                        viewBox="0 0 14 14"
                                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                                    >
                                                                        <path
                                                                            d="M3 8L6 11L11 3.5"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-[:checked]:opacity-100"
                                                                        />
                                                                        <path
                                                                            d="M3 7H11"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}



                                </form>

            {/*                    /!* Product grid *!/*/}
            {/*                    <div className="lg:col-span-3">/!* Your content *!/</div>*/}
            {/*                </div>*/}
            {/*            </section>*/}
            {/*        </main>*/}
            {/*    </div>*/}
            {/*</div>*/}


        </>
    );
};


export const FilterSideBarMobile = ({ aggregations }: { aggregations: { id: string; label: string; options: { value: string; label: string }[] }[] }) => {
    const dispatchEvent = useDispatch();
    const router = useRouter();
    console.log(router);
    const {uid} = router.query;
    console.log(aggregations);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [price, setPrice] = useState<string | null>(null);
    const [rating, setRating] = useState<string | null>(null);
    const [opened, setOpened] = useState<string[]>(aggregations?.map((item) => item.attribute_code) || []);
    console.log(selectedFilters);
    console.log(price);
    console.log(rating);


    const isAccordionItemOpen = (attribute_code: string) => opened.includes(attribute_code);





    const handleToggle = (attribute_code: string) => (open: boolean) => {
        if (open) {
            setOpened((current) => [...current, attribute_code]);
        } else {
            setOpened((current) => current.filter((item) => item !== attribute_code));
        }
    };

    console.log(opened);
    const {trigger, data, error, isMutating} = useSWRMutation(
        (arg: string | string[][] | Record<string, string> | URLSearchParams | undefined) => {
            const query = new URLSearchParams(arg).toString();

            return `${BASEURL}/api/productsCategory/productsCategories/${query}`;
        },


        fetchHomePage.filterProducts
    );

    // const handelSelectAttribute =async (e) => {
    //     // console.log(attribute_code);
    //     // const x = opened.includes(attribute_code);
    //     // console.log(x)
    //     // if(x) {
    //     //
    //     //
    //     //
    //     //     let selected = aggregations?.filter((item) => item.attribute_code === attribute_code);
    //     //     console.log(selected);
    //     //
    //     // }
    //
    //     setValueselected({
    //         ...valueselected,
    //         [e.target.name]: e.target.value
    //     })
    //
    //     let index = await trigger({valueselected, uid});
    //     console.log(index.data.data)
    //     dispatchEvent(cartProductsFiltred(index?.data.data));
    //
    // }



    const [valueselected, setValueselected] = useState<Record<string, string[]>>({});


    const [selectName, setSelectName] = useState<string>('');
    console.log(selectName);
    const isFilterSelected = (selectedValue: string) => {
        if (!selectName || !valueselected[selectName]) return false; // Avoid errors

        Object.keys(valueselected).length > 0 ? Object.keys(valueselected[selectName]).includes(selectedValue) : null;

    };
    const handelSelectAttribute = async (e) => {
        const { name, value } = e.target; // Extract name and value from event
        setSelectName(name);

        // setValueselected((prev) => {
        //     // If the attribute exists and is an array, update it
        //     if (Array.isArray(prev[name])) {
        //         // Toggle selection: If value is already present, remove it; otherwise, add it
        //         const updatedValues = prev[name].includes(value)
        //             ? prev[name].filter((v) => v !== value) // Remove if exists
        //             : [...prev[name], value]; // Add new value
        //
        //         return {
        //             ...prev,
        //             [name]: updatedValues,
        //         };
        //     }
        //
        //     // If the attribute is not an array, initialize it as an array
        //     return {
        //         ...prev,
        //         [name]: [value],
        //     };
        // });
        setValueselected((prev) => {
            if (!prev[name]) {
                return { ...prev, [name]: [value] }; // Initialize if not present
            }

            const updatedValues = prev[name].includes(value)
                ? prev[name].filter((v) => v !== value) // Remove if exists
                : [...prev[name], value]; // Add new value

            return { ...prev, [name]: updatedValues };
        });

    };
    console.log(valueselected);





    console.log(data?.data?.data.products.items);
    // dispatchEvent(cartProductsFiltred(data?.data?.data));

    useEffect(() => {
        const fetchData = async () => {
            if (Object.keys(valueselected).length > 0) {
                let index = await trigger({valueselected, uid});
                console.log(index.data.data);
                if(index?.data?.data){

                    dispatchEvent(cartProductsFiltred(index?.data?.data?.products?.items));
                }
            }
        };
        fetchData();
    }, [valueselected]);
    let handelShowProducts = async () => {
        let index = await trigger({valueselected, uid});
        console.log(index.data.data)
        // dispatchEvent(cartProductsFiltred(index?.data.data));

    }
    // useMemo(() => {
    //     if (data?.data?.data) {
    //         dispatchEvent(cartProductsFiltred(data?.data.data));
    //     }
    // }, [data?.data?.data])

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            console.log(url);
            console.log(url.startsWith("/categorie")); // Check if it's a category route

            if (router.query.uid !== null) {
                dispatchEvent(cartProductsFiltred([])); // Dispatch the action
                setValueselected({}); // Reset filters
                setSelectName(""); // Reset selected name
            }
        };

        // Listen to route change
        router.events.on("routeChangeComplete", handleRouteChange);

        // Cleanup event listener when component unmounts
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router]);



    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (

        <form className="mt-4 border-t border-gray-200">
        <h3 className="sr-only">Categories</h3>
        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
            {subCategories.map((category) => (
                <li key={category.name}>
                    <a href={category.href} className="block px-2 py-3">
                        {category.name}
                    </a>
                </li>
            ))}
        </ul>

        {aggregations?.map((section) => (
            <Disclosure key={section.attribute_code} as="div" className="border-t border-gray-200 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.label}</span>
                        <span className="ml-6 flex items-center">
                     <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                       <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                        </span>
                    </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                                <div className="flex h-5 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            defaultValue={Array.isArray(option.value) ? option.value.join(",") : option.value?.toString() ?? ""}
                                            id={`filter-mobile-${section.label}-${optionIdx}`}
                                            name={`${section.attribute_code}`}
                                            type="checkbox"
                                            checked={isFilterSelected(option.value)}

                                            onChange={async(e: any) => {
                                                await handelSelectAttribute(e);
                                            }}
                                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                        >
                                            <path
                                                d="M3 8L6 11L11 3.5"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-[:checked]:opacity-100"
                                            />
                                            <path
                                                d="M3 7H11"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <label
                                    htmlFor={`filter-mobile-${section.label}-${optionIdx}`}
                                    className="min-w-0 flex-1 text-gray-500"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        ))}


    </form>

    );
}



export default FiltersSideBar;
