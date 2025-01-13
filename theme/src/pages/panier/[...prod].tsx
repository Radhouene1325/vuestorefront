import React, {useEffect, useMemo} from 'react'
import Pannier from "@/components/panier/panier";
import {GetServerSideProps} from "next";
import {AppDispatch, RootState, wrapper} from "@/store";
import fetchHomePage from "@/utils/fetchHomePage";
import {parse} from "cookie";
import Chekout from "@/components/chekout/chekout";
import {useDispatch, useSelector} from "react-redux";
import {cartProducts} from "@/store/slices/productsSlice";
import {useAppSelector} from "@/store/lib/hooks";
export interface Cart{
    items:any,
    prices:Price,
    total_quantity:number,
    is_virtual:boolean,
    id:string,
    email:string,
    billing_address:string,
    applied_coupon:number,
}
export interface Price{
    applied_taxes:number,
    discounts:number,
    grand_total:number,
    subtotal_excluding_tax:number,
    subtotal_including_tax:number,
    subtotal_with_discount_excluding_tax:number,
}

export interface Availablepayment {
    code:string,
    title:string,
    __typename:string,
}

const Prod = ({cart}) => {

    // console.log(customerCart)
    console.log(cart)
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(cartProducts(cart));

    }, []);


// const {available_payment_methods}=customerCart.customerCart
//     console.log(available_payment_methods)


    //  console.log(cart)
    // const {items, prices} = cart
    // console.log(prices)
    // const {
    //     applied_taxes,
    //     discounts,
    //     grand_total,
    //     subtotal_excluding_tax,
    //     subtotal_including_tax,
    //     subtotal_with_discount_excluding_tax
    // }: Price = prices
    // const {total_quantity, is_virtual, id, email, billing_address, applied_coupon}: Cart = cart

    let index = useSelector((state: RootState) => state.product?.cartProducts);
    console.log(index)


    return (
        <main>

            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

                <div className="flex flex-col md:flex-row gap-4">

                    <div className="flex-1 min-w-[300px]">
                        {index?.items?.map((item: any, index: number) => {
                            return <Pannier item={item} key={index}/>

                        })}
                    </div>


                    <div className="flex-shrink-0 w-full md:w-[400px]">
                        <Chekout
                            // available_payment_methods={available_payment_methods}
                            prices={index?.prices}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Prod;


// export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps((store:{
//     dispatch:AppDispatch,
//     getState:()=>RootState
// })=> async (context)=>{
// const {req,res} = context;
//     const cookies = parse(req.headers.cookie || '');
//     const cartId = cookies.cartId;
//
//
//
//     const {data: {data: {cart: cart}}} = await fetchHomePage.cartProducts(cartId<string>);
//
//     return {
//         props:{
//             cart:cart,
//         }
//     }
// })

export const getServerSideProps: GetServerSideProps = async (context) => {

    const {req, res} = context;
    const cookies = parse(req.headers.cookie || '');
    const cartId = cookies['cart-id'] as string;
    let token = cookies['auth-token'] as string;


    const {data: {data: {cart: cart}}} = await fetchHomePage.cartProducts(cartId,token);

    // const {data:{data:customerCart}}=await fetchHomePage.getAvailableCustomerPaymentMethods()
// console.log("dcdcdcdssqswqswcdsc",  customerCart)
    return {
        props: {
            cart: cart,
            // customerCart:customerCart,
        }
    }
};