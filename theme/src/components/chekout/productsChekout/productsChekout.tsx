// import { SfButton, SfIconRemove, SfLink, SfIconAdd, SfIconSell, SfIconDelete } from '@storefront-ui/react';
// import { useCounter } from 'react-use';
// import { useId, ChangeEvent } from 'react';
// import { clamp } from '@storefront-ui/shared';
//
// export default function ProductsChekout({item}) {
//     console.log(item)
//     const inputId = useId();
//     const min = 1;
//     const max = 10;
//     const [value, { inc, dec, set }] = useCounter<number>(item?.quantity, {});
//     function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
//         const { value: currentValue } = event.target;
//         const nextValue = parseFloat(currentValue);
//         set(Number(clamp(nextValue, min, max)));
//     }
//     return (
//         <div className="relative flex border-b-[1px] border-neutral-200 hover:shadow-lg min-w-[320px] max-w-[640px] p-4">
//             <div className="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
//                 <SfLink href="#">
//                     <img
//                         className="w-full h-auto border rounded-md border-neutral-200"
//                         src={item.configured_variant.thumbnail.url}
//                         alt="alt"
//                         width="300"
//                         height="300"
//                     />
//                 </SfLink>
//                 <div className="absolute top-0 left-0 text-white bg-secondary-600 py-1 pl-1.5 pr-2 text-xs font-medium">
//                     <SfIconSell size="xs" className="mr-1" />
//                     Sale
//                 </div>
//             </div>
//             <div className="flex flex-col pl-4 min-w-[180px] flex-1">
//                 <SfLink href="#" variant="secondary" className="no-underline typography-text-sm sm:typography-text-lg">
//                     {item.configured_variant.name}
//                 </SfLink>
//                 <div className="my-2 sm:mb-0">
//                     <ul className="text-xs font-normal leading-5 sm:typography-text-sm text-neutral-700">
//                         <li>
//                             <span className="mr-1">Size:</span>
//                             <span className="font-medium">6.5</span>
//                         </li>
//                         <li>
//                             <span className="mr-1">Color:</span>
//                             <span className="font-medium">Red</span>
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="items-center sm:mt-auto sm:flex">
//                     <span className="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">{item.configured_variant.price_range.minimum_price.final_price.currency}:{item.configured_variant.price_range.minimum_price.final_price.value}</span>
//                     <div className="flex items-center justify-between mt-4 sm:mt-0">
//                         <div className="flex border border-neutral-300 rounded-md">
//                             <SfButton
//                                 variant="tertiary"
//                                 square
//                                 className="rounded-r-none"
//                                 disabled={value <= min}
//                                 aria-controls={inputId}
//                                 aria-label="Decrease value"
//                                 onClick={() => dec()}
//                             >
//                                 <SfIconRemove />
//                             </SfButton>
//                             <input
//                                 id={inputId}
//                                 type="number"
//                                 role="spinbutton"
//                                 className="appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
//                                 min={min}
//                                 max={max}
//                                 value={value}
//                                 onChange={handleOnChange}
//                             />
//                             <SfButton
//                                 variant="tertiary"
//                                 square
//                                 className="rounded-l-none"
//                                 disabled={value >= max}
//                                 aria-controls={inputId}
//                                 aria-label="Increase value"
//                                 onClick={() => inc()}
//                             >
//                                 <SfIconAdd />
//                             </SfButton>
//                         </div>
//                         <button
//                             aria-label="Remove"
//                             type="button"
//                             className="text-neutral-500 text-xs font-light ml-auto flex items-center px-3 py-1.5"
//                         >
//                             <SfIconDelete />
//                             <span className="hidden ml-1.5 sm:block"> Remove </span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { SfButton, SfIconRemove, SfLink, SfIconAdd, SfIconSell, SfIconDelete } from '@storefront-ui/react';
import { useCounter } from 'react-use';
import { useId, ChangeEvent } from 'react';
import { clamp } from '@storefront-ui/shared';

interface ProductItem {
    configured_variant: {
        name: string;
        thumbnail: {
            url: string;
        };
        price_range: {
            minimum_price: {
                final_price: {
                    currency: string;
                    value: number;
                };
            };
        };
        media_gallery?: { url: string }[]; // or whichever field holds your extra images
    };
    quantity: number;
    // Possibly other fields
}


/**
 * Example data structure assumption:
 * item = {
 *   quantity: number;
 *   configured_variant: {
 *     name: string;
 *     thumbnail: { url: string };
 *     price_range: { minimum_price: { final_price: { currency: string; value: number } } };
 *     // possibly other fields like size, color, etc.
 *   },
 *   // Additional "original product" info (optional, if you have it):
 *   product?: {
 *     name: string;
 *     sku: string;
 *     weight?: number;
 *   };
 * };
 */
