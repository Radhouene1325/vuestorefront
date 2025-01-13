import { BASEURL } from "@/BASEURL/URL";
import axios from "axios";
const fetchHomePage = {
    HomePage:async()=>{

            try {
                const response = await fetch(`${BASEURL}/api/hello`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return data; // Return the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; // Rethrow the error for handling in the calling function
            }

    },


    NewProducts:async()=>{
        try{
            const response=await fetch(`${BASEURL}/api/newProducts/newProducts`);

            if(!response){
                throw new Error('Network response was not ok');
            }
            const data=await response.json();
            return data;

        }catch(error){
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }
    },

    ProductsByCategory:async(uid)=>{
        // console.log("urliskeyisher dssssssss",url_key)
        try{
            const response=await fetch(`${BASEURL}/api/productsCategory/productsCategories?uid=${uid}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },

            });

            if(!response){
                throw new Error('Network response was not ok');
            }
            const data=await response.json();
            // console.log("data",data)
            return data;

        }catch(error){
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }



    },
    ProductsDetails:async(sku:string)=>{

         // console.log("urliskeyisher dssssssss",sku)
        try{
            const response=await fetch(`${BASEURL}/api/productesdetails/productsdetails?sku=${sku}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },

            });

            if(!response){
                throw new Error('Network response was not ok');
            }
            const data=await response.json();
            console.log("data",data)
            return data;

        }catch(error){
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }



    },


    createEmptyCart:async(token:string)=>{

        // console.log("urliskeyisher dssssssss",sku)
        try{
            const response=await fetch(`${BASEURL}/api/createEmptyCart/createEmptyCart`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Cookie:token,
                },

            });

            if(!response){
                throw new Error('Network response was not ok');
            }
            const data=await response.json();
            console.log("data",data)
            return data;

        }catch(error){
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }



    },

    // cartProducts
    cartTotalQty:async(cartId:string,token:string):Promise<string>=>{

         console.log("urliskeyisher dssssssss",token)
        try{
            const response = await fetch(`${BASEURL}/api/cartTotalQty/cartTotalQty?cartId=${cartId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie:token,
                },
                credentials: 'include',  // This ensures cookies are sent with the request



            });

            if(!response){
                throw new Error('Network response was not ok');
            }
            const data=await response.json();
            console.log("data",data)
            return data;

        }catch(error){
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }
    },

    cartProducts:async(cartId:string,token):Promise<string>=>{

        // console.log("urliskeyisher dssssssss",cartId)
        try{
            const response=await fetch(`${BASEURL}/api/productsAuPanier/productsAuPanier?cartId=${cartId}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Cookie:token,
                },

            });

            if(!response){
                throw new Error('Network response was not ok');
            }
            const data=await response.json();
            console.log("data",data)
            return data;

        }catch(error){
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }
    },








    getAvailableCustomerPaymentMethods:async(token):Promise<string>=>{

        // console.log("urliskeyisher dssssssss",cartId)
        try{
            const response=await fetch(`${BASEURL}/api/getPaymentMethods/getPaymentMethods`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Cookie: `token=${token}`,
                },

            });

            if(!response){
                throw new Error('Network response was not ok');
            }
            const data=await response.json();
            console.log("data",data)
            return data;

        }catch(error){
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }
    },


    countries:async():Promise<string>=>{

        // console.log("urliskeyisher dssssssss",cartId)
        try{
            const response=await fetch(`${BASEURL}/api/country/country`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },

            });

            if(!response){
                throw new Error('Network response was not ok');
            }
            const data=await response.json();
            console.log("data",data)
            return data;

        }catch(error){
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }
    },


    regionId:async(url: string, { arg }:{arg:any})=>{

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arg),
            });

            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            return response.json(); // parse JSON response
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }

    },


    setShippingMethodsOnCart:async(url: string, { arg }:{arg:any})=>{
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arg),
            });

            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            return response.json(); // parse JSON response
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }
    },



    setBillingAddressOnCart: async ({
                                        city,
                                        country_code,
                                        default_billing,
                                        default_shipping,
                                        firstname,
                                        lastname,
                                        id,
                                        postcode,
                                        prefix,
                                        region,
                                        street,
                                        suffix,
                                        telephone,
                                        vat_id,
                                        cartId,
                                        token

                                    }: {
        city: string,
        country_code: string,
        default_billing: string,
        default_shipping: string,
        firstname: string,
        lastname: string,
        id: string,
        postcode: string,
        prefix: string,
        region: string,
        street: string,
        suffix: string,
        telephone: string,
        vat_id: string
        cartId: string
        token: string

    }): Promise<string> => {



        // console.log("urliskeyisher dssssssss",cartId)
        try {
            const response = await fetch(`${BASEURL}/api/setBillingAddressOnCart/setBillingAddressOnCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: `cartId=${cartId}; token=${token}`,
                },
                body: JSON.stringify({
                    city,
                    country_code,
                    default_billing,
                    default_shipping,
                    firstname,
                    lastname,
                    id,
                    postcode,
                    prefix,
                    region,
                    street,
                    suffix,
                    telephone,
                    vat_id
                }),


            });

            if (!response) {
                throw new Error('Network response was not ok');
            }
            const res = await response.json();
            console.log("data", res)
            return res;

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }
    },




    removeItemFromCart:async(url: string, { arg }:{arg:any})=>{

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arg),
            });

            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            return response.json(); // parse JSON response
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error for handling in the calling function
        }

    },


};

export default fetchHomePage;
