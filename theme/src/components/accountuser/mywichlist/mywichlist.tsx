import ProductCard from "@/components/categories/productsCart/ProductsCart";
import React from "react";
import {SfButton, SfCounter, SfIconFavorite, SfIconShoppingCart, SfLink, SfRating} from "@storefront-ui/react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

import{useRouter} from "next/router";
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import {WichList} from "@/utils/addProductsToWichList";
import {wichListProducts, wichListProductsLength} from "@/store/slices/wichlistSlice";
import { SfIconCheckCircle, SfIconClose } from '@storefront-ui/react';
import {useDispatch} from "react-redux";
const MyWichlist = () => {

    const mywichlist = useSelector((state: RootState) => state.wichList.productsWichList)
    console.log(mywichlist)
    let items = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const Router = useRouter()
    const dispatch=useDispatch()

    const { trigger:remove, data:dataRemoved, error:Error, isMutating:isSetMutating } = useSWRMutation(
        `${BASEURL}/api/removeProductsfromwichlist/removeProductsfromwichlist`,
        WichList.removeProductsToWichList
    );

    const HandelRomeve = async (id:{id:number}) => {
        console.log(id)

        try{
            let result = await remove({id:id.id});
            console.log(result.data.data.removeProductsFromWishlist.wishlist.items_count)
            dispatch(wichListProductsLength(result.data.data.removeProductsFromWishlist.wishlist.items_count))
            dispatch(wichListProducts(result.data.data.removeProductsFromWishlist.wishlist.items_v2.items))
        }catch (e) {
            throw e
        }
    }
console.log(dataRemoved)
    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {mywichlist.length!==0? mywichlist?.map((item: { id: React.Key | null | undefined; product: { thumbnail: { url: string | undefined; }; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; stock_status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: { regularPrice: { amount: { value: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; }; }; url_key: any; sku: any; }; }) => (
                    <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]" key={item.id}>

                        <div className="relative">
                            <SfLink href="#" className="block">
                                <img
                                    src={item?.product?.thumbnail.url}
                                    // alt={thumbnail.__typename}
                                    className="object-cover h-auto rounded-md aspect-square"
                                    width="300"
                                    height="300"
                                />
                            </SfLink>
                            <SfButton
                                variant="tertiary"
                                size="sm"
                                square
                                // style={{backgroundColor: productsWichList?.some((item) => item.product.sku === sku) === true ? "#000000" : "#ffffff"}}
                                className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
                                aria-label="Add to wishlist"
                            >
                                <SfIconFavorite size="sm"
                                    //                 onClick={async () => {
                                    //     await HandelSubmit(sku)
                                    // }}
                                />
                            </SfButton>
                        </div>
                        <div className="p-4 border-t border-neutral-200">
                            <SfLink href="#" variant="secondary" className="no-underline">
                                {item.product.name}
                            </SfLink>
                            <div className="flex items-center pt-1">
                                <SfRating size="xs"
                                    // value={rating_summary} max={review_count}
                                />

                                <SfLink href="#" variant="secondary" className="pl-1 no-underline">
                                    <SfCounter size="xs">{123}</SfCounter>
                                </SfLink>
                            </div>
                            <p className="block py-2 font-normal typography-text-sm text-neutral-700">
                                status: {item.product.stock_status}
                            </p>
                            <span
                                className="block pb-2 font-bold typography-text-lg">$ {item?.product?.price?.regularPrice?.amount?.value}</span>
                            <div className="flex justify-between">
                                <SfButton
                                    onClick={(() => {
                                        Router.push({
                                            pathname: `/about/${item.product.url_key}`,
                                            query: {sku: item.product.sku}

                                        })
                                    })}
                                    size="sm" slotPrefix={<SfIconShoppingCart size="sm"/>}>
                                    Add to cart
                                </SfButton>

                                <SfButton
                                    variant="secondary"
                                    onClick={() => HandelRomeve({id:item.id})}
                                    //     onClick={(() => {
                                    //     Router.push({
                                    //         pathname: `/about/${url_key}`,
                                    //         query: {sku: sku}
                                    //
                                    //     })
                                    // })}
                                    // size="sm" slotPrefix={<SfIconShoppingCart size="sm"/>}
                                >
                                    delete
                                </SfButton>

                            </div>
                        </div>
                    </div>
                )):<div>no dwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwata</div>}
            </div>
        </div>
    );



};

export default MyWichlist;
