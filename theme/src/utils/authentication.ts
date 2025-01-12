import { BASEURL } from "@/BASEURL/URL";

const authenticationuser = {
    authentication:async(url: string, { arg }:{arg:any})=>{

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



    customerCart: async (customerToken: string)=>{
        try{
            const response=await fetch(`${BASEURL}/api/customerCart/customerCart`,{
                headers:{
                    'Content-Type':'application/json',
                    Cookie: `token=${customerToken}`,
                }
            });

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






};

export default authenticationuser;
