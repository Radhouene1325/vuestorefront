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
import {authntication, quantityCart, usernamecustomer} from "@/store/slices/userSlice";
import {setHeaderCategories} from "@/store/slices/categorieSlice";
import {sdk} from "../../sdk.config";
import mysql from 'mysql2/promise';

import {
    queryIdRegion,
    queryOrderHistory,
    queryProductsAndIdwichList, test
} from "../../customQueryMagento/queryProductsWichList";
import {wichListProducts, wichListProductsLength} from '@/store/slices/wichlistSlice';
import {getCookie} from "cookies-next";
import jwt from "jsonwebtoken";
import {destroyCookie} from "nookies";
import {productSpecificate} from "@/store/slices/productsSlice";
import {CustomHeaders, RequestPasswordResetEmailMutationVariables} from "@vue-storefront/magento-types";
import {RequestPasswordResetEmailMutation} from "@vue-storefront/magento-sdk";
import {FetchResult} from "@apollo/client";
import {Context} from "@vue-storefront/magento-api/server/types/context";


export declare function requestPasswordResetEmail(
    context: Context,
    input: RequestPasswordResetEmailMutationVariables,
    customHeaders?: CustomHeaders
): Promise<FetchResult<RequestPasswordResetEmailMutation>>;


const Page: NextPageWithLayout = () => {

    return (
        <>
            <HomeGlobal/>
        </>
    );
};

