
export const WichList = {
    addProductsToWichList:async(url: string, { arg }:{arg:any})=>{

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

   removeProductsToWichList:async(url: string, { arg }:{arg:any})=>{

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