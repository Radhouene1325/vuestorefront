"use cache"

import {ReactElement, useEffect, useMemo,useState} from 'react'
// import NestedLayout from '../components/nested-layout'
import type { NextPageWithLayout } from './_app'
import HomeGlobal from "@/components";
import Layout from "@/components/layout/layout";
import Index from "@/pages/about/[slug]";
import {ThemeProvider} from "@/context/GlobalContext";
import fetchHomePage from "@/utils/fetchHomePage";
import {useRouter} from "next/router";
import {SfButton} from "@storefront-ui/react";
import { serialize } from "cookie";
import { parse } from "cookie";
import {useDispatch, useSelector, useStore} from "react-redux";
import {AppDispatch, RootState, wrapper} from "@/store";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {authntication, quantityCart} from "@/store/slices/userSlice";
import {setHeaderCategories} from "@/store/slices/categorieSlice";
import {sdk} from "../../sdk.config";

import {queryIdRegion, queryProductsAndIdwichList} from "../../customQueryMagento/queryProductsWichList";
import {wichListProducts, wichListProductsLength} from '@/store/slices/wichlistSlice';





const Page: NextPageWithLayout = () => {

    return (
        <>
            <HomeGlobal/>
        </>
    );
};

Page.getLayout = function getLayout(page: ReactElement, pageProps: any) {

    const { products} = pageProps



    return (

        <ThemeProvider
            // items={item}
            products={products}>
            <Layout>
                {page}
            </Layout>
        </ThemeProvider>
    );
}



