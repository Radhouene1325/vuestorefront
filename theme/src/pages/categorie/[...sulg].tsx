// // import React from 'react'
// // import {useRouter} from "next/router";
// // import Breadcrumbse from "@/components/categories/breadcrumbs/Breadcrumbs";
// // import FiltersSideBar from "@/components/categories/filterSideBar/FilterSideBar";
// // import ProductCard from "@/components/categories/productsCart/ProductsCart";
// // import {Pagination} from "@/components/categories/pagination/Pagination";
// //
// // const categories = () => {
// //     const array=[1,2,3,4,5,6,7,8,9,10]
// //     const route=useRouter()
// //     console.log(route.query.sulg)
// //     return (
// //         <main>
// //             <div className="mx-12 my-8">
// //                 <Breadcrumbse/>
// //
// //                 <h1 className="text-xl font-bold my-2">Broser Products Categories</h1>
// //                 <div className="flex gap-6">
// //
// //                     <FiltersSideBar/>
// //
// //                     <div className="flex flex-col gap-8">
// //
// //                         <h2 className="text-larg font-bold">Products categories</h2>
// //                         <div className="flex flex-wrap gap-2">
// //                             {array.map((item, index) => {
// //                                 return <ProductCard key={index}/>
// //                             })}
// //                         </div>
// //                         <Pagination/>
// //                     </div>
// //                 </div>
// //             </div>
// //
// //         </main>
// //     );
// // };
// // export default categories;
//
import React, {useEffect} from 'react'
import { useRouter } from "next/router";
import Breadcrumbse from "@/components/categories/breadcrumbs/Breadcrumbs";
import FiltersSideBar, {FilterSideBarMobile, filterSideBarMobile} from "@/components/categories/filterSideBar/FilterSideBar";
import ProductCard from "@/components/categories/productsCart/ProductsCart";
import { Pagination } from "@/components/categories/pagination/Pagination";
import fetchHomePage from "@/utils/fetchHomePage";
import {useState} from "react";
import {parse} from "cookie";
import {useDispatch, useSelector} from "react-redux";


