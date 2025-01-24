import Slider from 'react-slick';
import {
    SfLink,
    SfButton,
    SfIconFavorite,
    SfIconChevronLeft,
    SfIconChevronRight,
    SfScrollable, SfRating,
} from '@storefront-ui/react';
import classNames from 'classnames';
import {useRouter} from "next/router";


function ButtonPrev({disabled, ...attributes}: { disabled?: boolean }) {
    return (
        <SfButton
            className={classNames('absolute !rounded-full z-10 left-4 bg-white hidden md:block', {
                '!hidden': disabled,
            })}
            variant="secondary"
            size="lg"
            square
            {...attributes}
        >
            <SfIconChevronLeft/>
        </SfButton>
    );
}

ButtonPrev.defaultProps = {disabled: false};

function ButtonNext({disabled, ...attributes}: { disabled?: boolean }) {
    return (
        <SfButton
            className={classNames('absolute !rounded-full z-10 right-4 bg-white hidden md:block', {
                '!hidden': disabled,
            })}
            variant="secondary"
            size="lg"
            square
            {...attributes}
        >
            <SfIconChevronRight/>
        </SfButton>
    );
}

ButtonNext.defaultProps = {disabled: false};

interface ProductesrelitedProps {
    // items?: { items: { variants: { product: any; }[] }[] },
    products?: any
}


// Slider settings

export default function Productesrelited({products}: ProductesrelitedProps) {
    const route = useRouter()
console.log(products.items)
    console.log(route.query.slug)

    const Router = useRouter()

    return (

        //
        //


        <SfScrollable
            className="m-auto py-4 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            buttons-placement="floating"
            drag
            slotPreviousButton={<ButtonPrev/>}
            slotNextButton={<ButtonNext/>}
        >

            {products?.items?.map((item) =>


                    (
                        item?.related_products?.map((itm) => (
                            <div
                                key={itm?.uid}
                                className="first:ms-auto last:me-auto ring-1 ring-inset ring-neutral-200 shrink-0 rounded-md hover:shadow-lg w-[148px] lg:w-[192px]"
                            >
                                {/*<a*/}
                                {/*    className="absolute inset-0 z-1 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-md"*/}
                                {/*    href="#"*/}
                                {/*    aria-label={product.name}*/}
                                {/*/>*/}

                                <div className="relative">
                                    <SfLink href="#" className="block">
                                        <img src={itm?.thumbnail?.url}
                                             alt={itm?.thumbnail?.label}
                                             className="block object-cover h-auto rounded-md aspect-square lg:w-[190px] lg:h-[190px]"/>
                                    </SfLink>
                                </div>

                                <div className="flex flex-col items-start p-4 grow">
                                    <p className="font-medium typography-text-base">Price:{itm.price_range.minimum_price.final_price.value}$-{itm.price_range.maximum_price.final_price.value}$</p>
                                    <p className="mt-1 mb-4 font-normal typography-text-sm text-neutral-700">Sattus:{itm.stock_status}</p>
                                    <span className="flex items-center pr-2 text-xs text-neutral-500">
              <SfRating value={itm?.review_count
                  } max={5} size="xs" className="mr-2"/>2 days ago
            </span>
                                    <SfButton size="sm" variant="tertiary" className="relative mt-auto"

                                              onClick={(async () => {
                                                  await Router.push({
                                                      pathname: `/about/${itm.url_rewrites.map((item: { url: string; }) => item.url).join('/')}`,
                                                      query: {sku: itm.sku}

                                                  });
                                              })}
                                    >
                                        {itm.name}
                                    </SfButton>
                                </div>

                            </div>

                        ))
                    )
            )

            }
        </SfScrollable>


    );



};
