import {useRouter} from 'next/router'
import Loginuser from "@/components/authentication/login";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {AppDispatch, RootState, wrapper} from "@/store";
import {authntication, resetState} from "@/store/slices/userSlice";
import {getCookie} from "cookies-next";
import {useDispatch} from "react-redux";
import authenticationuser from "@/utils/authentication";
import {BASEURL} from "@/BASEURL/URL";

// export async function getServerSideProps({ req, res }) {
// const token = await getCookie('auth-token', { req, res })
// const cartId = await getCookie('cart-id', { req, res })
//     console.log('Token:', token);
// console.log('Cart ID:', cartId);
//     return {
//         props: {token?token:"",cartId},
//     }
// }
// export const getServerSideProps = (async (context) => {
//     const {req,res}=context
//
//
//     // console.log('sleeeeemmmeemmmmmmmmmmmmmmmmmm',req)
//
//     // Fetch data from external API
//     const token = await getCookie('auth-token', {req, res})
//     const cartId = await getCookie('cart-id', {req, res})
//     console.log('Token:', token);
//     console.log('Cart ID:', cartId);
//
//     console.log('sleeeeemmmeemmmmmmmmmmmmmmmmmm')
//     // let index = await authenticationuser.authentication(`${BASEURL}/api/authentication/authentication`, { arg: yourArgument });
//     // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' ,index)
//
//     return {
//         props: {token:token?token:'hwllo', cartId:cartId?cartId:'hwllo'},
//     }
// });







export default function Login({cartId}) {

    console.log(cartId)
    const router = useRouter()
    console.log(router.query)
    const dispatch = useDispatch();
    // dispatch(authntication(false));
    // if(!token &&  !cartId) return (
    //     dispatch(resetState())
    // )
    // dispatch(resetState());

    return (

        <main>
            <div className="py-8 px-4 sm:px-6 lg:px-8  w-4/5 m-auto">
                <Loginuser/>
            </div>
            {/*<div>{router.query?.login}</div>*/}
        </main>


    );
};






//
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store: {
    dispatch: AppDispatch,
    getState: () => RootState
}) =>
    async (context: GetServerSidePropsContext) => {
        const {req, res} = context;

        // console.log(  'sacdsssssssssssssssssssssssssssssssssssssss', data)
        let token= await getCookie('auth-token',{req, res})
        let cartId= await getCookie('cart-id',{req, res})

console.log(  'sacdsssssssssssssssssssssssssssssssssssssss', token)
        console.log(  'sacdsssssssssssssssssssssssssssssssssssssss', cartId)
        try {





        }catch (error){
             throw(error)
        }

        return {
            props:
                {
                    // item: items,
                    cartId:cartId
                    // quantity:total_quantity?.total_quantity,
                },


        };

    });


// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
//     (store: { dispatch: AppDispatch; getState: () => RootState }) =>
//         async (context: GetServerSidePropsContext) => {
//             const { req, res } = context;
//
//             const token = await getCookie('auth-token', { req, res });
//             const cartId = await getCookie('cart-id', { req, res });
//
//             console.log('Token:', token);
//             console.log('Cart ID:', cartId);
//
//             // Check if token or cartId is missing, reset the store
//             // if (!token || !cartId) {
//             //     store.dispatch(resetState());
//             // }
//
//             return {
//                 props: {
//                     products: 'hello',
//                 },
//             };
//         }
// );


// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
//     (store: { dispatch: AppDispatch; getState: () => RootState }) =>
//         async (context: GetServerSidePropsContext) => {
//             const { req, res } = context;
//
//             const token = await getCookie('auth-token', { req, res });
//             const cartId = await getCookie('cart-id', { req, res });
//
//             console.log('Token:', token || 'Token is undefined');
//             console.log('Cart ID:', cartId || 'Cart ID is undefined');
//
//             if (token===undefined && cartId===undefined) {
//                 console.log('Valid token and cart ID, no need to purge store');
//             } else {
//                 console.log('Purging store due to missing token or cart ID');
//                 store.dispatch(resetState());
//             }
//
//             return {
//                 props: {
//                     products: 'hello',
//                 },
//             };
//         }
// );
