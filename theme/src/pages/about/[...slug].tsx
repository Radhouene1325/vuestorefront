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
const Index = ({items}) => {
    const ref=useRef(null)
    const router=useRouter()
    console.log(router.query.slug)
    console.log(items)

    // let {data: {data: {products:items}}} = res;
    console.log(items)
    console.log(ref.current)
    const counterValue = useSelector((state: RootState) => state.user.products);
    console.log(counterValue)
    return (

        <main className="py-10 px-4 sm:px-6 lg:px-12">
            <div className="max-w-screen-xl mx-auto">
                <p>products details </p>
                <div className="flex flex-col md:flex-row gap-1">
                    <ProductesDetails items={items}/>
                    <InfoProductesDetaisl ref={ref} items={items} />

                </div>
            </div>
            <Review/>
            <Productesrelited/>
            <NewsletterBox/>
        </main>


);
};

export const getServerSideProps = async (context) => {
    const {sku} = context.query;
    console.log(sku)
    const {data: {data: {products: items}}} = await fetchHomePage.ProductsDetails(sku)

    console.log("Route parameter (slug):", sku);
    return {
        props: {items}
    }
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