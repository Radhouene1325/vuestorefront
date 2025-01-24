import ProductCard from "@/components/categories/productsCart/ProductsCart";
import React, {useMemo, useState} from "react";
import {
    SfButton,
    SfCounter,
    SfIconFavorite,
    SfIconShoppingCart,
    SfLink,
    SfListItem,
    SfRating, useDisclosure


} from "@storefront-ui/react";

import SfList from '@storefront-ui/react';


import {useSelector} from "react-redux";
import {RootState} from "@/store";
import useSWRMutation from "swr/mutation";
import {BASEURL} from "@/BASEURL/URL";
import authenticationuser from "@/utils/authentication";
import {deleteAdresseCustomer} from "@/store/slices/counterSlice";
import {useDispatch} from "react-redux";
import NewAdreses from "@/components/accountuser/adreseesuser/addnewadreses";
import {Country} from "@vue-storefront/magento-types";

interface AdressesProps {
    countries?: Country[]
}

const Adresses = ({countries}: {countries: Country[]}) => {
    const adressCustomer = useSelector((state: RootState) => state?.counter?.adressescustomer)
    // console.log(adressCustomer.addresses)
    const [addressid, setAdressid] = React.useState<number>(0)
    const dispatch = useDispatch()
    const {trigger, data, error, isMutating} = useSWRMutation(
        `${BASEURL}/api/removeItemfromTowichList/removeItemfromTowichList`,
        authenticationuser.authentication
    )

    console.log(data?.data?.data?.deleteCustomerAddress)
    const handelDelete = async (id: React.Key | null | undefined) => {

        try {
            await trigger(id);
            setAdressid(id !== undefined && id !== null ? Number(id) : 0)

            console.log('dddddddddddddddddddddddddd', id)

            // return  adressCustomer.addresses.filter((item)=>item.id!==id)
        } catch (e) {
            throw e
        } finally {
            console.log('hellossssssssssssss', id)
        }

    }

    useMemo<void>(async () => {
        console.log(addressid)
        if (data?.data?.data?.deleteCustomerAddress === true) {
            await dispatch(deleteAdresseCustomer(addressid))
        }

    }, [data])
//     const {isOpen, open, close} = useDisclosure({initialValue: true});
// console.log(isOpen)
    const [open,setOpen]=React.useState(false)
    const handelOpen = () => {
    setOpen(!open)
    }
const [updateAdress, setUpdateAdress] = React.useState<Record<string, string> & { lastname?: string; useAsShippingAddress?: boolean; aptNo?: string; street?: string; city?: string; zipCode?: string; telephone?: string; country?: string; firstname?: string }>({})
    const[idAdress,setIdAdress]=React.useState<number>(0)
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModel=()=>setIsOpen(false)

    const handelSelectAdress=async (id:number)=>{
        console.log(id)
        setIdAdress(id)
        const adress = adressCustomer?.addresses?.filter((item: { id: number; }) => item.id === id);
        setUpdateAdress(adress[0])
    }
    return (
        <>

            <div className="p-4">
                <SfButton className="mb-4" onClick={handelOpen}>
                    {open?'close' :'Add New Address'}
                </SfButton>

                {/* Storefront UI List */}
                <NewAdreses open={open} setOpen={setOpen} updateAdress={updateAdress} countries={countries as Country[]} idAdress={idAdress} openModal={openModal} setIsOpen={setIsOpen} isOpen={isOpen} closeModel={closeModel} close={() => setIsOpen(false)} firstname={updateAdress.firstname || ''} />
                {!open&&adressCustomer?.addresses?.map((item: { id: React.Key | null | undefined; firstname: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; lastname: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; street: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; region: { region: any; }; country_code: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; telephone: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
                    <SfListItem
                        key={item.id}
                        className="mb-2 p-4 border border-neutral-200 rounded-md hover:shadow-lg transition-shadow"
                    >
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                            <div>
                                <p className="font-semibold text-base sm:text-lg">
                                    {item.firstname} {item.lastname}
                                </p>
                                <p className="text-sm text-neutral-700 mt-1">
                                    <strong>Street:</strong> {item.street}
                                    {item.region?.region ? `, ${item.region.region}` : ''}
                                </p>
                                <p className="text-sm text-neutral-700 mt-1">
                                    <strong>Country:</strong> {item.country_code}
                                </p>
                                <p className="text-sm text-neutral-700 mt-1">
                                    <strong>Telephone:</strong> {item.telephone}
                                </p>
                            </div>
                            <div className="mt-2 sm:mt-0 sm:text-right gap-2">
                                <SfButton
                                    size="sm"
                                    variant="secondary"

                                    onClick={async () => {
                                        await handelDelete(item.id);
                                    }}
                                >
                                    remove
                                </SfButton>
                                <SfButton
                                    size="sm"
                                    variant="secondary"

                                    onClick={async () => {
                                        if (typeof item.id === 'number') {
                                            await handelSelectAdress(item.id);
                                            openModal();
                                        }
                                    }}
                                >
                                    update
                                </SfButton>
                            </div>
                        </div>
                    </SfListItem>
                ))}

            </div>


        </>
        // <div>
        //     <SfButton className='p-4 border-t border-neutral-200'>Add New Adress</SfButton>
        //
        //     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        //         {adressCustomer.addresses?.map((item:string,index:number) => (
        //             <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]" key={index} >
        //
        //
        //                 <div className="p-4 border-t border-neutral-200">
        //                     <div className="relative">
        //
        //                         <SfButton
        //                             variant="tertiary"
        //                             size="sm"
        //                             square
        //                             // style={{backgroundColor: productsWichList?.some((item) => item.product.sku === sku) === true ? "#000000" : "#ffffff"}}
        //                             className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
        //                             aria-label="Add to wishlist"
        //                         >
        //                             <SfIconFavorite size="sm"
        //                                 //                 onClick={async () => {
        //                                 //     await HandelSubmit(sku)
        //                                 // }}
        //                             />
        //                         </SfButton>
        //                     </div>
        //                     <SfLink href="#" variant="secondary" className="no-underline">
        //
        //                       <strong>Nome</strong> : {item.firstname} {item.lastname}
        //                     </SfLink>
        //                     <div className="flex items-center pt-1">
        //                        street: {item.street},{item?.region?.region}
        //
        //                         <SfLink href="#" variant="secondary" className="pl-1 no-underline">
        //                             <SfCounter size="xs">{123}</SfCounter>
        //                         </SfLink>
        //                     </div>
        //                    <strong> country</strong>:{item.country_code}
        //
        //                     <span className="block pb-2 font-bold typography-text-lg"> telephone:{item.telephone} </span>
        //                     <SfButton
        //                             onClick={(async() => {
        //                                await handelDelete(item.id)
        //                         })}
        //                         size="sm" slotPrefix={<SfIconShoppingCart size="sm"/>}>
        //                         delete
        //                     </SfButton>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
}


export default Adresses;