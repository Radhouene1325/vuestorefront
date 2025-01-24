// import { useState, useId } from 'react';
// import classNames from 'classnames';
// import { SfButton, SfRatingButton, SfInput } from '@storefront-ui/react';
//
// export default function Pannier({item, ...rest}) {
//     console.log(rest)
//     console.log(item)
//     const {configurable_options, configured_variant, prices, product, quantity, uid} = item;
//     const [rating, setRating] = useState(0);
//     const [review, setReview] = useState('');
//     const [username, setUsername] = useState('');
//     const [reviewCharacterLimit] = useState(5000);
//     const ratingLabelId = useId();
//
//     const reviewIsAboveLimit = review.length > reviewCharacterLimit;
//     const reviewCharsCount = reviewCharacterLimit - review.length;
//
//     const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(`Form submitted with ${rating} and ${review} by ${username}`);
//     };
//
//     return (
//         <div className="max-w-[376px] md:max-w-[768px]">
//             <h3 className="font-bold py-2 pl-4 pr-3 typography-headline-4">Leave a review</h3>
//             <form
//                 className="grid grid-cols-[100px_1fr] py-2 px-4 gap-4 md:grid-cols-[176px_1fr] grid-rows-[100px_1fr] md:grid-rows-[28px_1fr] items-center md:items-start"
//                 onSubmit={submitForm}
//             >
//                 <img
//                     src={product.thumbnail.url}
//                     alt="Smartwatch"
//                     width="100"
//                     height="100"
//                     className="mx-auto border border-neutral-200 rounded-md aspect-square w-[100px] md:w-[176px]"
//                 />
//                 <p className="text-left text-neutral-900 md:typography-text-lg">{product.name}</p>
//                 <p className="text-left text-neutral-900 md:typography-text-lg">{quantity}</p>
//                 <div className="col-span-2 md:col-start-2">
//                     <div className="flex items-center justify-between">
//                         <p id={ratingLabelId} className="typography-label-sm font-medium text-neutral-900">
//                             price:
//                         </p>
//                         {product.price_range.maximum_price.final_price.value} Euro
//
//                         {/*<SfRatingButton*/}
//                         {/*    value={rating}*/}
//                         {/*    aria-labelledby={ratingLabelId}*/}
//                         {/*    onChange={setRating}*/}
//                         {/*    className="p-1 gap-x-2"*/}
//                         {/*/>*/}
//                     </div>
//                     <label className="my-4 block">
//             <span className="block typography-label-sm font-medium mb-0.5 text-neutral-900">
//               Product review (optional)
//             </span>
//                         <textarea
//                             value={review}
//                             placeholder="Describe your experience eg. Great product! The quality exceeded my expectations, and it's incredibly versatile. I highly recommend it to anyone looking for a reliable and durable solution."
//                             className="block w-full py-2 pl-4 pr-3 min-h-[138px] rounded-md ring-1 ring-neutral-300 placeholder:text-neutral-500"
//                             onChange={(event) => setReview(event.target.value)}
//                         />
//                         <span
//                             className={classNames(
//                                 'block text-xs mt-0.5 text-right',
//                                 reviewIsAboveLimit ? 'text-negative-700 font-medium' : 'text-neutral-500',
//                             )}
//                         >
//                                  {reviewCharsCount}
//
//             </span>
//
//                     </label>
//
//
//                 </div>
//             </form>
//         </div>
//     );
//
//
// };


import { useState, useId } from 'react';
import classNames from 'classnames';
import { SfButton, SfRatingButton, SfInput } from '@storefront-ui/react';
import QuantitySelector from "@/components/panier/quantityProductPanier";

interface PannierProps {
    item: {
        configurable_options?: any[];
        configured_variant?: any;
        prices?: any;
        product: {
            name: string;
            thumbnail: {
                url: string;
            };
            price_range: {
                maximum_price: {
                    final_price: {
                        value: number;
                    };
                };
            };
        };
        quantity: number;
        uid?: string;
    };
    // ...rest can contain any other props you might be passing down
    [key: string]: any;
}

export default function Pannier({item, ...rest}: PannierProps) {
    // Destructure relevant fields from `item`
    const {
        product,
        quantity,
        configured_variant
    } = item;
console.log(item)
    // Local state for review form
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState('');
    const [username, setUsername] = useState('');

    // Max review length (for example, 5000 chars)
    const reviewCharacterLimit = 5000;
    const reviewCharsLeft = reviewCharacterLimit - review.length;
    const reviewIsAboveLimit = review.length > reviewCharacterLimit;

    // For accessibility, link the rating label
    const ratingLabelId = useId();

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // In a real app, you'd dispatch an action or call an API here
        console.log(`Form submitted:
      - Rating: ${rating}
      - Review: ${review}
      - Username: ${username}
    `);
    };
    let [deleteItem, setDeleteItem] = useState<string>('');
console.log(deleteItem)
    console.log(product)

    return (

        <div className="max-w-[376px] md:max-w-[768px] border border-neutral-200 rounded-md p-4 w-11/12  my-4">

            {/* Form for reviewing the product in the pannier (cart item) */}
            <form
                className="grid grid-cols-[100px_1fr] gap-4 md:grid-cols-[176px_1fr]"
                onSubmit={submitForm}
            >
                {/* Product Image */}
                <img
                    src={configured_variant?.thumbnail?.url}
                    alt={configured_variant?.name}
                    width={100}
                    height={100}
                    className="mx-auto border border-neutral-200 rounded-md aspect-square w-[100px] md:w-[176px]"
                />

                {/* Product Details */}
                <div className="flex flex-col justify-between">
                    {/* Product name */}
                    <p className="text-neutral-900 md:typography-text-lg font-medium">
                        {configured_variant?.name}
                    </p>

                    {/* Quantity */}
                    <p className="text-neutral-700">
                        Quantity: <span className="font-semibold">{quantity}</span>
                    </p>

                    <QuantitySelector product={product} item={item}  setDeleteItem={setDeleteItem} deleteItem={deleteItem}/>


                    <p className="text-neutral-900 mt-2">
                        Price:
                        <span className="font-semibold ml-1">
              {product?.price_range?.maximum_price?.final_price?.value} EUR
            </span>
                    </p>
                </div>

                {/* Rating & Review Section (spans full width) */}

            </form>
        </div>
    );



};


