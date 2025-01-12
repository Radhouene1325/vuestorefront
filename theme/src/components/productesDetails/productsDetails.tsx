import { useRef, useState } from 'react';
import { useIntersection } from 'react-use';
import {
    SfScrollable,
    SfButton,
    SfIconChevronLeft,
    SfIconChevronRight,
    type SfScrollableOnDragEndData,
} from '@storefront-ui/react';
import classNames from 'classnames';

const withBase = (filepath: string) => `https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/gallery/${filepath}`;
interface ProductImage {
    url: string;
    position: number;
    disabled: boolean;
    label: string;
    __typename: string;
}
type MediaGallery = ProductImage[];


export default function ProductesDetails({items}:{items:{items:any[]}}) {
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
    }:{name:string,media_gallery:MediaGallery} = items?.items[0];
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
    );
};
