// store/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// export interface AddressCustomer {
//     id: number;              // Example: Unique identifier for the address
//     street: string;          // Example: Street name of the address
//     city: string;            // Example: City of the address
//     postalCode: string;      // Example: Postal code/ZIP
//     country: string;         // Example: Country
//     [key: string]: any;      // Optional: To allow additional properties from the server
// }
export interface CounterState {
    value: boolean; // TypeScript typically uses lowercase number
    // adressescustomer: AddressCustomer[]; // Array of addresses of type AddressCustomer

    adressescustomer:any;
}

const initialState: CounterState = {
    value: false,
    adressescustomer:{}
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        openWichList: (state: { value: any; }, action: PayloadAction<boolean>) => {
            console.log(action.payload)
            state.value = action.payload;
        },

        adressescustomer: (state, action: PayloadAction) => {

            state.adressescustomer = action.payload;
        },
        deleteAdresseCustomer: (state, action: PayloadAction) => {
            console.log('hello address customer in in slice ', action.payload)
            console.log('hello address customer in in slice ', state.adressescustomer)
            state.adressescustomer=state.adressescustomer?.addresses?.filter((item:any)=>item.id!==action.payload)


            // return state.adressescustomer?.addresses?.addresses.filter((item: any) => item.id !== action.payload);

        }


        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },

});

export const { openWichList, incrementByAmount,adressescustomer,deleteAdresseCustomer } = counterSlice.actions;
export default counterSlice.reducer;
