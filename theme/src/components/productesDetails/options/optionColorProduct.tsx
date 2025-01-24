import {SfAccordionItem, SfCounter, SfListItem, SfThumbnail, SfIconChevronLeft} from '@storefront-ui/react';
import {useState} from 'react';
import classNames from 'classnames';
import {originConsoleError} from "next/dist/client/components/globals/intercept-console-error";

type DataType = {
    attribute_code: string;
    attribute_uid: string;
    label: string;
    position: number;
    uid: string;
    use_default: string;
    values: any[]; // Adjust 'any' to the actual type of the array items if known
};

interface ColorFilterProps {
    paramsColor?: string[]
}

export default function ColorFilter({
                                        colorList,
                                        setColorList,
                                        opened,
                                        setOpened,
                                        setParamsColor,
                                        configurable_options,
                                        paramsColor
                                    }: {
                                        colorList: string[];
                                        setColorList: (value: string[]) => void;
                                        opened: boolean;
                                        setOpened: (value: boolean) => void;
                                        setParamsColor: (value: { uidColor: string }[]) => void;
                                        configurable_options: DataType[];
                                        paramsColor?: string[];
                                    }) {

    const data = configurable_options[0]
    console.log(data)

    const {attribute_code, attribute_uid, label, position, uid, use_default, values}: DataType = data

    // const [colorList, setColorList] = useState<string[]>([]);
    // const [opened, setOpened] = useState(true);
    //
    //
    //     const [params, setParams] = useState<string[]>([])
    const handleColorSelection = (val: string) => {
        let uidColor = values.filter((value) => value.label === val)
        console.log(uidColor)
        let colorParams = {
            // uidGlobalSize:data.uid,
            uidColor: uidColor[0].uid
        }
        if (colorList.indexOf(val) > -1) {
            // setColorList([...colorList.filter((value) => value !== val)]);
            setColorList([]);
            setParamsColor([])
        } else {
            // setColorList([...colorList, val]);
            setColorList([val]);
            setParamsColor([colorParams])

        }

    };
    console.log(colorList[0])
    const isColorSelected = (val: string) => colorList.includes(val);

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
            {values.map(({label, swatch_data, uid}) => (
                <SfListItem
                    key={swatch_data.uid}
                    as="label"
                    size="sm"
                    className="px-1.5 bg-transparent hover:bg-transparent"
                    selected={isColorSelected(swatch_data.value)}
                    slotPrefix={
                        <>
                            <input
                                value={label}
                                checked={isColorSelected(label)}
                                className="appearance-none peer"
                                type="checkbox"
                                onChange={(event) => {
                                    handleColorSelection(event.target.value);
                                }}
                            />
                            <span
                                className="inline-flex items-center justify-center p-1 transition duration-300 rounded-full cursor-pointer ring-1 ring-neutral-200 ring-inset outline-offset-2 outline-secondary-600 peer-checked:ring-2 peer-checked:ring-primary-700 peer-hover:bg-primary-100 peer-[&:not(:checked):hover]:ring-primary-200 peer-active:bg-primary-200 peer-active:ring-primary-300 peer-disabled:cursor-not-allowed peer-disabled:bg-disabled-100 peer-disabled:opacity-50 peer-disabled:ring-1 peer-disabled:ring-disabled-200 peer-disabled:hover:ring-disabled-200 peer-checked:hover:ring-primary-700 peer-checked:active:ring-primary-700 peer-focus:outline">
                <SfThumbnail size="sm" style={{backgroundColor: swatch_data.value}}/>
              </span>
                        </>
                    }
                >
                    <p>
                        <span className="mr-2 text-sm">{label}</span>
                        <SfCounter size="sm">{swatch_data.value}</SfCounter>
                    </p>
                </SfListItem>
            ))}
        </SfAccordionItem>
    );
}
