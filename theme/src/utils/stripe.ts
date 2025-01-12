import { BASEURL } from "@/BASEURL/URL";

// export  const stripePyament = {
//     stripePyaments:async(amount)=>{
//
//         try {
//             const response = await fetch(`${BASEURL}/api/chekoutstipe/chekoutstipe`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Cookie: `amount=${amount}`,
//                 },
//
//
//             });
//
//             if(!response){
//                 throw new Error('Network response was not ok');
//             }
//             const data=await response.json();
//             console.log("data",data)
//             return data;
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             throw error; // Rethrow the error for handling in the calling function
//         }
//
//     },
//
// };



export const stripePyament = {
    stripePyaments:async(url: string, { arg }:{arg:any})=>{

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