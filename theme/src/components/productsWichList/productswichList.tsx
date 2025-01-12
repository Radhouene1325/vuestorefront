import {useState, useId} from 'react';
import {SfModal, SfButton, SfIconClose, useDisclosure, SfRatingButton} from '@storefront-ui/react';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import { useRouter } from 'next/router';
interface ProductsWichListProps {
    item?: any
}

export default function ProductsWichList({item}: ProductsWichListProps) {
console.log(item)
    const {isOpen, open, close} = useDisclosure({initialValue: true});
    const [rating, setRating] = useState(0);
    const modalTitleId = useId();
    const modalDescId = useId();
const route=useRouter()
    return (
        <>


            <header>
                <h3 id={modalTitleId} className="font-bold typography-headline-4 md:typography-headline-3 mb-8">
                    {item.name}
                </h3>
            </header>
            <img

                src={item.product.thumbnail.url}
                alt="Smartwatch"
                width="100"
                height="100"
                className="mx-auto border border-neutral-200 rounded-md"
                onClick={() => {
                    route.push({
                        pathname: `/about/${item.product.url_key}`,
                        query: {sku: item.product.sku}
                    })
                }}
            />
            <p id={modalDescId} className="mt-2 text-center">

            </p>


        </>
    );
}
