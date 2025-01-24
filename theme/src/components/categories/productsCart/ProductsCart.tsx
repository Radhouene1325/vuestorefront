import { SfButton, SfRating, SfCounter, SfLink, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/react';
import {useTheme} from "@/context/GlobalContext";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useRouter} from "next/router";
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import {WichList} from "@/utils/addProductsToWichList";
import {wichListProducts, wichListProductsLength} from "@/store/slices/wichlistSlice";
import {useDispatch} from "react-redux";
import {openWichList} from "@/store/slices/counterSlice";
export default function ProductCard({item}) {
    const dispatch=useDispatch()
    console.log(item)
    const Router=useRouter()
    const productsWichList=useSelector((state:RootState)=>state.wichList.productsWichList)

    const authenticated=useSelector((state:RootState)=>state.user.auth)
    console.log(authenticated)
    console.log(productsWichList)

    const counterValue = useSelector((state: RootState) => state.counter.value);
    console.log(counterValue)
    const HandelClick = async () => {
        await fetch('http://localhost:3000/api/addproductstocart/addproductstocart')

    };
    const {name, price_range, thumbnail, rating_summary, review_count, sku,url_rewrites, url_key} = item;
    console.log(url_key)
    console.log(sku)

    const { trigger, data, error, isMutating } = useSWRMutation(
        `${BASEURL}/api/addTowichList/addTowichList`,
        WichList.addProductsToWichList
    );


    const { trigger:remove, data:dataRemoved, error:Error, isMutating:isSetMutating } = useSWRMutation(
        `${BASEURL}/api/removeProductsfromwichlist/removeProductsfromwichlist`,
        WichList.removeProductsToWichList
    );

    let HandelSubmit = async (sku:{sku:string}) => {
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


    return (
        <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">

            <div className="relative">
                <SfLink href="#" className="block">
                    <img
                        src={thumbnail.url}
                        alt={thumbnail.__typename}
                        className="object-cover h-auto rounded-md aspect-square"
                        width="300"
                        height="300"
                    />
                </SfLink>
                <SfButton
                    variant="tertiary"
                    size="sm"
                    square
                    style={{backgroundColor: productsWichList?.some((item) => item.product.sku === sku) === true ? "#000000" : "#ffffff"}}
                    className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
                    aria-label="Add to wishlist"
                >
                    {authenticated === true ? <SfIconFavorite size="sm" onClick={async () => {
                        await HandelSubmit(sku)
                    }}/> : null}
                </SfButton>
            </div>
            <div className="p-4 border-t border-neutral-200">
                <SfLink href="#" variant="secondary" className="no-underline">
                    {name}
                </SfLink>
                <div className="flex items-center pt-1">
                    <SfRating size="xs" value={rating_summary} max={review_count}/>

                    <SfLink href="#" variant="secondary" className="pl-1 no-underline">
                        <SfCounter size="xs">{123}</SfCounter>
                    </SfLink>
                </div>
                {/*<p className="block py-2 font-normal typography-text-sm text-neutral-700">*/}
                {/*    Lightweight • Non slip • Flexible outsole • Easy to wear on and off*/}
                {/*</p>*/}
                <span className="block pb-2 font-bold typography-text-lg">$2345,99</span>
                <SfButton onClick={(async () => {
                    await Router.push({
                        pathname: `/about/${url_rewrites.map((item) => item.url).join('/')}`,
                        query: {sku: sku}

                    });
                })} size="sm" slotPrefix={<SfIconShoppingCart size="sm"/>}>
                    Add to cart
                </SfButton>
            </div>
        </div>
    );
}