// const sortOptions = [
//     { name: 'Most Popular', href: '#', current: true },
//     { name: 'Best Rating', href: '#', current: false },
//     { name: 'Newest', href: '#', current: false },
//     { name: 'Price: Low to High', href: '#', current: false },
//     { name: 'Price: High to Low', href: '#', current: false },
// ]
// const subCategories = [
//     { name: 'Totes', href: '#' },
//     { name: 'Backpacks', href: '#' },
//     { name: 'Travel Bags', href: '#' },
//     { name: 'Hip Bags', href: '#' },
//     { name: 'Laptop Sleeves', href: '#' },
// ]
//
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }
//
// const filters = [
//     {
//         id: 'color',
//         name: 'Color',
//         options: [
//             { value: 'white', label: 'White', checked: false },
//             { value: 'beige', label: 'Beige', checked: false },
//             { value: 'blue', label: 'Blue', checked: true },
//             { value: 'brown', label: 'Brown', checked: false },
//             { value: 'green', label: 'Green', checked: false },
//             { value: 'purple', label: 'Purple', checked: false },
//         ],
//     },
//     {
//         id: 'category',
//         name: 'Category',
//         options: [
//             { value: 'new-arrivals', label: 'New Arrivals', checked: false },
//             { value: 'sale', label: 'Sale', checked: false },
//             { value: 'travel', label: 'Travel', checked: true },
//             { value: 'organization', label: 'Organization', checked: false },
//             { value: 'accessories', label: 'Accessories', checked: false },
//         ],
//     },
//     {
//         id: 'size',
//         name: 'Size',
//         options: [
//             { value: '2l', label: '2L', checked: false },
//             { value: '6l', label: '6L', checked: false },
//             { value: '12l', label: '12L', checked: false },
//             { value: '18l', label: '18L', checked: false },
//             { value: '20l', label: '20L', checked: false },
//             { value: '40l', label: '40L', checked: true },
//         ],
//     },
// ]
//
//
// import {cartProductsCategoriese} from "@/store/slices/productsSlice";
// export interface Options{
//     label:string,
//     count:number,
//     value:string,
//     __typename:string,
//
//
// }
// export interface Aggregations{
//     attribute_code:string,
//     label:string,
//     options:Array<Options>,
//     type:string,
//     __typename:string,
// }
//
// export interface Url_rewrite{
//    url:string,
//     __typename:string,}
//
// export interface Variants{
//     product: {
//         uid: string,
//         name: string,
//         sku: string,
//         price: number,
//         thumbnail: { url: string, label: string, __typename: string, },
//         price_range: {
//             minimum_price: {
//                 regular_price: {
//                     value: number,
//                     currency: string
//                     __typename: string,
//                 },
//                 final_price: {
//                     value: number,
//                     currency: string
//                 }
//
//                 __typename: string,
//             },
//
//         },
//
//
//     };
// }
// export interface ProductType{
//     uid:string,
//     name:string,
//     sku:string,
//     price:number,
//     thumbnail: {
//         url:string,
//         label:string,
//         __typename:string,
//     },
//
//     rating_summary:number,
//     review_count:number,
//     url_rewrites:Array<Url_rewrite>,
//     variants:Array<Variants>,
//     url_key:string,
//     url_suffix:string,
// }
// export interface Products{
//     items:Array<ProductType>,
//     aggregations:Array<Aggregations>,
// }
//
// const fetcher = (url: string) => fetch(url).then((res) => res.json());
//
// const Categories = ({products}:{products:Products}) => {
//     const router = useRouter();
// const dispatch=useDispatch()
// //
// //     const { data } = useSWR(`${BASEURL}/api/productsCategory/productsCategories/?uid=${router.query.sulg}`, fetcher);
// // console.log(data)
//
//     //console.log(products);
//     // useEffect(() => {
//     //     dispatch(cartProductsCategoriese(products));
//     //
//     // },[products])
//
//
//     const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
//
//
//
//
//
//     const {uid} = router.query;
//     console.log(uid)
//     console.log(router.query.sulg)
//      const {items,aggregations}:Products=products.products
//
//     console.log(aggregations)
//
//      console.log(items)
//
//     // Example array for demonstration
// const [isFlterOpen, setIsFilerOpen] = React.useState<boolean>(true);
//     const toggleFilter = () => {
//         setIsFilerOpen((prevState) => !prevState);
//     };
//     // Log the dynamic route parameter if needed
//     console.log(router);
//
//
//     const useProducts=useSelector((state:any)=>state?.product?.productsIsFiltered)
//     console.log(useProducts)
//     // const {items,aggregations}:Products=useProducts.products
//     // const productList = Object.keys(useProducts).length === 0
//     //     ? items
//     //     : useProducts?.products?.items
//     //
//     // const aggregatorData = Object.keys(useProducts).length === 0
//     //     ? aggregations
//     //     : useProducts?.products?.aggregations
//     //
//     // const limitedAggregations = Array.isArray(aggregatorData)
//     //     ? aggregatorData.slice(0, productList?.length || 0)
//     //     : []
//
//     // console.log(limitedAggregations)
//     const [isFilterOpen, setIsFilterOpen] = React.useState(false);
//
//     const toggleFiltere = () => {
//         setIsFilterOpen((prev) => !prev);
//     };
//
//     return (
//         <>
//
//   {/*      */}
//
//
//             <div className="bg-white">
//                 <div>
//                     {/* Mobile filter dialog */}
//                     <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
//                         <DialogBackdrop
//                             transition
//                             className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
//                         />
//
//                         <div className="fixed inset-0 z-40 flex">
//                             <DialogPanel
//                                 transition
//                                 className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
//                             >
//                                 <div className="flex items-center justify-between px-4">
//                                     <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//                                     <button
//                                         type="button"
//                                         onClick={() => setMobileFiltersOpen(false)}
//                                         className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
//                                     >
//                                         <span className="sr-only">Close menu</span>
//                                         <XMarkIcon aria-hidden="true" className="size-6" />
//                                     </button>
//                                 </div>
//
//                                 {/* Filters */}
//                                 <form className="mt-4 border-t border-gray-200">
//                                     <h3 className="sr-only">Categories</h3>
//                                     <ul role="list" className="px-2 py-3 font-medium text-gray-900">
//                                         {subCategories.map((category) => (
//                                             <li key={category.name}>
//                                                 <a href={category.href} className="block px-2 py-3">
//                                                     {category.name}
//                                                 </a>
//                                             </li>
//                                         ))}
//                                     </ul>
//
//                         {/*            {filters.map((section) => (*/}
//                         {/*                <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">*/}
//                         {/*                    <h3 className="-mx-2 -my-3 flow-root">*/}
//                         {/*                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">*/}
//                         {/*                            <span className="font-medium text-gray-900">{section.name}</span>*/}
//                         {/*                            <span className="ml-6 flex items-center">*/}
//                         {/*  <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />*/}
//                         {/*  <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />*/}
//                         {/*</span>*/}
//                         {/*                        </DisclosureButton>*/}
//                         {/*                    </h3>*/}
//                         {/*                    <DisclosurePanel className="pt-6">*/}
//                         {/*                        <div className="space-y-6">*/}
//                         {/*                            {section.options.map((option, optionIdx) => (*/}
//                         {/*                                <div key={option.value} className="flex gap-3">*/}
//                         {/*                                    <div className="flex h-5 shrink-0 items-center">*/}
//                         {/*                                        <div className="group grid size-4 grid-cols-1">*/}
//                         {/*                                            <input*/}
//                         {/*                                                defaultValue={option.value}*/}
//                         {/*                                                id={`filter-mobile-${section.id}-${optionIdx}`}*/}
//                         {/*                                                name={`${section.id}[]`}*/}
//                         {/*                                                type="checkbox"*/}
//                         {/*                                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"*/}
//                         {/*                                            />*/}
//                         {/*                                            <svg*/}
//                         {/*                                                fill="none"*/}
//                         {/*                                                viewBox="0 0 14 14"*/}
//                         {/*                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"*/}
//                         {/*                                            >*/}
//                         {/*                                                <path*/}
//                         {/*                                                    d="M3 8L6 11L11 3.5"*/}
//                         {/*                                                    strokeWidth={2}*/}
//                         {/*                                                    strokeLinecap="round"*/}
//                         {/*                                                    strokeLinejoin="round"*/}
//                         {/*                                                    className="opacity-0 group-has-[:checked]:opacity-100"*/}
//                         {/*                                                />*/}
//                         {/*                                                <path*/}
//                         {/*                                                    d="M3 7H11"*/}
//                         {/*                                                    strokeWidth={2}*/}
//                         {/*                                                    strokeLinecap="round"*/}
//                         {/*                                                    strokeLinejoin="round"*/}
//                         {/*                                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"*/}
//                         {/*                                                />*/}
//                         {/*                                            </svg>*/}
//                         {/*                                        </div>*/}
//                         {/*                                    </div>*/}
//                         {/*                                    <label*/}
//                         {/*                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}*/}
//                         {/*                                        className="min-w-0 flex-1 text-gray-500"*/}
//                         {/*                                    >*/}
//                         {/*                                        {option.label}*/}
//                         {/*                                    </label>*/}
//                         {/*                                </div>*/}
//                         {/*                            ))}*/}
//                         {/*                        </div>*/}
//                         {/*                    </DisclosurePanel>*/}
//                         {/*                </Disclosure>*/}
//                         {/*            ))}*/}
//                         {/*      */}
//                         {/*      */}
//                         {/*      */}
//                                 </form>
//                             </DialogPanel>
//                         </div>
//                     </Dialog>
//
//                     <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                         <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
//                             <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
//
//                             <div className="flex items-center">
//                                 <Menu as="div" className="relative inline-block text-left">
//                                     <div>
//                                         <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
//                                             Sort
//                                             <ChevronDownIcon
//                                                 aria-hidden="true"
//                                                 className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
//                                             />
//                                         </MenuButton>
//                                     </div>
//
//                                     <MenuItems
//                                         transition
//                                         className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//                                     >
//                                         <div className="py-1">
//                                             {sortOptions.map((option) => (
//                                                 <MenuItem key={option.name}>
//                                                     <a
//                                                         href={option.href}
//                                                         className={classNames(
//                                                             option.current ? 'font-medium text-gray-900' : 'text-gray-500',
//                                                             'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
//                                                         )}
//                                                     >
//                                                         {option.name}
//                                                     </a>
//                                                 </MenuItem>
//                                             ))}
//                                         </div>
//                                     </MenuItems>
//                                 </Menu>
//
//                                 <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
//                                     <span className="sr-only">View grid</span>
//                                     <Squares2X2Icon aria-hidden="true" className="size-5" />
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setMobileFiltersOpen(true)}
//                                     className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
//                                 >
//                                     <span className="sr-only">Filters</span>
//                                     <FunnelIcon aria-hidden="true" className="size-5" />
//                                 </button>
//                             </div>
//                         </div>
//
//                         <section aria-labelledby="products-heading" className="pb-24 pt-6">
//                             <h2 id="products-heading" className="sr-only">
//                                 Products
//                             </h2>
//
//                             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
//                                 {/* Filters */}
//                                 {/*<form className="hidden lg:block">*/}
//                                 {/*    <h3 className="sr-only">Categories</h3>*/}
//                                 {/*    <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">*/}
//                                 {/*        {subCategories.map((category) => (*/}
//                                 {/*            <li key={category.name}>*/}
//                                 {/*                <a href={category.href}>{category.name}</a>*/}
//                                 {/*            </li>*/}
//                                 {/*        ))}*/}
//                                 {/*    </ul>*/}
//
//                                 {/*    {filters.map((section) => (*/}
//                                 {/*        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">*/}
//                                 {/*            <h3 className="-my-3 flow-root">*/}
//                                 {/*                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">*/}
//                                 {/*                    <span className="font-medium text-gray-900">{section.name}</span>*/}
//                                 {/*                    <span className="ml-6 flex items-center">*/}
//                                 {/*                 <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />*/}
//                                 {/*                 <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />*/}
//                                 {/*               </span>*/}
//                                 {/*                </DisclosureButton>*/}
//                                 {/*            </h3>*/}
//                                 {/*            <DisclosurePanel className="pt-6">*/}
//                                 {/*                <div className="space-y-4">*/}
//                                 {/*                    {section.options.map((option, optionIdx) => (*/}
//                                 {/*                        <div key={option.value} className="flex gap-3">*/}
//                                 {/*                            <div className="flex h-5 shrink-0 items-center">*/}
//                                 {/*                                <div className="group grid size-4 grid-cols-1">*/}
//                                 {/*                                    <input*/}
//                                 {/*                                        defaultValue={option.value}*/}
//                                 {/*                                        defaultChecked={option.checked}*/}
//                                 {/*                                        id={`filter-${section.id}-${optionIdx}`}*/}
//                                 {/*                                        name={`${section.id}[]`}*/}
//                                 {/*                                        type="checkbox"*/}
//                                 {/*                                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"*/}
//                                 {/*                                    />*/}
//                                 {/*                                    <svg*/}
//                                 {/*                                        fill="none"*/}
//                                 {/*                                        viewBox="0 0 14 14"*/}
//                                 {/*                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"*/}
//                                 {/*                                    >*/}
//                                 {/*                                        <path*/}
//                                 {/*                                            d="M3 8L6 11L11 3.5"*/}
//                                 {/*                                            strokeWidth={2}*/}
//                                 {/*                                            strokeLinecap="round"*/}
//                                 {/*                                            strokeLinejoin="round"*/}
//                                 {/*                                            className="opacity-0 group-has-[:checked]:opacity-100"*/}
//                                 {/*                                        />*/}
//                                 {/*                                        <path*/}
//                                 {/*                                            d="M3 7H11"*/}
//                                 {/*                                            strokeWidth={2}*/}
//                                 {/*                                            strokeLinecap="round"*/}
//                                 {/*                                            strokeLinejoin="round"*/}
//                                 {/*                                            className="opacity-0 group-has-[:indeterminate]:opacity-100"*/}
//                                 {/*                                        />*/}
//                                 {/*                                    </svg>*/}
//                                 {/*                                </div>*/}
//                                 {/*                            </div>*/}
//                                 {/*                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">*/}
//                                 {/*                                {option.label}*/}
//                                 {/*                            </label>*/}
//                                 {/*                        </div>*/}
//                                 {/*                    ))}*/}
//                                 {/*                </div>*/}
//                                 {/*            </DisclosurePanel>*/}
//                                 {/*        </Disclosure>*/}
//                                 {/*    ))}*/}
//                                 {/*</form>*/}
//
//                                 <FiltersSideBar aggregations={aggregations} />
//
//                                 {/* Product grid */}
//                                 {/*///////thes partie for the products*/}
//                                 <div className="lg:col-span-3">
//
//                                     <div className="flex-1 overflow-y-auto p-4">
//                                         <h2 className="text-lg font-bold">Products Categories</h2>
//                                         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//                                             {
//                                                 useProducts?.length === 0
//                                                     ?
//                                                     items?.map((item) => (
//                                                         <ProductCard item={item} key={item.uid}/>
//                                                     ))
//                                                     : useProducts?.map((item) => (
//                                                         <ProductCard item={item} key={item.uid}/>
//                                                     ))
//                                             }
//                                         </div>
//                                         <Pagination/>
//                                     </div>
//                                 </div>
//
//
//
//                             </div>
//
//
//                         </section>
//
//
//                     </main>
//                 </div>
//             </div>
//         </>
//
//     );
// };
//