////thes shood be using /////

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store: {
    dispatch: AppDispatch;
    getState: () => RootState
}) => async (context: GetServerSidePropsContext) => {
    const {req, res} = context;


    //console.log(req.headers)


    const cookies = parse(req.headers.cookie || "");
    // console.log("Cart ID from Cookie:", cookies['auth-token']);
    const cartId = cookies['cart-id'] as string;
    let token = cookies['auth-token'] as string;


    const {data: {data: {categories: items}}, error, loading} = await fetchHomePage.HomePage()


    await store.dispatch(setHeaderCategories(items))


    const {data: {data: products}} = await fetchHomePage.NewProducts()
    if (cartId === undefined || token || cartId !== undefined && token === undefined) {
        const cookies = [];
console.log('111111111  premier partie de la condition',cartId);
        if(cartId!==undefined && token===undefined){
            // const {data: {data: {createEmptyCart: createEmptyCart}}} = await fetchHomePage.createEmptyCart(token);

            const {data: {data: {cart: total_quantity}}} = await fetchHomePage.cartTotalQty(cartId, token);  //the create empty cart is the id of the cart
            // console.log("", total_quantity)

            await store.dispatch(quantityCart(total_quantity?.total_quantity ? total_quantity?.total_quantity : 0));


            // cookies.push(
            //     serialize('cart-id', createEmptyCart, {
            //         httpOnly: false, // Prevent JavaScript access
            //         secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            //         path: "/", // Make cookie accessible across the site
            //         maxAge: 60 * 60 * 24 * 7, // 1 week
            //     })
            // );
        }

        if  (cartId === undefined && token === undefined) {


            const {data: {data: {createEmptyCart: createEmptyCart}}} = await fetchHomePage.createEmptyCart(token);

            const {data: {data: {cart: total_quantity}}} = await fetchHomePage.cartTotalQty(createEmptyCart, token);  //the create empty cart is the id of the cart
            // console.log("", total_quantity)

            await store.dispatch(quantityCart(total_quantity?.total_quantity ? total_quantity?.total_quantity : 0));


            cookies.push(
                serialize('cart-id', createEmptyCart, {
                    httpOnly: false, // Prevent JavaScript access
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    path: "/", // Make cookie accessible across the site
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                })
            );


        } else if (token!==undefined) {


            console.log('111111111  premier partie de la condition');
            const customer = await sdk.magento.customer({
                customHeaders: {
                    Authorization: `Bearer ${token || ''}`,
                }
            });
            const isAuth = await sdk.magento.requestPasswordResetEmail({email: customer.data.customer.email}, {});
            console.log('isAuth', isAuth);


            const {data: {data: {createEmptyCart: createEmptyCart}}} = await fetchHomePage.createEmptyCart(token);

            console.log('createEmptyCart', createEmptyCart);
            console.log('cartId', cartId);

            await store.dispatch(authntication(isAuth.data.requestPasswordResetEmail));


            if (cartId === undefined) {

                console.log('111111111  premier seconde de la condition')


                const {data: {data: {cart: total_quantity}}} = await fetchHomePage.cartTotalQty(createEmptyCart, token);  //the create empty cart is the id of the cart
                // console.log("", total_quantity)

                await store.dispatch(quantityCart(total_quantity?.total_quantity ? total_quantity?.total_quantity : 0))
                cookies.push(
                    serialize('cart-id', createEmptyCart, {
                        httpOnly: false, // Prevent JavaScript access
                        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                        path: "/", // Make cookie accessible across the site
                        maxAge: 60 * 60 * 24 * 7, // 1 week
                    })
                )

            } else if (cartId === createEmptyCart) {

                console.log('111111111  3eme partie de la condition')

                const {data: {data: {cart: total_quantity}}} = await fetchHomePage.cartTotalQty(cartId, token);  //the create empty cart is the id of the cart
                // console.log("", total_quantity)

                await store.dispatch(quantityCart(total_quantity?.total_quantity ? total_quantity?.total_quantity : 0))

            } else {
                console.log('111111111  4eme partie de la condition')

                const params = {

                    sourceCartId: cartId,  ///thes the first gestCart

                    // this cart needs to have been created by a logged in user

                    destinationCartId: createEmptyCart        //Customer cart ID

                }


// merge carts and return the result (cart)

                const mergedCart = await sdk.magento.mergeCarts({...params}, {
                    customHeaders: {
                        Authorization: `Bearer ${token || ''}`,
                    }
                });
                console.log('mergedCart', mergedCart)

                if (mergedCart?.data?.mergeCarts) {
                    const {id} = mergedCart.data.mergeCarts

                    const {data: {data: {cart: total_quantity}}} = await fetchHomePage.cartTotalQty(id, token);  //the create empty cart is the id of the cart
                    // console.log("", total_quantity)

                    await store.dispatch(quantityCart(total_quantity?.total_quantity ? total_quantity?.total_quantity : 0))

                    cookies.push(
                        serialize('cart-id', id, {
                            httpOnly: false, // Prevent JavaScript access
                            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                            path: "/", // Make cookie accessible across the site
                            maxAge: 60 * 60 * 24 * 7, // 1 week
                        })
                    );
                }


            }


        }




        if (token) {
            await sdk.magento.wishlistItemsCount({
                customHeaders: {
                    Authorization: `Bearer ${token || ''}`,

                },
            });

            const customQueryResult = await sdk.magento.customQuery({query: queryProductsAndIdwichList}, {

                customHeaders: {
                    Authorization: `Bearer ${token || ''}`,

                },


            });
            console.log('result is her oky hello', customQueryResult)
            const {items, sharing_code, items_count} = customQueryResult?.data?.wishlist
            // console.log('hello items okuokik', items)
            // console.log('hello items okuokik', sharing_code)


            cookies.push(
                serialize('wichlist-id', sharing_code, {
                    httpOnly: true, // Prevent JavaScript access
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    sameSite: "strict", // Protect against CSRF
                    path: "/", // Make cookie accessible across the site
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                })
            );

            store.dispatch(wichListProductsLength(items_count))
            store.dispatch(wichListProducts(items))


        }


        res.setHeader('Set-Cookie', cookies);


    }


    // console.log('her is the cusimer adress is oky ', result);
    // const customQuery = {
    //
    //     shippingMethods: 'get-available-shipping-methods-custom-query',
    //
    //     metadata: {
    //
    //         fields: 'method_title'
    //
    //     }
    //
    // };
    // const result = await sdk.magento.getAvailableShippingMethods({cart_id: cartId},
    //
    //     {
    //         customHeaders: {
    //             Authorization: `Bearer ${token || ''}`,
    //         }
    //     }
    // );
    // console.log('result is her oky', result)
    //
    // const data = await sdk.magento.getAvailableCustomerShippingMethods(
    //
    //     {
    //         customHeaders: {
    //             Authorization: `Bearer ${token || ''}`,
    //         }
    //     });
    //
    // console.log('result is her oky222222222222222222222222222222222222', data)

    // const customQuery = {
    //     wishlistQuery: {
    //         query: `
    //   query getWishlist {
    //     customer {
    //       wishlists {
    //         items_count
    //         id
    //       }
    //     }
    //   }
    // `,
    //     },
    // };
    //
    // try {
    //     const response = await sdk.magento.wishlistItemsCount(
    //
    //         {
    //             customHeaders: {
    //                 Authorization: `Bearer ${token1 || ''}`,
    //             },
    //             customQuery: customQuery.wishlistQuery,
    //         },
    //         {}
    //     );
    //
    //     console.log('Wishlist Response:', response.data.customer);
    // } catch (error) {
    //     console.error('Error fetching wishlist:', error);
    // }


    // const queryVariables: GetProductSearchParams = { search: "t-shirt" };


// fetch query response


// Prepare mutation variables

//     const queryVariables = {
//
//         id:'IT'
//  };
//
//
// // use custom mutation and variables to fetch response adjusted to your needs
//
//     const result = await sdk.magento.customQuery({
//
//         query:queryIdRegion,
//
//         queryVariables
//
//     });
//
//   console.log('result is her okyXXXXXXXXXXXXXXX hello', result.data.country)

    // const response = await sdk.magento.wishlistItemsCount({  customHeaders: {
    //         Authorization: `Bearer ${token || ''}`,
    //
    //     },});
// console.log('Wishlist Response:', response.data.customer.wishlists);


    return {
        props:
            {
                // item: items,
                products: products.products,
                // quantity:total_quantity?.total_quantity,
            },


    };

});

