export default function ProductsChekout({ item }: { item: any }) {
    console.log(item);

    // For quantity
    const inputId = useId();
    const min = 1;
    const max = 10;
    const [value, { inc, dec, set }] = useCounter<number>(item?.quantity ?? 1, {});

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const { value: currentValue } = event.target;
        const nextValue = parseFloat(currentValue);
        set(Number(clamp(nextValue, min, max)));
    }

    return (
        <div className="relative flex flex-col border-b border-neutral-200 hover:shadow-lg min-w-[320px] max-w-[640px] p-4">
            {/* TOP SECTION: Variant Info */}
            <div className="flex">
                {/* Main Variant Image */}
                <div className="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
                    <SfLink href="#">
                        <img
                            className="w-full h-auto border rounded-md border-neutral-200"
                            src={item?.configured_variant?.thumbnail?.url}
                            alt="Product variant"
                            width="300"
                            height="300"
                        />
                    </SfLink>
                    {/* Example "Sale" badge */}
                    <div className="absolute top-0 left-0 text-white bg-secondary-600 py-1 pl-1.5 pr-2 text-xs font-medium">
                        <SfIconSell size="xs" className="mr-1" />
                        Sale
                    </div>
                </div>

                {/* Product + Variant Details */}
                <div className="flex flex-col pl-4 min-w-[180px] flex-1">
                    {/* Variant Name */}
                    <SfLink
                        href="#"
                        variant="secondary"
                        className="no-underline typography-text-sm sm:typography-text-lg"
                    >
                        {item?.configured_variant?.name}
                    </SfLink>

                    {/* Example: Hardcoded attributes (size/color) - replace with your own logic */}
                    <div className="my-2 sm:mb-0">
                        <ul className="text-xs font-normal leading-5 sm:typography-text-sm text-neutral-700">
                            <li>
                                <span className="mr-1">Size:</span>
                                <span className="font-medium">6.5</span>
                            </li>
                            <li>
                                <span className="mr-1">Color:</span>
                                <span className="font-medium">Red</span>
                            </li>
                        </ul>
                    </div>

                    {/* Price, Quantity, Remove Button */}
                    <div className="items-center sm:mt-auto sm:flex">
                        {/* Price */}
                        <span className="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
              {item?.configured_variant?.price_range?.minimum_price?.final_price?.currency}
                            :
                            {item?.configured_variant?.price_range?.minimum_price?.final_price?.value}
            </span>

                        {/* Quantity + Remove */}
                        <div className="flex items-center justify-between mt-4 sm:mt-0">
                            {/* Quantity Selector */}
                            <div className="flex border border-neutral-300 rounded-md">
                                <SfButton
                                    variant="tertiary"
                                    square
                                    className="rounded-r-none"
                                    disabled={value <= min}
                                    aria-controls={inputId}
                                    aria-label="Decrease value"
                                    onClick={() => dec()}
                                >
                                    <SfIconRemove />
                                </SfButton>
                                <input
                                    id={inputId}
                                    type="number"
                                    role="spinbutton"
                                    className="
                    appearance-none mx-2 w-8 text-center bg-transparent font-medium
                    [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none
                    [&::-webkit-outer-spin-button]:display-none [-moz-appearance:textfield]
                    focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm
                  "
                                    min={min}
                                    max={max}
                                    value={value}
                                    onChange={handleOnChange}
                                />
                                <SfButton
                                    variant="tertiary"
                                    square
                                    className="rounded-l-none"
                                    disabled={value >= max}
                                    aria-controls={inputId}
                                    aria-label="Increase value"
                                    onClick={() => inc()}
                                >
                                    <SfIconAdd />
                                </SfButton>
                            </div>

                            {/* Remove Button */}
                            <button
                                aria-label="Remove"
                                type="button"
                                className="text-neutral-500 text-xs font-light ml-auto flex items-center px-3 py-1.5"
                            >
                                <SfIconDelete />
                                <span className="hidden ml-1.5 sm:block">Remove</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM BLOCK: Original Product Info */}
            {item?.product && (
                <div className="mt-4 p-2 bg-neutral-50 border border-neutral-200 rounded-md">


                    <div className="flex gap-2 mt-2 overflow-x-auto max-w-[240px]">
                         {/*{extraImages.map((img, idx) => (*/}
                        <img
                        //                     // key={idx}
                                            src={item?.product?.thumbnail.url}
                        //                     // alt={`Variant image ${idx + 1}`}
                                            className="w-12 h-12 border border-neutral-200 rounded-md flex-shrink-0"
                                         />
                                         {/*// ))}*/}
                                    </div>

                        <p className="text-sm font-semibold mb-2"> Informations du produit original</p>
                    {/* For example, show the product name, SKU, weight, etc. */}
                    <p className="text-xs mb-1">
                        <span className="font-medium">Nom: </span>
                        {item.product.name || 'N/A'}
                    </p>
                    <p className="text-xs mb-1">
                        <span className="font-medium">SKU: </span>
                        {item.product.sku || 'N/A'}
                    </p>
                    <p className="text-xs mb-0">
                        <span className="font-medium">Poids: </span>
                        {item.product.weight ? `${item.product.weight} kg` : 'N/A'}
                    </p>
                </div>
            )}
        </div>
    );
}