import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Categories=({products})=> {
console.log(products)
    const router = useRouter();
    const dispatch=useDispatch()
//
//     const { data } = useSWR(`${BASEURL}/api/productsCategory/productsCategories/?uid=${router.query.sulg}`, fetcher);
// console.log(data)

    //console.log(products);
    // useEffect(() => {
    //     dispatch(cartProductsCategoriese(products));
    //
    // },[products])


    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)





    const {uid} = router.query;
    console.log(uid)
    console.log(router.query.sulg)
    const {items,aggregations,page_info,total_count}:Products=products.products

    console.log(aggregations)

    console.log(items)

    // Example array for demonstration
    const [isFlterOpen, setIsFilerOpen] = React.useState<boolean>(true);
    const toggleFilter = () => {
        setIsFilerOpen((prevState) => !prevState);
    };
    // Log the dynamic route parameter if needed
    console.log(router);


    const useProducts=useSelector((state:any)=>state?.product?.productsIsFiltered)
    console.log(useProducts)
    const productsPagination=useSelector((state:any)=>state?.product?.pagination)
    console.log( productsPagination?.data?.data?.products?.items)
    // const {items,aggregations}:Products=useProducts.products
    const productList = (() => {
        if (Object.keys(useProducts || {}).length === 0 && Object.keys(productsPagination || {}).length === 0) {
            return items;
        }

        if (productsPagination) {
            return productsPagination?.data?.data?.products?.items || [];
        }
        if (useProducts) {
            return useProducts || [];
        }

        return [];
    })();


    //
    // const aggregatorData = Object.keys(useProducts).length === 0
    //     ? aggregations
    //     : useProducts?.products?.aggregations
    //
    // const limitedAggregations = Array.isArray(aggregatorData)
    //     ? aggregatorData.slice(0, productList?.length || 0)
    //     : []

    // console.log(limitedAggregations)


    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-1"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6"/>
                                </button>
                            </div>

                            {/* Filters */}
                            <FilterSideBarMobile aggregations={aggregations} />


                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto  px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        {/*<h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>*/}

                        <div className="flex items-center">
                            {/*<Menu as="div" className="relative inline-block text-left">*/}
                            {/*    <div>*/}
                            {/*        <MenuButton*/}
                            {/*            className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">*/}
                            {/*            Sort*/}
                            {/*            <ChevronDownIcon*/}
                            {/*                aria-hidden="true"*/}
                            {/*                className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"*/}
                            {/*            />*/}
                            {/*        </MenuButton>*/}
                            {/*    </div>*/}

                            {/*    <MenuItems*/}
                            {/*        transition*/}
                            {/*        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"*/}
                            {/*    >*/}
                            {/*        /!*<div className="py-1">*!/*/}
                            {/*        /!*    {sortOptions.map((option) => (*!/*/}
                            {/*        /!*        <MenuItem key={option.name}>*!/*/}
                            {/*        /!*            <a*!/*/}
                            {/*        /!*                href={option.href}*!/*/}
                            {/*        /!*                className={classNames(*!/*/}
                            {/*        /!*                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',*!/*/}
                            {/*        /!*                    'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',*!/*/}
                            {/*        /!*                )}*!/*/}
                            {/*        /!*            >*!/*/}
                            {/*        /!*                {option.name}*!/*/}
                            {/*        /!*            </a>*!/*/}
                            {/*        /!*        </MenuItem>*!/*/}
                            {/*        /!*    ))}*!/*/}
                            {/*        /!*</div>*!/*/}
                            {/*    </MenuItems>*/}
                            {/*</Menu>*/}

                            {/*<button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">*/}
                            {/*    <span className="sr-only">View grid</span>*/}
                            {/*    <Squares2X2Icon aria-hidden="true" className="size-5"/>*/}
                            {/*</button>*/}
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="size-5"/>
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

                            <FiltersSideBar aggregations={aggregations} filters={filters}/>
                            {/* Product grid */}


                            <div className="lg:col-span-3">

                                <div className="flex-1 overflow-y-auto p-4">
                                    <h2 className="text-lg font-bold">Products Categories</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {
                                            useProducts?.length === 0
                                                ?
                                                items?.map((item) => (
                                                    <ProductCard item={item} key={item.uid}/>
                                                ))
                                                : useProducts?.map((item) => (
                                                    <ProductCard item={item} key={item.uid}/>
                                                ))
                                        }
                                        {/*{*/}
                                        {/*    productList?.map((item) => (*/}
                                        {/*        <ProductCard item={item} key={item.uid}/>*/}
                                        {/*    ))*/}
                                        {/*}*/}
                                    </div>
                                    {/*<Pagination page_info={page_info} total_count={total_count} />*/}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>



    );
}








export const getServerSideProps = async (context) => {
    const {uid} = context.query;
    const {req, res} = context;
    const {cookies: cartId} = parse(req.headers.cookie || "");
    console.log(cartId)
    console.log("params categoru is her", uid)
    const {data: {data: products}} = await fetchHomePage.ProductsByCategory(uid)
    console.log(products)
    return {
        props: {products}
    }
}

 export default Categories;

