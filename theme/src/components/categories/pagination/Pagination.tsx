import {Fragment, useEffect, useMemo} from 'react';
import {SfButton, SfIconChevronLeft, SfIconChevronRight, usePagination} from '@storefront-ui/react';
import classNames from 'classnames';
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import fetchHomePage from "@/utils/fetchHomePage";
import {useRouter} from "next/router";
import {cartProductsFiltred, paginationProducts} from "@/store/slices/productsSlice";
import {useDispatch} from "react-redux";
interface PaginationProps {
    page_info?: {
        current_page: number,
        page_size: number,
        total_pages: number,

    },
    total_count?: number
}

export function Pagination({page_info, total_count}: PaginationProps) {
    console.log(page_info,total_count)
    const {totalPages, pages, selectedPage, startPage, endPage, next, prev, setPage, maxVisiblePages} = usePagination({
        totalItems: total_count || 0,
        currentPage: page_info?.current_page || 1,
        pageSize: page_info?.page_size || 1,
        maxPages: page_info?.total_pages || 1,
    });
    console.log(pages, selectedPage, totalPages, startPage, endPage, next, prev)
    const router = useRouter();
    const {uid} = router.query;
    const dispatchEvent=useDispatch();
    const {trigger, data, error, isMutating} = useSWRMutation(
        (arg: string | string[][] | Record<string, string> | URLSearchParams | undefined) => {
            const query = new URLSearchParams(arg).toString();

            return `${BASEURL}/api/productsCategory/productsCategories/${query}`;
        },


        fetchHomePage.filterProducts
    );

     useMemo(async () => {
         dispatchEvent(cartProductsFiltred([])); // Dispatch the action
         await trigger({selectedPage,uid})
     }, [selectedPage])

    useEffect((() => {
if(data?.data?.data?.products) {
    dispatchEvent(paginationProducts(data));

}
    }), [data?.data?.data?.products,dispatchEvent]);
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            console.log(url);
            console.log(url.startsWith("/categorie")); // Check if it's a category route

            if (router.query.uid !== null) {
                dispatchEvent(paginationProducts([])); // Dispatch the action
                // setValueselected({}); // Reset filters
                // setSelectName(""); // Reset selected name
            }
        };

        // Listen to route change
        router.events.on("routeChangeComplete", handleRouteChange);

        // Cleanup event listener when component unmounts
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router]);

    // console.log(data.data.data.products)
    return (
        <nav
            className="flex justify-between items-end border-t border-neutral-200"
            role="navigation"
            aria-label="pagination"
        >
            <SfButton
                size="lg"
                className="gap-3 !px-3 sm:px-6"
                aria-label="Go to previous page"
                disabled={selectedPage <= 1}
                variant="tertiary"
                slotPrefix={<SfIconChevronLeft/>}
                onClick={() => prev()}
            >
                <span className="hidden sm:inline-flex">Previous</span>
            </SfButton>
            <ul className="flex justify-center">
                {!pages.includes(1) && (
                    <li>
                        <div
                            className={classNames('flex pt-1 border-t-4 border-transparent', {
                                'font-medium border-t-4 !border-primary-700': selectedPage === 1,
                            })}
                        >
                            <button
                                type="button"
                                className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
                                aria-current={selectedPage === 1}
                                onClick={() => setPage(1)}
                            >
                                1
                            </button>
                        </div>
                    </li>
                )}
                {startPage > 2 && (
                    <li>
                        <div className="flex border-t-4 border-transparent">
                            <button
                                type="button"
                                disabled
                                aria-hidden="true"
                                className="px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                            >
                                ...
                            </button>
                        </div>
                    </li>
                )}
                {pages.map((page: number) => (
                    <Fragment key={page}>
                        {maxVisiblePages === 1 && selectedPage === totalPages && (
                            <li>
                                <div className="flex pt-1 border-t-4 border-transparent">
                                    <button
                                        type="button"
                                        className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                                        aria-current={endPage - 1 === selectedPage}
                                        onClick={() => setPage(endPage - 1)}
                                    >
                                        {endPage - 1}
                                    </button>
                                </div>
                            </li>
                        )}
                        <li>
                            <div
                                className={classNames('flex pt-1 border-t-4 border-transparent', {
                                    'font-medium border-t-4 !border-primary-700': selectedPage === page,
                                })}
                            >
                                <button
                                    type="button"
                                    className={classNames(
                                        'min-w-[38px] px-3 sm:px-4 py-3 text-neutral-500 md:w-12 rounded-md hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900',
                                        {'!text-neutral-900 hover:!text-primary-800 active:!text-primary-900': selectedPage === page},
                                    )}
                                    aria-label={`Page ${page} of ${totalPages}`}
                                    aria-current={selectedPage === page}
                                    onClick={() => setPage(page)}
                                >
                                    {page}
                                </button>
                            </div>
                        </li>
                        {maxVisiblePages === 1 && selectedPage === 1 && (
                            <li>
                                <div className="flex pt-1 border-t-4 border-transparent">
                                    <button
                                        type="button"
                                        className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                                        aria-current={selectedPage === 1}
                                        onClick={() => setPage(2)}
                                    >
                                        2
                                    </button>
                                </div>
                            </li>
                        )}
                    </Fragment>
                ))}
                {endPage < totalPages - 1 && (
                    <li>
                        <div className="flex pt-1 border-t-4 border-transparent">
                            <button
                                type="button"
                                disabled
                                aria-hidden="true"
                                className="px-3 sm:px-4 py-3 rounded-md text-neutral-500 "
                            >
                                ...
                            </button>
                        </div>
                    </li>
                )}
                {!pages.includes(totalPages) && (
                    <li>
                        <div
                            className={classNames('flex pt-1 border-t-4 border-transparent', {
                                'font-medium border-t-4 !border-primary-700': selectedPage === totalPages,
                            })}
                        >
                            <button
                                type="button"
                                className="min-w-[38px] px-3 sm:px-4 py-3 rounded-md text-neutral-500 md:w-12 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                                aria-current={totalPages === selectedPage}
                                onClick={() => setPage(totalPages)}
                            >
                                {totalPages}
                            </button>
                        </div>
                    </li>
                )}
            </ul>
            <SfButton
                size="lg"
                aria-label="Go to next page"
                disabled={selectedPage >= totalPages}
                variant="tertiary"
                slotSuffix={<SfIconChevronRight/>}
                className="gap-3 !px-3 sm:px-6"
                onClick={() => next()}
            >
                <span className="hidden sm:inline-flex">Next</span>
            </SfButton>
        </nav>
    );
}
