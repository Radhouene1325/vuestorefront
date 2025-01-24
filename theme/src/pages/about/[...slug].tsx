import React, {ReactElement, useRef} from 'react'
import Layout from "@/components/layout/layout";
import {useRouter} from "next/router";
import fetchHomePage from '@/utils/fetchHomePage';
import ProductesDetails from "@/components/productesDetails/productsDetails";
import InfoProductesDetaisl from "@/components/productesDetails/infoProductesDetaisl";
import Review from "@/components/productesDetails/PreviewProducts";
import NewsletterBox from "@/components/productesDetails/Newsletterbox";
import Productesrelited from "@/components/productesDetails/productesrelited";
import {RootState, wrapper} from "@/store";
import {GetServerSidePropsContext} from "next";
import {incrementByAmount} from "@/store/slices/counterSlice";
import {parse, serialize} from "cookie";
import {useSelector} from "react-redux";
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import {sdk} from "../../../sdk.config";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Index = ({items, products}: { items: any, products?: any }) => {
    console.log(products)
    const ref = useRef(null)
    const router = useRouter()
    console.log(router.query)
    console.log(items)
    // console.log(x)

    // let {data: {data: {products:items}}} = res;
    console.log(items.items)
    console.log(ref.current)
    const counterValue = useSelector((state: RootState) => state.user?.products);
    console.log(counterValue)
    // const [selectedColor, setSelectedColor] = useState(product.colors[0])
    // const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    return (
        // <div className="bg-white">
        //     <div className="pt-6">
        //         {/*<nav aria-label="Breadcrumb">*/}
        //         {/*    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">*/}
        //         {/*        {product.breadcrumbs.map((breadcrumb) => (*/}
        //         {/*            <li key={breadcrumb.id}>*/}
        //         {/*                <div className="flex items-center">*/}
        //         {/*                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">*/}
        //         {/*                        {breadcrumb.name}*/}
        //         {/*                    </a>*/}
        //         {/*                    <svg*/}
        //         {/*                        fill="currentColor"*/}
        //         {/*                        width={16}*/}
        //         {/*                        height={20}*/}
        //         {/*                        viewBox="0 0 16 20"*/}
        //         {/*                        aria-hidden="true"*/}
        //         {/*                        className="h-5 w-4 text-gray-300"*/}
        //         {/*                    >*/}
        //         {/*                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />*/}
        //         {/*                    </svg>*/}
        //         {/*                </div>*/}
        //         {/*            </li>*/}
        //         {/*        ))}*/}
        //         {/*        <li className="text-sm">*/}
        //         {/*            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">*/}
        //         {/*                {product.name}*/}
        //         {/*            </a>*/}
        //         {/*        </li>*/}
        //         {/*    </ol>*/}
        //         {/*</nav>*/}
        //
        //         {/* Image gallery */}
        //         <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        //
        //             <img
        //                 // alt={product.images[0].alt}
        //                 src={items?.items[0]?.media_gallery[0]?.url?items?.items[0]?.media_gallery[0]?.url:null}
        //                 className="hidden size-full rounded-lg object-cover lg:block"
        //             />
        //             <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        //                 <img
        //                     // alt={product.images[1].alt}
        //                     src={items?.items[0]?.media_gallery[1]?.url?items?.items[0]?.media_gallery[1]?.url:null}
        //                     className="aspect-[3/2] w-full rounded-lg object-cover"
        //                 />
        //                 <img
        //                     // alt={product.images[2].alt}
        //                     src={items?.items[0]?.media_gallery[2]?.url?items?.items[0]?.media_gallery[2]?.url:null}
        //                     className="aspect-[3/2] w-full rounded-lg object-cover"
        //                 />
        //             </div>
        //
        //
        //             <img
        //                 // alt={product.images[3].alt}
        //                 src={items?.items[0]?.thumbnail?.url}
        //                 className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-auto"
        //             />
        //         </div>
        //
        //         {/* Product info */}
        //         <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        //             <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        //                 <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{items?.items[0].name}</h1>
        //             </div>
        //
        //             {/* Options */}
        //             <div className="mt-4 lg:row-span-3 lg:mt-0">
        //                 <h2 className="sr-only">Product information</h2>
        //                 <p className="text-3xl tracking-tight text-gray-900">{items.items[0].price_range.minimum_price.final_price.value}$</p>
        //
        //                 {/* Reviews */}
        //                 <div className="mt-6">
        //                     <h3 className="sr-only">Reviews</h3>
        //                     <div className="flex items-center">
        //                         <div className="flex items-center">
        //                             {items.items[0].reviews.items.map((rating: React.Key | null | undefined) => (
        //                                 <StarIcon
        //                                     key={rating}
        //                                     aria-hidden="true"
        //                                     className={classNames(
        //                                         rating ? 'text-gray-900' : 'text-gray-200',
        //                                         'size-5 shrink-0',
        //                                     )}
        //                                 />
        //                             ))}
        //                         </div>
        //                         {/*<p className="sr-only">{reviews.average} out of 5 stars</p>*/}
        //                         <a  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
        //                             {items.items[0].review_count} reviews
        //                         </a>
        //                     </div>
        //                 </div>
        //
        //                 <form className="mt-10">
        //                     {/* Colors */}
        //
        //                     {/* Sizes */}
        //                     <div className="mt-10">
        //                         <div className="flex items-center justify-between">
        //                             <h3 className="text-sm font-medium text-gray-900">Size</h3>
        //                             <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
        //                                 Size guide
        //                             </a>
        //                         </div>
        //
        //                         <fieldset aria-label="Choose a size" className="mt-4">
        //                             <InfoProductesDetaisl ref={ref} items={items} />
        //                         </fieldset>
        //                     </div>
        //
        //
        //                 </form>
        //             </div>
        //
        //             <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
        //                 {/* Description and details */}
        //                 <div>
        //                     <h3 className="sr-only">Description</h3>
        //
        //                     <div className="space-y-6">
        //                         <div className="text-base text-gray-900" dangerouslySetInnerHTML={{__html:items?.items[0]?.description?.html }}  ></div>
        //                     </div>
        //                 </div>
        //
        //                 {/*<div className="mt-10">*/}
        //                 {/*    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>*/}
        //
        //                 {/*    <div className="mt-4">*/}
        //                 {/*        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">*/}
        //                 {/*            {product.highlights.map((highlight) => (*/}
        //                 {/*                <li key={highlight} className="text-gray-400">*/}
        //                 {/*                    <span className="text-gray-600">{highlight}</span>*/}
        //                 {/*                </li>*/}
        //                 {/*            ))}*/}
        //                 {/*        </ul>*/}
        //                 {/*    </div>*/}
        //                 {/*</div>*/}
        //
        //                 <div className="mt-10">
        //                     <h2 className="text-sm font-medium text-gray-900">Details</h2>
        //
        //                     {/*<div className="mt-4 space-y-6">*/}
        //                     {/*    <p className="text-sm text-gray-600">{product.details}</p>*/}
        //                     {/*</div>*/}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>


        <main className="py-10 px-4 sm:px-6 lg:px-12 pt-60">
            <div className="max-w-screen-xl mx-auto">

                <div className="flex flex-col md:flex-row gap-1">
                    <ProductesDetails items={items} products={products}/>
                    <InfoProductesDetaisl ref={ref} items={items}/>

                </div>

            </div>
            <Review/>
            <Productesrelited products={products}/>
            <NewsletterBox/>
        </main>


    );
};

