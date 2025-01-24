import {useRef, useState} from 'react';
import {useIntersection} from 'react-use';
import {
    SfScrollable,
    SfButton,
    SfIconChevronLeft,
    SfIconChevronRight,
    type SfScrollableOnDragEndData, SfRating,
} from '@storefront-ui/react';
import classNames from 'classnames';
import {useRouter} from "next/router";
import Image from "next/image";
// import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
const withBase = (filepath: string) => `https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/gallery/${filepath}`;

interface ProductImage {
    url: string;
    position: number;
    disabled: boolean;
    label: string;
    __typename: string;
}

type MediaGallery = ProductImage[];
import {
    SfLink,

    SfIconFavorite,

} from '@storefront-ui/react';

const products = Array.from(Array(10), (_, i) => ({
    id: i.toString(),
    name: 'Athletic mens walking sneakers',
    price: '$2,345.99',
    img: {
        src: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png',
        alt: 'White sneaker shoe',
    },
}));

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

export default function ProductesDetails({items, products}: { items: { items: any[] }, products?: any }) {
    console.log(items.items)
    const {
        name,
        price_range,
        thumbnail,
        url_key,
        url_rewrite,
        sku,
        categories,
        configurable_options,
        description,
        image,
        media_gallery,
        small_image,
        uid,
        variants
    }: { name: string, media_gallery: MediaGallery } = items?.items[0];
    console.log(media_gallery[0].url)
    console.log(variants)
    const lastThumbRef = useRef<HTMLButtonElement>(null);
    const thumbsRef = useRef<HTMLDivElement>(null);
    const firstThumbRef = useRef<HTMLButtonElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const firstThumbVisible = useIntersection(firstThumbRef, {
        root: thumbsRef.current,
        rootMargin: '0px',
        threshold: 1,
    });

    const lastThumbVisible = useIntersection(lastThumbRef, {
        root: thumbsRef.current,
        rootMargin: '0px',
        threshold: 1,
    });

    const onDragged = (event: SfScrollableOnDragEndData) => {
        if (event.swipeRight && activeIndex > 0) {
            setActiveIndex((currentActiveIndex) => currentActiveIndex - 1);
        } else if (event.swipeLeft && activeIndex < media_gallery.length - 1) {
            setActiveIndex((currentActiveIndex) => currentActiveIndex + 1);
        }
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <main>

            <div className="relative flex w-full max-h-[600px] aspect-[4/3]">
                <SfScrollable
                    ref={thumbsRef}
                    className="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    direction="vertical"
                    activeIndex={activeIndex}
                    prevDisabled={activeIndex === 0}
                    nextDisabled={activeIndex === media_gallery.length - 1}
                    slotPreviousButton={
                        <SfButton
                            className={classNames(
                                "absolute !rounded-full z-10 top-4 rotate-90 bg-white",
                                {
                                    hidden: firstThumbVisible?.isIntersecting,
                                }
                            )}
                            variant="secondary"
                            size="sm"
                            square
                            slotPrefix={<SfIconChevronLeft size="sm"/>}
                        />
                    }
                    slotNextButton={
                        <SfButton
                            className={classNames(
                                "absolute !rounded-full z-10 bottom-4 rotate-90 bg-white",
                                {
                                    hidden: lastThumbVisible?.isIntersecting,
                                }
                            )}
                            variant="secondary"
                            size="sm"
                            square
                            slotPrefix={<SfIconChevronRight size="sm"/>}
                        />
                    }
                >
                    {media_gallery.map((image, index, thumbsArray) => (
                        <button
                            ref={
                                index === thumbsArray.length - 1
                                    ? lastThumbRef
                                    : index === 0
                                        ? firstThumbRef
                                        : null
                            }
                            type="button"
                            aria-label={image.label || `Thumbnail ${index}`}
                            aria-current={activeIndex === index}
                            key={`thumbnail-${index}`}
                            className={classNames(
                                "md:w-[78px] md:h-auto relative shrink-0 pb-1 mx-4 -mb-2 border-b-4 snap-center cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0",
                                {
                                    "border-primary-700": activeIndex === index,
                                    "border-transparent": activeIndex !== index,
                                }
                            )}
                            onMouseOver={() => setActiveIndex(index)}
                            onFocus={() => setActiveIndex(index)}
                        >
                            <img
                                alt={image.label || `Image ${index}`}
                                className="border border-neutral-200"
                                width="78"
                                height="78"
                                src={image.url}
                            />
                        </button>
                    ))}
                </SfScrollable>
                <SfScrollable
                    className="w-full h-full snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    activeIndex={activeIndex}
                    direction="vertical"
                    wrapperClassName="h-full m-auto"
                    buttonsPlacement="none"
                    isActiveIndexCentered
                    drag={{containerWidth: true}}
                    onDragEnd={onDragged}
                >
                    {media_gallery.map((image, index) => (
                        <div
                            key={`image-${index}`}
                            className="flex justify-center h-full basis-full shrink-0 grow snap-center snap-always"
                        >
                            <img
                                aria-label={image.label || `Image ${index}`}
                                aria-hidden={activeIndex !== index}
                                className="object-contain w-auto h-full"
                                alt={image.label || `Image ${index}`}
                                src={image.url}
                            />
                        </div>
                    ))}
                </SfScrollable>


            </div>

            <RecommendedProducts products={products}/>


        </main>

    );
};