export default Page;









// const wishlist = await sdk.magento.addProductToWishList({
//
//     // Wishlist ID
//
//     id: 'MEeFE3pD4ORq9SgooOZPcu1WboAh3P5Q',
//
//     // Products to add to wishlist with given ID
//
//     items: [{quantity: 1, sku: '24-MB04'}],
//
//
//     // customHeaders: {
//     //     Authorization:`Bearer ${token?token:null}`
//     // }
//
//
// }, {
//     customHeaders: {
//         Authorization: `Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjMsInV0eXBpZCI6MywiaWF0IjoxNzM2MzQ2NTY5LCJleHAiOjE3MzYzNTAxNjl9.gpe9lfz2cFIL64NPdrCBqatQ5ZcuQ-lzRR6GmRTnSjI `
//     }
// });
// console.log('hello wiwh list', wishlist)


////////   shredcode

// const query = `#graphql
// query {
//     wishlist {
//         name
//         sharing_code
//         items {
//             id
//             qty
//             description
//             added_at
//             product {
//                 name
//                 sku
//                 price {
//                     regularPrice {
//                         amount {
//                             currency
//                             value
//                         }
//                     }
//                 }
//             }
//         }
//         items_count
//         updated_at
//     }
// }
// `;
//
//
// const queryVariables: GetProductSearchParams = { search: "t-shirt" };
//
//
// // fetch query response
//
// const customQueryResult = await sdk.magento.customQuery({ query: query},{
//
//     customHeaders: {
//         Authorization: `Bearer ${token1 || ''}`,
//
//     },
//
//
//
// });
// console.log( 'result is her oky hello', customQueryResult.data.wishlist.items)





/////////// thes custom query for fetch any data




// const query = `#graphql
//
// query{
//
//     wishlist{
//
//         items {
//             added_at
//             description
//             id
//
//             qty
//         }
//
//     }
//
// }
//
// `;
//
//
// const queryVariables: GetProductSearchParams = { search: "t-shirt" };
//
//
// // fetch query response
//
// const customQueryResult = await sdk.magento.customQuery({
//
//     query: query,
//
//     queryVariables
//
// });
// console.log( 'result is her oky hello', customQueryResult)
