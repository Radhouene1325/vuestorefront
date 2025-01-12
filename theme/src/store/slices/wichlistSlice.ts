// store/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WichListState {
    wichListLength: number; // TypeScript typically uses lowercase number

    productsWichList:any;

}

const initialState: WichListState = {
    wichListLength: 0,
    productsWichList:[]
};

export const wichListSlice = createSlice({
    name: 'wichList',
    initialState,
    reducers: {
        wichListProductsLength: (state,action:PayloadAction) => {
            console.log(action.payload)
            state.wichListLength=action.payload;
        },
        wichListProducts:(state,action:PayloadAction) => {
            state.productsWichList=action.payload;
        },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },

        wichListDecrementLength:(state,action:PayloadAction) => {
            state.wichListLength -=1;
        },

        wichListDecrementProducts:(state,action:PayloadAction) => {
            state.productsWichList=state.productsWichList.filter((item:any)=>item.product.sku!==action.payload)
        },




    },
});

export const { wichListProductsLength, wichListProducts,wichListDecrementLength,wichListDecrementProducts } = wichListSlice.actions;
export default wichListSlice.reducer;
