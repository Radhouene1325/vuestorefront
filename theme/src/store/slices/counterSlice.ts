// store/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {HYDRATE} from "next-redux-wrapper";
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
        deleteAdresseCustomer: (state, action: PayloadAction<number>) => {
            console.log('hello address customer in in slice ', action.payload)
            console.log('hello address customer in in slice ', state.adressescustomer)
            console.log('hello address customer in in slice ', action.payload)
            const data=state.adressescustomer.addresses.findIndex((item:any)=>item.id===action.payload)
            console.log('hello address customer in in slice ', data)
            if(data!==-1){
                state.adressescustomer.addresses.splice(data,1)
            }



        },

        pushAdresseCustomer: (state, action: PayloadAction) => {
            console.log('hello address customer in in slice ', action.payload.id)
            const data=state.adressescustomer.addresses.findIndex((item:any)=>item.id===action.payload.id)
            console.log('hello address customer in in slice ', data)
            if(data===-1){
                // state.adressescustomer=  state.adressescustomer.push(action.payload)
                 state.adressescustomer.addresses=[action.payload,...state.adressescustomer.addresses]
            }

        }


        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            // Assuming the reducer key in your store is "categorie":
            return {
                ...state,
                ...action.payload.counter,
            };
        });
    },

});

export const { openWichList, incrementByAmount,adressescustomer,deleteAdresseCustomer,pushAdresseCustomer } = counterSlice.actions;
export default counterSlice.reducer;
