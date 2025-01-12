import { SfRadio, SfListItem } from '@storefront-ui/react';
import { useState } from 'react';

// const deliveryOptions = [
//     {
//         name: 'Standard',
//         cost: 'Free',
//         date: 'Thursday, September 15',
//     },
//     {
//         name: 'Express',
//         cost: '$5.00',
//         date: 'Tomorrow, September 12',
//     },
// ];

export default function DeliveryOptions({available_payment_methods,setCheckedState,checkedState}) {
    console.log(available_payment_methods)

    return (
        <div>
            {available_payment_methods?.map(({ code, title,index }) => (
                <SfListItem
                    as="label"
                    key={index}
                    slotPrefix={
                        <SfRadio
                            name="delivery-options"
                            value={code}
                            checked={checkedState === code}
                            onChange={(event) => {
                                setCheckedState(event.target.value);
                            }}
                        />
                    }
                    slotSuffix={<span className="text-gray-900">Free</span>}
                    className="!items-start max-w-sm border rounded-md border-neutral-200 first-of-type:mr-4 first-of-type:mb-4"
                >
                    {code}
                    <span className="text-xs text-gray-500 break-words">{title}</span>
                </SfListItem>
            ))}
        </div>
    );
}