Page.getLayout = function getLayout(page: ReactElement, pageProps: any) {

    const {products, items, categories} = pageProps;
    console.log(categories)
    console.log(items)

// console.log(products)

    return (

        <ThemeProvider
            // items={item}
            products={products} items={undefined}>
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
    console.log('the req', req.headers)

    const cookies = [];
    //console.log(req.headers)


    const cookiess = parse(req.headers.cookie || "");
    // console.log("Cart ID from Cookie:", cookies['auth-token']);
    const cartId = cookiess['cart-id'] as string;
    let token = cookiess['auth-token'] as string;
    console.log('token99999999999999999999999999999999999999999999999999999999999999999999999999999999999999', token)

    // if(token===undefined){
    //     await store.dispatch(authntication(false));
    // }
    /////thes if fonctionne correctly
    if (token) {
        const decoded = jwt.decode(token, process.env.JWT_SECRET as string) as { exp: number };
        const currentTime = Math    .floor(Date.now() / 1000);
        let  expiresIn=decoded.exp-currentTime;
        if (expiresIn<3 ||decoded===null && token !== undefined) {
            cookies.push(
                serialize('auth-token', '', {
                    httpOnly: true, // Prevent JavaScript access
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    path: "/", // Make cookie accessible across the site
                    maxAge: 0
                })
            );
            store.dispatch(authntication(false));
        }
        // Set Set-Cookie header to remove it


    }
    const categories = await sdk.magento.categories({});


    const {data: {data: {categories: items}}, error, loading} = await fetchHomePage.HomePage(token as string)


    await store.dispatch(setHeaderCategories(items))


    const {data: {data: products}} = await fetchHomePage.NewProducts()
    if (cartId === undefined || token || cartId !== undefined && token === undefined) {

        console.log('111111111  premier partie de la condition', cartId);
        if (cartId !== undefined && token === undefined) {
            // const {data: {data: {createEmptyCart: createEmptyCart}}} = await fetchHomePage.createEmptyCart(token);
            await store.dispatch(authntication(false));
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

        if (cartId === undefined && token === undefined) {
            await store.dispatch(authntication(false));

            const {data: {data: {createEmptyCart: createEmptyCart}}} = await fetchHomePage.createEmptyCart(token);

            const {data: {data: {cart: total_quantity}}} = await fetchHomePage.cartTotalQty(createEmptyCart, token);  //the create empty cart is the id of the cart
            // console.log("", total_quantity)

            await store.dispatch(quantityCart(total_quantity?.total_quantity ? total_quantity?.total_quantity : 0));


            cookies.push(
                serialize('cart-id', createEmptyCart, {
                    httpOnly: true, // Prevent JavaScript access
                    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                    path: "/", // Make cookie accessible across the site
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                })
            );


        } else if (token !== undefined) {


            const customer = await sdk.magento.customer({
                customHeaders: {
                    Authorization: `Bearer ${token || ''}`,
                }
            });
            console.log('customer999999999999999999999999999999999993333333333333333333333333333333333333333333333333333333333333333333333339999999999999999999999999999999999999999999999', customer)
            // const isAuth = await sdk.magento.requestPasswordResetEmail({email: customer?.data?.customer?.email}, {});
            // console.log('isAuth .....................................................................................', isAuth)

            store.dispatch(usernamecustomer(customer?.data?.customer?.firstname));

            const {data: {data: {createEmptyCart: createEmptyCart}}} = await fetchHomePage.createEmptyCart(token);

            console.log('createEmptyCart', createEmptyCart);
            console.log('cartId', cartId);
            if(customer?.data?.customer?.email) {


                await store.dispatch(authntication(true));
            }


            if (cartId === undefined) {


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

                const {data: {data: {cart: total_quantity}}} = await fetchHomePage.cartTotalQty(cartId, token);  //the create empty cart is the id of the cart
                // console.log("", total_quantity)

                await store.dispatch(quantityCart(total_quantity?.total_quantity ? total_quantity?.total_quantity : 0))

            } else {
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
                            httpOnly: true, // Prevent JavaScript access
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


    // const customQueryResult = await sdk.magento.customQuery({query:test}, {
    //
    //     customHeaders: {
    //         Authorization: `Bearer ${token || ''}`,
    //
    //     },
    //
    //
    // });
    // console.log('CCCCCCCCCCCCCCCCCCCCCSSSSScccccccSSSSSSSSSSSSSSSSSSSSSSCCCCCCCSSSSCCfffffffffffffffffffffffffffCCCCCCCCCCCCCdcasdccccccaCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', customQueryResult?.data?.customerOrders)

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

    // const upsellProducts = await sdk.magento.upsellProducts({
    //
    //     pageSize: 20,
    //
    //     currentPage: 1,
    //
    //     filter: {
    //
    //         sku: {
    //
    //             eq: 'MP07'
    //
    //         }
    //
    //     }
    //
    // });
    // console.log('resultsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss is her oky', upsellProducts.data.products.items[0].upsell_products);

    console.log('res',products.products.items );
    const getRandomSku = () => {
        if (!products?.products?.items || products?.products?.items?.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * products?.products?.items?.length);
        return products.products.items[randomIndex]?.url_key;
    };
    console.log('xxxxxxxxxxxxxxxxqqwwwwwwwwwwwqqqqqqqqqqxxxxxxxxxxxxxxxxxxxxxx', getRandomSku())
        let upsell=await fetchHomePage.SpecificationsProducts(getRandomSku())
    store.dispatch(productSpecificate(upsell))
    // if(token===undefined){
    //     await store.dispatch(authntication(false));
    // }
    // const result = await sdk.magento.requestPasswordResetEmail<requestPasswordResetEmail> ({ email: '123@gmail.com'},
    //
    //     );
    //
    // console.log('result is sssssssdeewedwedwedwedeeewdwedwedessssssssssssssssssssssssssssssher oky', result.data.requestPasswordResetEmail)

    // const data= await sdk.magento.resetPassword({
    //
    //     email: 'khalfaradhouene@gmail.com',
    //
    //     newPassword: 'newPassword',
    //
    //     resetPasswordToken: result.data.requestPasswordResetEmail // token obtained from email {@link @vue-storefront/magento-sdk#requestPasswordResetEmail}
    //
    // });
    // console.log('result is ssssssssssss x dsdcdscddddcsddcsasssdwedefrreregrgergerwdewewfwecerwfewfwe   wefewfewssssssssssssssssssssssher oky', data)
    //
    // const email = "123@gmail.com";
    // let resetRequests=[]
    // try {
    //     // Create a MySQL connection
    //     const connection = await mysql.createConnection({
    //         host: 'magento.test', // Update with your database host
    //         user: 'magento', // Update with your database username
    //         password: 'magento', // Update with your database password
    //         database: 'magento' // Update with your Magento database name
    //     });
    //
    //     // Query to fetch the reset password token
    //     const [rows] = await connection.execute(
    //         `SELECT email, rp_token, rp_token_created_at
    //          FROM customer_entity
    //          WHERE email = ?`,
    //         [email]
    //     );
    //     console.log('result is qwsqwsqwwqws x dsdcdscddddcsddcsasssdwedefrreregrgergerwdewewfwecerwfewfwe   wefewfewssssssssssssssssssssssher oky', rows[0].rp_token )
    //     resetRequests = rows;
    //
    //         // console.log('result is ssswqwwqwqwqwqwqwqwqsssssssss x dsdcdscddddcsddcsasssdwedefrreregrgergerwdewewfwecerwfewfwe   wefewfewssssssssssssssssssssssher oky', resetRequests)
    //     // If a token exists, store it
    //     const data= await sdk.magento.resetPassword( {
    //
    //         email: '123@gmail.com',
    //
    //         newPassword: 'Pippo123456@@',
    //
    //         resetPasswordToken:rows[0]?.rp_token // token obtained from email {@link @vue-storefront/magento-sdk#requestPasswordResetEmail}
    //
    //     });
    //     console.log('result is ssssssssssss ddewx dsdcdscddddcsddcsasssd21e12e12e2212e12e12e12e1e2ee', data)
    //
    //
    //     // Close the connection
    //     // await connection.end();
    // } catch (error) {
    //     console.error("Database error:", error);
    // }

    console.log('waaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    return {
        props:
            {
                // item: items,
                products: products.products,
                items,
                categories
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
