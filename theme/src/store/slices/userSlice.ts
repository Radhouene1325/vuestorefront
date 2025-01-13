// store/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {string} from "postcss-selector-parser";
import {HYDRATE} from "next-redux-wrapper";

export interface UserState {
    val: number; // TypeScript typically uses lowercase number
    products: any;
    cardLength:number
    varientLengthInCart:number

    auth:boolean,
    nameuser:string
}

const initialState: UserState = {
    val: 0,
    products: {},

    cardLength:0,
    varientLengthInCart:0,
    auth:false,
    nameuser:''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: (state, action: PayloadAction) => {
            return initialState; // Reset the slice to its initial state

        },

        inc: (state) => {
            state.val += 1;
        },
        dec: (state, action: PayloadAction<number>) => {
            state.val += action.payload;
        },

        addProductToCart: (state, action: PayloadAction<number>) => {
            console.log("action", action.payload)
            state.products = action.payload;
        },

        quantityCart: (state, action: PayloadAction<number>) => {
            console.log("action", action.payload)
            state.cardLength = action.payload;
        },

        quantitiyVarientIncart: (state, action: PayloadAction<number>) => {
            console.log("action", action.payload)
            state.varientLengthInCart = action.payload;
        },

        authntication: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload
        },


        usernamecustomer: (state, action: PayloadAction<string>) => {
            state.nameuser = action.payload;
        }

    },

    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            // Assuming the reducer key in your store is "categorie":
            return {
                ...state,
                ...action.payload.user,
            };
        });
    },
});


export const {authntication,resetState, dec, inc,addProductToCart,quantityCart,quantitiyVarientIncart,usernamecustomer } = userSlice.actions;


export const quantityVarientIncartSelector = (state:any) => state.user.varientLengthInCart;
export const quantityCartSelector = (state:any) => state.user.cardLength;
export const productsSelector = (state:any) => state.user.products;
export default userSlice.reducer;