export const getServerSideProps = async (context) => {
    const data = context.query;
    console.log('wwwwwwwwwwwwwwwwwww', data)
    const {sku} = context.query;
console.log(sku)
    console.log("Server hello khalfa");
    const {data: {data: {products: items}}} = await fetchHomePage.ProductsDetails(data)

    console.log("Route parameter (slug):", data);
    const {data: {products:products}} = await sdk.magento.relatedProducts({

        pageSize: 20,

        currentPage: 1,

        filter: {

            sku: {

                eq: sku?sku:null,
            }

        }

    });
console.log('detaisddddddddddddddddddddddddddd',     products)

    // const upsellProducts=await fetchHomePage.upsellProducts(sku)

    return {
        props: {
            items,
            products,

        },

    };
}


    // export const getServerSideProps = wrapper.getServerSideProps(
    //     (store) =>
    //         async (context:GetServerSidePropsContext) => {
    //         const {req} = context;
    //             const {cookies:cartId} = parse(req.headers.cookie || "");
    //             console.log(cartId)
    //             // 1) Dispatch an action on the server
    //             const { sku } = context.query;
    //             console.log(sku)
    //             console.log("Server after dispatch is okysxaxxaxxasxs:", store.getState());
    //             const res=await fetchHomePage.ProductsDetails(sku)
    //
    //             console.log("Route parameter (slug):", sku);
    //             return{
    //                 props:{res }
    //             }
    //         }
    // );





// Index.getLayout = function getLayout(page: ReactElement) {
//     return <Layout>{page}</Layout>;
// };

export default Index