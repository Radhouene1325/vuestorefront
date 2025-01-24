import { SfChip, SfAccordionItem, SfIconChevronLeft } from '@storefront-ui/react';
import classNames from 'classnames';
import { useState } from 'react';
type DataType = {
    attribute_code: string;
    attribute_uid: string;
    label: string;
    position: number;
    uid: string;
    use_default: string;
    values: any[]; // Adjust 'any' to the actual type of the array items if known
};


export default function SizeFilter({
    selectedSizes,
    setSelectedSizes,
    opened,
    setOpened,
    params,
    setParams,
    configurable_options,
}: {
    selectedSizes: string[];
    setSelectedSizes: (sizes: string[]) => void;
    opened: boolean;
    setOpened: (opened: boolean) => void;
    params: any[]; // Replace 'any[]' with the actual type if known
    setParams: (params: any[]) => void; // Replace 'any[]' with the actual type if known
    configurable_options: DataType[];
}) {


    // console.log(configurable_options)
    const data = configurable_options[1]

    const {attribute_code, attribute_uid, label, position, uid, use_default, values}: DataType = data


    // const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    // const [opened, setOpened] = useState(true);
    //
    // const [params, setParams] = useState<string[]>([])
    const handleSizeSelection = (val: string) => {
        // console.log(val)
        let uidSizee = values.filter((value) => value.label === val)
        console.log(uidSizee)
        let ziseParams = {
            // uidGlobalSize:data.uid,
            uidSize: uidSizee[0].uid
        }
        if (selectedSizes.indexOf(val) > -1) {
            // setSelectedSizes([...selectedSizes.filter((value) => value !== val)]);
            setSelectedSizes([]);
            setParams([])
        } else {
            // setSelectedSizes([...selectedSizes, val]);
            setSelectedSizes([val]);
            setParams([ziseParams])
        }

        // console.log(ziseParams)

    };
    console.log(params)
    console.log(selectedSizes)
    return (
        <SfAccordionItem
            open={opened}
            onToggle={() => setOpened(!opened)}
            className="w-full md:max-w-[376px]"
            summary={
                <div className="flex justify-between p-2 mb-2">
                    <p className="font-medium">{label}</p>
                    <SfIconChevronLeft
                        className={classNames('text-neutral-500', `${opened ? 'rotate-90' : '-rotate-90'}`)}/>
                </div>
            }
        >
            <ul className="grid grid-cols-5 gap-2">
                {values.map(({uid, label, value, swatch_data}) => (
                    <li key={uid}>
                        <SfChip
                            value={uid}
                            size="sm"
                            className="w-full"
                            inputProps={{value, onChange: () => handleSizeSelection(swatch_data.value)}}
                        >
                            {label}
                        </SfChip>
                    </li>
                ))}
            </ul>
        </SfAccordionItem>
    );
};
