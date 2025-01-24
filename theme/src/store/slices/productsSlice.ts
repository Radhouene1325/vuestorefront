import {createSlice, PayloadAction} from '@reduxjs/toolkit';



export interface ProductsState {
    cartProducts:any
    productsIsFiltered:any,
    productNoticate:any
    pagination:any,

    specificationNewProduct:any,
}


const initialState: ProductsState = {

    cartProducts:{},
    productsIsFiltered:[],

    productNoticate:{},
    pagination:{},
    specificationNewProduct:{},

}


const productsSlice = createSlice({

    name:'product',
    initialState,

    reducers:{
        cartProducts: (state: { cartProducts: any; },action:PayloadAction) => {
            state.cartProducts = action.payload
        },



        // cartProductsCategoriese: (state: { productsIsFiltered: any; },action:PayloadAction) => {
        //     state.productsIsFiltered = action.payload;
        // },

        cartProductsFiltred: (state: { productsIsFiltered: any; },action:PayloadAction) => {

            console.log(action.payload)
            if(Array.isArray(action.payload) && action.payload.length === 0){
                state.productsIsFiltered = [];
            }
            state.productsIsFiltered = action.payload;

        },

        paginationProducts: (state: {   pagination: any;  },action:PayloadAction) => {
            console.log(action.payload)
            if(Array.isArray(action.payload) && action.payload.length === 0){
                state.pagination = [];
            }
            state.pagination =action.payload;
        },

        notificateProduct: (state: { productNoticate: any; },action:PayloadAction) => {
            state.productNoticate=action.payload;
        },

        productSpecificate: (state: { specificationNewProduct: any; },action:PayloadAction) => {
            state.specificationNewProduct=action.payload;
        }

    }
})

export const {cartProducts,cartProductsFiltred,paginationProducts,notificateProduct,productSpecificate} = productsSlice.actions;
export default productsSlice.reducer;