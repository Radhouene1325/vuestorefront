import {createSlice, PayloadAction} from '@reduxjs/toolkit';



export interface ProductsState {
    cartProducts:any
    productsIsFiltered:any
}


const initialState: ProductsState = {

    cartProducts:{},
    productsIsFiltered:{}

}


const productsSlice = createSlice({

    name:'product',
    initialState,

    reducers:{
        cartProducts: (state,action:PayloadAction) => {
            state.cartProducts = action.payload
        },

        productsiltred: (state,action:PayloadAction) => {
            state.productsIsFiltered = action.payload;

        }

    }
})

export const {cartProducts} = productsSlice.actions;
export default productsSlice.reducer;