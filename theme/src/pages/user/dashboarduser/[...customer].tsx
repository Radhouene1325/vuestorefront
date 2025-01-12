import React from 'react'
import Layout from "@/components/accountuser/layout";
import {NextPageWithLayout} from "@/pages/_app";
import Adresses from "@/components/accountuser/adreseesuser/adresses";
import {AppDispatch, RootState, wrapper} from "@/store";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {sdk} from "../../../../sdk.config";

const Customer = ({customer}) => {

    console.log('hekdsosdksdcjhdc', customer)
    return (

        <Layout>

            <Adresses/>

        </Layout>
    );


};

// Customer.getLayout = function getLayout(page) {
//     return (
//         <Layout>
//             {page}
//         </Layout>
//     )
// }



// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store: {
//     dispatch: AppDispatch;
//     getState: () => RootState
// }) => async (context: GetServerSidePropsContext) => {
//
//
//     let {req, res} = context;
//     let token =await getCookie('auth-token', {req, res})
//     console.log('tokenxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', token)
//     const customer = await sdk.magento.customer({
//         customHeaders: {
//             Authorization: `Bearer ${token || ''}`,
//         }
//     });
//     console.log('helllo admin im her', customer)
//
//
//     return {
//         props: {
//             customer: customer
//         }
//     };
// });
//

export default Customer;
