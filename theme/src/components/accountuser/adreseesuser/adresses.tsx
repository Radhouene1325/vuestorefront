import ProductCard from "@/components/categories/productsCart/ProductsCart";
import React from "react";
import {SfButton, SfCounter, SfIconFavorite, SfIconShoppingCart, SfLink, SfRating} from "@storefront-ui/react";


const Adresses = () => {

    let items=[1,2,3,4,5,6,7,8,9]
    return (
        <div>
            <SfButton className='p-4 border-t border-neutral-200'>Add New Adress</SfButton>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {items?.map((item) => (
                    <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">


                        <div className="p-4 border-t border-neutral-200">
                            <div className="relative">

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
                            <SfLink href="#" variant="secondary" className="no-underline">
                                {/*{name}*/}ssasaSAS
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
                                Lightweight • Non slip • Flexible outsole • Easy to wear on and off
                            </p>
                            <span className="block pb-2 font-bold typography-text-lg">$2345,99</span>
                            <SfButton
                                //     onClick={(() => {
                                //     Router.push({
                                //         pathname: `/about/${url_key}`,
                                //         query: {sku: sku}
                                //
                                //     })
                                // })}
                                size="sm" slotPrefix={<SfIconShoppingCart size="sm"/>}>
                                delete
                            </SfButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Adresses;