import React from 'react'
import Layout from "@/components/accountuser/layout";
import Order from "@/components/accountuser/orderUser/order";
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {customerOrdersQuery} from "../../../../customQueryMagento/queryProductsWichList";
import Link from "next/link";

const Orderhistories = ({customQueryResult}: { customQueryResult: { data?: { customerOrders?: any } } }) => {

    console.log(customQueryResult?.data?.customerOrders)
    return (

        <main>
            <Layout>
                {!customQueryResult&&<div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-gray-700">No orders found.</h2>
                    <p className="mt-4 text-gray-500">
                        It looks like you haven't placed any orders yet. Start shopping now!
                    </p>
                    <Link href="/">
                        <p className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                            Shop Now
                        </p>
                    </Link>
                </div>}
                <Order infoOrder={customQueryResult?.data?.customerOrders}/>
            </Layout>
        </main>
    )
};

export default Orderhistories


export const getServerSideProps: GetServerSideProps = (async (ctx: GetServerSidePropsContext) => {
    const {req, res} = ctx;
    // Fetch data from external API

    let token = await getCookie('auth-token', {req, res})

    const customQueryResult = await sdk.magento.customQuery({query: customerOrdersQuery}, {

        customHeaders: {
            Authorization: `Bearer ${token || ''}`,

        },


    });
    console.log('CCCCCCCCCCCCCCCCCCCCCSSSSScccccccSSSSSSSSSSSSSSSSSSSSSSCCCCCCCSSSSCCfffffffffffffffffffffffffffCCCCCCCCCCCCCdcasdccccccaCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', customQueryResult?.data?.customerOrders)

    // Pass data to the page via props
    return {props: {customQueryResult}}
});