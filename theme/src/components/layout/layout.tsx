import FooterBasic from "../footer";
import MegaMenuNavigation from "../header";
import {SfDrawer} from "@storefront-ui/react";
import {openWichList} from "@/store/slices/counterSlice";
import React, {Suspense} from "react";
import ProductRating from "@/components/productsWichList/productswichList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";

// export const getServerSideProps = async (context) => {
//
//
//
//     const res = await fetch('http://localhost:3000/api/hello');
//     const repo = await res.json()
//     // Pass data to the page via props
//     return { props: { repo } }
//
// };

export default function Layout({children, ...repo}: { children: React.ReactNode; [key: string]: any }) {
    const dispatch=useDispatch()

    const OpenWichList=useSelector((state:RootState)=>state.counter.value)
    console.log(OpenWichList)

    const productsWichList=useSelector((state:RootState)=>state.wichList.productsWichList)
    console.log(productsWichList)
    console.log(repo)
    return (
        <>
            <SfDrawer
                open={OpenWichList}
                onClose={() => dispatch(openWichList(false))}
                placement="right"
                className="bg-neutral-50 border border-gray-300 max-w-[500px] sm:max-w-[600px] rounded-lg shadow-lg"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-300">
                    <h2 className="font-bold text-lg">{('wishlist.title')}</h2>
                    <button
                        onClick={() => dispatch(openWichList(false))}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        {('wishlist.close')}
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="h-[calc(100vh-160px)] overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-100 rounded-md">
                    <Suspense fallback={<p>Loading...</p>}>
                        {productsWichList?.map((item, index) => (
                            <ProductRating key={index} item={item} />
                        ))}
                    </Suspense>
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-gray-300">
                    <button className="w-full py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-md">
                        {('wishlist.viewFullWishlist')}
                    </button>
                    {/* Pagination */}
                    <div className="flex justify-between mt-4">
                        {/*<button*/}
                        {/*    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}*/}
                        {/*    disabled={currentPage === 1}*/}
                        {/*    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"*/}
                        {/*>*/}
                        {/*    {t('wishlist.previous')}*/}
                        {/*</button>*/}
                        {/*<button*/}
                        {/*    onClick={() => setCurrentPage((prev) => prev + 1)}*/}
                        {/*    disabled={currentPage * PAGE_SIZE >= productsWichList[0]?.length}*/}
                        {/*    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"*/}
                        {/*>*/}
                        {/*    {t('wishlist.next')}*/}
                        {/*</button>*/}
                    </div>
                </div>
            </SfDrawer>

            <MegaMenuNavigation/>
            <main>{children}</main>
            <FooterBasic/>
        </>
    )
};