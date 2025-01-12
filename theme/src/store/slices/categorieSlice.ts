

import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import {HYDRATE} from "next-redux-wrapper";
export interface Category {
    name: string;
    product_count: number;
    uid: string;
    __typename: string;

    // Additional fields that are present in nested children
    include_in_menu?: number;
    is_anchor?: number;
    level?: number;
    position?: number;
    url_key?: string;
    url_path?: string;
    url_suffix?: string;

    // Recursively reference the same interface for sub-categories
    children: Category[];
}

export interface categorieSate {
    // The top-level array of categories
    items: Category[];
}

// Example of an initial state
const initialState: categorieSate = {
    items: [], // starts empty
};

const categorieSlice = createSlice({
    name:'categorie',
    initialState:initialState,
    reducers:{
        setHeaderCategories(state,action:PayloadAction<any>){
            console.log(action.payload)
            state.items = [action.payload,...state.items];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            // Assuming the reducer key in your store is "categorie":
            return {
                ...state,
                ...action.payload.categorie,
            };
        });
    },
})


export const {setHeaderCategories} = categorieSlice.actions;
export default categorieSlice.reducer;