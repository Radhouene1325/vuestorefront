import React from 'react'
import {useRouter} from 'next/router'
import {serialize} from "cookie";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {AppDispatch, RootState, wrapper} from "@/store";
const PaymentSuccess = () => {
    const router=useRouter()
console.log(router.query)
    return (
       <div>

           {router.query?.paymentSuccess}
       </div>
    )
}
export default PaymentSuccess


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store: {
    dispatch: AppDispatch;
    getState: () => RootState
}) => async (context: GetServerSidePropsContext) => {
    let req: any, res: any;
    ({req, res} = context);

console.log( 'sssssssssssssssssssssssssssssssssssssss', store.getState())
    return {
        props: {data: 'paymentSuccess'},
    };
});

//
// export const getServerSideProps = (async (context) => {
//
//     let req: any, res: any;
//     ({req, res} = context);
//     let {paymentSuccess}=req.query
//     console.log('dsssssssssssssssssssssssssssssssss', paymentSuccess)
//
//     res.setHeader('Set-Cookie',
//         serialize('cart-id', '', {
//             maxAge: 0,
//             path: '/',
//             httpOnly: true,
//             sameSite: 'strict',
//             secure: process.env.NODE_ENV === 'production',
//         })
//     );
//
//
//     // Fetch data from external API
//     return {
//         props: {data:'paymentSuccess'},
//     }
//
//
// });