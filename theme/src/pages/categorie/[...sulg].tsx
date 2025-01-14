// import React from 'react'
// import {useRouter} from "next/router";
// import Breadcrumbse from "@/components/categories/breadcrumbs/Breadcrumbs";
// import FiltersSideBar from "@/components/categories/filterSideBar/FilterSideBar";
// import ProductCard from "@/components/categories/productsCart/ProductsCart";
// import {Pagination} from "@/components/categories/pagination/Pagination";
//
// const categories = () => {
//     const array=[1,2,3,4,5,6,7,8,9,10]
//     const route=useRouter()
//     console.log(route.query.sulg)
//     return (
//         <main>
//             <div className="mx-12 my-8">
//                 <Breadcrumbse/>
//
//                 <h1 className="text-xl font-bold my-2">Broser Products Categories</h1>
//                 <div className="flex gap-6">
//
//                     <FiltersSideBar/>
//
//                     <div className="flex flex-col gap-8">
//
//                         <h2 className="text-larg font-bold">Products categories</h2>
//                         <div className="flex flex-wrap gap-2">
//                             {array.map((item, index) => {
//                                 return <ProductCard key={index}/>
//                             })}
//                         </div>
//                         <Pagination/>
//                     </div>
//                 </div>
//             </div>
//
//         </main>
//     );
// };
// export default categories;

import React from 'react'
import { useRouter } from "next/router";
import Breadcrumbse from "@/components/categories/breadcrumbs/Breadcrumbs";
import FiltersSideBar from "@/components/categories/filterSideBar/FilterSideBar";
import ProductCard from "@/components/categories/productsCart/ProductsCart";
import { Pagination } from "@/components/categories/pagination/Pagination";
import fetchHomePage from "@/utils/fetchHomePage";
import useSWR from "swr";
import {BASEURL} from "@/BASEURL/URL";
import {parse} from "cookie";
export interface Options{
    label:string,
    count:number,
    value:string,
    __typename:string,


}
export interface Aggregations{
    attribute_code:string,
    label:string,
    options:Array<Options>,
    type:string,
    __typename:string,
}

export interface Url_rewrite{
   url:string,
    __typename:string,}

export interface Variants{
    product: {
        uid: string,
        name: string,
        sku: string,
        price: number,
        thumbnail: { url: string, label: string, __typename: string, },
        price_range: {
            minimum_price: {
                regular_price: {
                    value: number,
                    currency: string
                    __typename: string,
                },
                final_price: {
                    value: number,
                    currency: string
                }

                __typename: string,
            },

        },


    };
}
export interface ProductType{
    uid:string,
    name:string,
    sku:string,
    price:number,
    thumbnail: {
        url:string,
        label:string,
        __typename:string,
    },

    rating_summary:number,
    review_count:number,
    url_rewrites:Array<Url_rewrite>,
    variants:Array<Variants>,
    url_key:string,
    url_suffix:string,
}
export interface Products{
    items:Array<ProductType>,
    aggregations:Array<Aggregations>,
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Categories = ({products}:{products:Products}) => {
    const router = useRouter();

//
//     const { data } = useSWR(`${BASEURL}/api/productsCategory/productsCategories/?uid=${router.query.sulg}`, fetcher);
// console.log(data)

     console.log(products)
    const {uid} = router.query;
    console.log(uid)
    console.log(router.query.sulg)
    const {items,aggregations}:Products=products.products
    console.log(items)

    // Example array for demonstration
const [isFlterOpen, setIsFilerOpen] = React.useState<boolean>(true);
    const toggleFilter = () => {
        setIsFilerOpen((prevState) => !prevState);
    };
    // Log the dynamic route parameter if needed
    console.log(router);

    return (
        <main className="py-6 px-4 sm:px-6 lg:px-8">

            <div className="max-w-screen-xl mx-auto">

                {/* Breadcrumbs */}
               {/* <Breadcrumbse path={router.asPath}/>*/}

                {/* Page title */}
                <h1 className="text-xl font-bold my-4">Browser Products Categories</h1>


                <button
                    onClick={toggleFilter}
                    className="md:hidden bg-gray-200 text-gray-800 px-4 py-2 rounded mb-4"
                >
                    {isFlterOpen ? 'Close Filter' : 'Open Filter'}
                </button>
                {/* Main content layout:
            - On small screens: vertical stacking (flex-col)
            - On medium+ screens: side-by-side layout (flex-row) */}
                <div className="flex flex-col md:flex-row gap-3">

                    {/* Sidebar (filters):
              - Takes full width on mobile
              - Fixed width (1/4) on medium and larger */}
                    <div className="w-full md:w-1/4">
                        {isFlterOpen && <FiltersSideBar aggregations={aggregations}/>}
                    </div>

                    {/* Products section:
              - Takes full width on mobile
              - Expands to 3/4 on medium screens */}
                    <div className="w-full md:w-3/4 flex flex-col gap-2">
                        <h2 className="text-lg font-bold">Products Categories</h2>

                        {/* Responsive grid for product cards:
                - 2 columns on small screens
                - 3 columns on medium
                - 4 columns on large */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {items?.map((item) => (
                                <ProductCard item={item}/>
                            ))}
                        </div>

                        {/* Pagination component at the bottom */}
                        <Pagination/>
                    </div>
                </div>
            </div>
        </main>
    );
};

// export async function getServerSideProps(context: any) {
//     const {uid} = context.query;
//     const{req,res}=context;
//     const {cookies:cartId} = parse(req.headers.cookie || "");
// console.log(cartId)
//     console.log("params categoru is her",uid)
//     const {data:{data:products}}=await fetchHomePage.ProductsByCategory(uid)
//     console.log(products)
//     return{
//         props: {products  }
//     }
// }




export const getServerSideProps = async (context) => {
    const {uid} = context.query;
    const{req,res}=context;
    const {cookies:cartId} = parse(req.headers.cookie || "");
    console.log(cartId)
    console.log("params categoru is her",uid)
    const {data:{data:products}}=await fetchHomePage.ProductsByCategory(uid)
    console.log(products)
    return{
        props: {products  }
    }
}

export default Categories;