// export default function ProductsChekout({ item }: { item: ProductItem }) {
//     console.log(item);
//
//     const inputId = useId();
//     const min = 1;
//     const max = 10;
//     const [value, { inc, dec, set }] = useCounter<number>(item?.quantity ?? 1);
//
//     function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
//         const { value: currentValue } = event.target;
//         const nextValue = parseFloat(currentValue);
//         set(Number(clamp(nextValue, min, max)));
//     }
//
//     // We'll assume "media_gallery" is an array of images for the variant.
//     // If it's named differently in your data, adjust accordingly.
//     const extraImages = item?.product?.thumbnail || [];
//
//     return (
//         <div
//             className="relative flex border-b-[1px] border-neutral-200 hover:shadow-lg min-w-[320px] max-w-[640px] p-4">
//             {/* Main Image / Thumbnail */}
//             <div className="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
//                 <SfLink href="#">
//                     <img
//                         className="w-full h-auto border rounded-md border-neutral-200"
//                         src={item.configured_variant.thumbnail.url}
//                         alt="product main"
//                         width="300"
//                         height="300"
//                     />
//                 </SfLink>
//                 {/* Example 'Sale' label */}
//                 <div className="absolute top-0 left-0 text-white bg-secondary-600 py-1 pl-1.5 pr-2 text-xs font-medium">
//                     <SfIconSell size="xs" className="mr-1"/>
//                     Sale
//                 </div>
//             </div>
//
//             {/* Product details */}
//             <div className="flex flex-col pl-4 min-w-[180px] flex-1">
//                 {/* Product Name */}
//                 <SfLink href="#" variant="secondary" className="no-underline typography-text-sm sm:typography-text-lg">
//                     {item.configured_variant.name}
//                 </SfLink>
//
//                 {/* Example list of selected attributes (size, color, etc.) */}
//                 <div className="my-2 sm:mb-0">
//                     <ul className="text-xs font-normal leading-5 sm:typography-text-sm text-neutral-700">
//                         <li>
//                             <span className="mr-1">Size:</span>
//                             <span className="font-medium">6.5</span>
//                         </li>
//                         <li>
//                             <span className="mr-1">Color:</span>
//                             <span className="font-medium">Red</span>
//                         </li>
//                     </ul>
//                 </div>
//
//                 {/* SMALL THUMBNAILS for additional variant images */}
//                 {/*{extraImages.length > 1 && (*/}
//
//                 {/*// )}*/}
//
//                 <div className="items-center sm:mt-auto sm:flex">
//                     {/* Price */}
//                     <span className="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
//             {item.configured_variant.price_range.minimum_price.final_price.currency}:
//                         {item.configured_variant.price_range.minimum_price.final_price.value}
//           </span>
//
//                     {/* Quantity and Remove Buttons */}
//                     <div className="flex items-center justify-between mt-4 sm:mt-0">
//                         {/* Quantity Selector */}
//                         <div className="flex border border-neutral-300 rounded-md">
//                             <SfButton
//                                 variant="tertiary"
//                                 square
//                                 className="rounded-r-none"
//                                 disabled={value <= min}
//                                 aria-controls={inputId}
//                                 aria-label="Decrease value"
//                                 onClick={() => dec()}
//                             >
//                                 <SfIconRemove/>
//                             </SfButton>
//                             <input
//                                 id={inputId}
//                                 type="number"
//                                 role="spinbutton"
//                                 className="appearance-none mx-2 w-8 text-center bg-transparent font-medium
//                            [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none
//                            [&::-webkit-outer-spin-button]:display-none [-moz-appearance:textfield]
//                            focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
//                                 min={min}
//                                 max={max}
//                                 value={value}
//                                 onChange={handleOnChange}
//                             />
//                             <SfButton
//                                 variant="tertiary"
//                                 square
//                                 className="rounded-l-none"
//                                 disabled={value >= max}
//                                 aria-controls={inputId}
//                                 aria-label="Increase value"
//                                 onClick={() => inc()}
//                             >
//                                 <SfIconAdd/>
//                             </SfButton>
//                         </div>
//
//                         {/* Remove Button */}
//                         <button
//                             aria-label="Remove"
//                             type="button"
//                             className="text-neutral-500 text-xs font-light ml-auto flex items-center px-3 py-1.5"
//                         >
//                             <SfIconDelete/>
//                             <span className="hidden ml-1.5 sm:block"> Remove </span>
//                         </button>
//                     </div>
//                 </div>
//
//             </div>
//             <div className="flex gap-2 mt-2 overflow-x-auto max-w-[240px]">
//                 {/*{extraImages.map((img, idx) => (*/}
//                 <img
//                     // key={idx}
//                     src={item?.product?.thumbnail.url}
//                     // alt={`Variant image ${idx + 1}`}
//                     className="w-12 h-12 border border-neutral-200 rounded-md flex-shrink-0"
//                 />
//                 {/*// ))}*/}
//             </div>
//         </div>
//     );
// }
