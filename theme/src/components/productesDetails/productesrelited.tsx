import Slider from 'react-slick';
import {
    SfLink,
    SfButton,
    SfIconFavorite,
    SfIconChevronLeft,
    SfIconChevronRight,
    SfScrollable,
} from '@storefront-ui/react';
import classNames from 'classnames';
import {useRouter} from "next/router";




function ButtonPrev({ disabled, ...attributes }: { disabled?: boolean }) {
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
            <SfIconChevronLeft />
        </SfButton>
    );
}

ButtonPrev.defaultProps = { disabled: false };

function ButtonNext({ disabled, ...attributes }: { disabled?: boolean }) {
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
            <SfIconChevronRight />
        </SfButton>
    );
}

ButtonNext.defaultProps = { disabled: false };
interface ProductesrelitedProps {
    items?: { items: { variants: { product: any; }[] }[] }
}


// Slider settings

export default function Productesrelited({items}: ProductesrelitedProps) {
    const route=useRouter()

    console.log(route.query.slug)

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

            {items?.items?.map(({variants}) =>



                    <>
                        {
                            variants?.map(({product}) => (
                                <div
                                     key={product.uid}
                                    className="first:ms-auto last:me-auto ring-1 ring-inset ring-neutral-200 shrink-0 rounded-md hover:shadow-lg w-[148px] lg:w-[192px]"
                                >
                                    {/*<a*/}
                                    {/*    className="absolute inset-0 z-1 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-md"*/}
                                    {/*    href="#"*/}
                                    {/*    aria-label={product.name}*/}
                                    {/*/>*/}

                                    <div className="relative">
                                        <SfLink href="#" className="block">
                                            <img src={product.media_gallery.map((url: string) => url.url)}
                                                 className="block object-cover h-auto rounded-md aspect-square lg:w-[190px] lg:h-[190px]"/>
                                        </SfLink>
                                    </div>

                                    <div className="flex flex-col items-start p-4 grow">
                                        <p className="font-medium typography-text-base">Price:{product.price_range.minimum_price.final_price.value}EURO</p>
                                        {/*<p className="mt-1 mb-4 font-normal typography-text-sm text-neutral-700">SASAASASAASA</p>*/}
                                        <SfButton size="sm" variant="tertiary" className="relative mt-auto"
                                        onClick={(async ()=>{
                                            let data = variants.filter(e => e.product.uid === product.uid);
                                            console.log(data)
                                            let infovarient = data[0]?.attributes


                                                const object: { object: { colorCode: number; sizeCode: number } } = {
                                                    object: {
                                                        colorCode: infovarient[0]?.value_index,
                                                        sizeCode: infovarient[1]?.value_index
                                                    }
                                                }
                                            console.log(object);
                                            await route.push({
                                                pathname: `/about/${route.query.slug}/${product.sku}`,
                                                query: {sku: JSON.stringify(object)},

                                            });
                                        })}
                                        >
                                            {product.name}
                                        </SfButton>
                                    </div>
                                </div>

                            ))
                        }
                    </>
            )

            }
        </SfScrollable>


    );


};
