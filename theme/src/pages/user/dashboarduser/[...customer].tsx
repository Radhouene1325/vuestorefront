import React from 'react'
import Layout from "@/components/accountuser/layout";
import {NextPageWithLayout} from "@/pages/_app";
import Adresses from "@/components/accountuser/adreseesuser/adresses";
import {AppDispatch, RootState, wrapper} from "@/store";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {sdk} from "../../../../sdk.config";
import {getCookie} from "cookies-next";
import {adressescustomer} from "@/store/slices/counterSlice";
import {useDispatch} from "react-redux";
import fetchHomePage from "@/utils/fetchHomePage";
import {useStore} from "react-redux";
const Customer = ({addresses}) => {
const dispatch=useDispatch()
    console.log('the addresses', addresses)
    dispatch(adressescustomer(addresses))

    const store = useStore()?.__persistor?.getState()
    ;
console.log('the store', store)

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
//     const {data: {customer: addresses}} = await sdk.magento.getCustomerAddresses({
//         customHeaders: {
//             Authorization: `Bearer ${token || ''}`,
//         }
//     });
//     console.log('the addresses', addresses)
//     store.dispatch(adressescustomer(addresses))
//
//
//     return {
//         props: {
//             customer: 'hello'
//         }
//     };
// });






export const getServerSideProps = async (context) => {
    let {req, res} = context;
    let token =await getCookie('auth-token', {req, res})
    const {data: {customer: addresses}} = await sdk.magento.getCustomerAddresses({
        customHeaders: {
            Authorization: `Bearer ${token || ''}`,
        }
    });
    console.log('the addresses', addresses)
    // store.dispatch(adressescustomer(addresses))


    return {
        props: {
            addresses: addresses
        }
    };
}


export default Customer;