interface RecommendedProductsProps {
    products?: any
}

function RecommendedProducts({products}: RecommendedProductsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
const Router=useRouter()
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: -300, behavior: "smooth"});
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: 300, behavior: "smooth"});
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-8 pt-20">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Altri consigli per la tua attività
            </h2>

            {/* Carousel Container */}
            <div className="relative">
                {/* Scrollable Product List */}
                <div
                    ref={scrollRef}
                    className="flex space-x-6 overflow-x-scroll scroll-smooth scrollbar-hide snap-x snap-mandatory"
                >
                    {products.items.map((product) => (

                        product.related_products.map((itm) => (
                            <div
                                key={product.id}
                                onClick={(async () => {
                                    await Router.push({
                                        pathname: `/about/${itm.url_rewrites.map((item: { url: string; }) => item.url).join('/')}`,
                                        query: {sku: itm.sku}

                                    });
                                })}
                                style={{cursor: "pointer"}}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 w-60 snap-center border border-gray-200 rounded-lg shadow-md bg-white overflow-hidden transform hover:scale-105 transition"
                            >
                                {/* Product Image */}
                                <img
                                    src={itm?.thumbnail?.url}
                                    alt={itm?.thumbnail?.label}
                                    width={300}
                                    height={300}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-3">
                                    {/* Product Name */}
                                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                                        {itm.name}
                                    </h3>

                                    {/* Price */}
                                    <p className="text-sm text-red-600 font-bold mt-1">{itm.price_range.minimum_price.final_price.value}$-{itm.price_range.maximum_price.final_price.value}</p>
                                    <span className="flex items-center pr-2 text-xs text-neutral-500">
              <SfRating value={itm?.review_count
              } max={5} size="xs" className="mr-2"/>2 days ago
            </span>
                                    {/* Min Quantity */}
                                    <p className="text-xs text-gray-500">{itm.stock_status}</p>
                                </div>
                            </div>
                        ))





                    ))
                    }
                </div>


                {/*<SfButton*/}
                {/*    onClick={scrollLeft}*/}
                {/*    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full text-gray-800 hover:bg-gray-200"*/}
                {/*>*/}
                {/*    <SfIconFavorite size="sm" />*/}
                {/*</SfButton>*/}
                {/*<SfButton*/}
                {/*    onClick={scrollRight}*/}
                {/*    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full text-gray-800 hover:bg-gray-200"*/}
                {/*>*/}
                {/*    <SfIconFavorite size="sm" />*/}
                {/*</SfButton>*/}
            </div>
        </div>
    );
}
