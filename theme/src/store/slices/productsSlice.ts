import {createSlice, PayloadAction} from '@reduxjs/toolkit';



export interface ProductsState {
    cartProducts:any
}


const initialState: ProductsState = {

    cartProducts:{}

}


const productsSlice = createSlice({

    name:'product',
    initialState,

    reducers:{
        cartProducts: (state,action:PayloadAction) => {
            state.cartProducts = action.payload
        }

    }
})

export const {cartProducts} = productsSlice.actions;
export default productsSlice.reducer;