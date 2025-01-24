

import { useTheme } from '@/context/GlobalContext';
import { SfButton, SfRating, SfCounter, SfLink, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/react';
import { useRouter } from 'next/router';
import {useMemo, useState} from "react";
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import {stripePyament} from "@/utils/stripe";
import { WichList} from "@/utils/addProductsToWichList";
import { SfIconCheckCircle, SfIconClose } from '@storefront-ui/react';
import {
    wichListDecrementLength,
    wichListDecrementProducts,
    wichListProducts,
    wichListProductsLength
} from "@/store/slices/wichlistSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {openWichList} from "@/store/slices/counterSlice";

export default function ProductSliderBasic() {
        const {...products}=useTheme()
    const dispatch=useDispatch()

    const index = useTheme();
    // console.log(index)

     console.log(products)
    const {items}=products.products

    const productsWichList=useSelector((state:RootState)=>state.wichList.productsWichList)


console.log(productsWichList)
//     const [productsdata,setProductsdata]=useState<any[]>([])
//
//     useMemo(()=>{
//         setProductsdata(items)
//     },[items])
//
// let [varient,SetVarient]=useState<string>('')
//     const onMouseHover = (uid) => {
//         let data = productsdata.filter((e) => {
//             return e.uid === uid
//         })
//         console.log(data);
//
// return (
//
//     <img
//         src={data[0].uid === uid ? data[0].variants[3].product.thumbnail.url : thumbnail.url}
//         // alt={thumbnail.label || "Great product"}
//         className="object-cover h-auto rounded-md aspect-squarenes  "
//         width="300"
//         height="300"
//     />
// )
//
//
//         // SetVarient(data[0].variants[3].product.thumbnail.url)
//     }
//
    const { trigger, data, error, isMutating } = useSWRMutation(
        `${BASEURL}/api/addTowichList/addTowichList`,
        WichList.addProductsToWichList
    );


    const { trigger:remove, data:dataRemoved, error:Error, isMutating:isSetMutating } = useSWRMutation(
        `${BASEURL}/api/removeProductsfromwichlist/removeProductsfromwichlist`,
        WichList.removeProductsToWichList
    );

    let HandelSubmit = async (sku: string) => {
        console.log(sku)
        // let result = await trigger({quanatity: 1 as number, sku: sku});
        // console.log(result?.data?.data?.addProductsToWishlist)
        // removeProductsfromwichlist
        //
        if(productsWichList?.some((item)=>item.product.sku===sku)===false) {
            let result = await trigger({quanatity: 1 as number, sku: sku});



            console.log(result?.data?.data?.addProductsToWishlist)
            if (result?.data?.data?.addProductsToWishlist) {

                dispatch(wichListProductsLength(result?.data?.data?.addProductsToWishlist?.wishlist?.items_count));
                dispatch(wichListProducts(result?.data?.data?.addProductsToWishlist.wishlist.items_v2.items))
            }
            // if(wichListProductsLength(result?.data?.data?.addProductsToWishlist?.wishlist?.items_count)){}
            dispatch(openWichList(true))

        }else {
            let data = productsWichList.filter((item) => item.product.sku === sku)

            console.log(data);


            let {id} = data[0]
            console.log(id)
            let result = await remove({id});
            console.log(result.data.data.removeProductsFromWishlist.wishlist.items_count)
             dispatch(wichListProductsLength(result.data.data.removeProductsFromWishlist.wishlist.items_count))
             dispatch(wichListProducts(result.data.data.removeProductsFromWishlist.wishlist.items_v2.items))

        }

    }
    const authenticated=useSelector((state:RootState)=>state.user.auth)
    console.log(authenticated)
    const route = useRouter()
    return (

        <div className="bg-gray-100">
            <div className="mx-auto max-w-12xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h2 className="text-2xl font-bold text-gray-900">Collections</h2>


                    <div className="container mx-auto px-4 py-6 m-a-auto">

            {/* Flex container with wrap and gap */}
            <div className="flex flex-wrap gap-5 justify-center">
                {items.map(({uid, name, price_range, thumbnail, url_key, url_rewrite, sku}: { uid: string; name: string; price_range: { maximum_price: { final_price: { value: number } } }; thumbnail: { url: string; label?: string }; url_key: string; url_rewrite?: string; sku: string }) => {
                    return (
                        <div

                            key={sku}
                            className="border border-neutral-200 rounded-md hover:shadow-lg w-[300px] flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="relative">
                                <SfLink className="block">

                                    <img
                                        src={thumbnail.url}
                                        alt={thumbnail.label || "Great product"}
                                        className="object-cover h-auto rounded-md aspect-squarenes  "
                                        width="300"
                                        height="300"
                                    />
                                    {/*{onMouseHover(uid,thumbnail)}*/}
                                </SfLink>
                                <SfButton
                                    variant="tertiary"
                                    size="sm"
                                    square
                                    style={{backgroundColor: productsWichList?.some((item)=>item.product.sku===sku)===true ? "#000000" : "#ffffff" }}
                                    className="absolute bottom-0 right-0 mr-2 mb-2  ring-1 ring-inset ring-neutral-200 !rounded-full"
                                    aria-label="Add to wishlist"
                                >
                                    {authenticated === true ? <SfIconFavorite size="sm" onClick={async () => {
                                        await HandelSubmit(sku)
                                    }}/> : null}
                                    {/*{*/}
                                    {/*      productsWichList?.map(e=>{return e.product.sku==sku})*/}
                                    {/*}*/}
                                </SfButton>
                            </div>

                            {/* Content Section */}
                            <div className="p-4 border-t border-neutral-200 flex-1 flex flex-col" >
                                <SfLink style={{cursor:'pointer'}} variant="secondary" className="no-underline" onClick={async() => {
                                   await  route.push({
                                        pathname: `/about/${url_key}`,
                                        query: {sku: sku}
                                    })
                                }}>
                                    {name || "Athletic men's walking sneakers"}
                                </SfLink>
                                <div className="flex items-center pt-1">
                                    <SfRating size="xs" value={5} max={5}/>
                                    <SfLink variant="secondary" className="pl-1 no-underline">
                                        <SfCounter size="xs">{123}</SfCounter>
                                    </SfLink>
                                </div>
                                <p className="block py-2 font-normal typography-text-sm text-neutral-700">
                                    Lightweight • Non-slip • Flexible outsole • Easy on/off
                                </p>
                                <span
                                    className="block pb-2 font-bold typography-text-lg">${price_range.maximum_price.final_price.value}</span>

                                {/* Example “Add to cart” button or other action */}
                                {/*<div className="mt-auto">*/}
                                {/*    <SfButton variant="primary" className="w-full">*/}
                                {/*        Add to cart*/}
                                {/*    </SfButton>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    );

                })}
            </div>
        </div>

                </div>
            </div>
        </div>


    );

}
