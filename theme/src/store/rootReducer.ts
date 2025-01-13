import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import counterReducer,{CounterState} from "@/store/slices/counterSlice";
import userReducer,{UserState} from "@/store/slices/userSlice";
import productsReducer,{ProductsState} from "@/store/slices/productsSlice";
import categorieReducer,{categorieSate} from "@/store/slices/categorieSlice"
import {persistReducer, REHYDRATE} from "redux-persist";
 // import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import wichlistReducer,{WichListState} from "@/store/slices/wichlistSlice";




// Combine your slice reducers
export const combinedReducer = combineReducers({
    counter: counterReducer,
    user:userReducer,
    categorie:categorieReducer,
    wichList:wichlistReducer,
    product:productsReducer,
});

// For TypeScript, define a type that matches your state shape
export interface RootState {
    counter: CounterState;
    user:UserState,
    categorie:categorieSate,
    wichList:WichListState,
    product:ProductsState,
}


const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};
const storage =
    typeof window !== 'undefined'
        ? createWebStorage('local')
        : createNoopStorage();
/**
 * A custom root reducer that intercepts HYDRATE
 * and merges the state from the server into the client store.
 */
export const rootReducer = (state: RootState | undefined, action: AnyAction): RootState => {
    console.log(action.type)
    if (action.type === HYDRATE) {
        // action.payload is the server state
        // state is the existing client state
console.log('action.payload')
        // Example approach: do a slice-by-slice merge
        console.log(state)
        console.log(action.payload)
        return {
            ...state,

            ...action.payload,
            counter: {
                ...state?.counter,
                ...action.payload?.counter,
            },
            user: {
                ...state?.user,
                ...action.payload?.user,
            },
            categorie: {
                ...state?.categorie,
                ...action.payload?.categorie,
            },
            wichList:{
                ...state?.wichList,
                ...action.payload?.wichList,
            },
            product:{
                ...state?.product,
                ...action.payload?.product,
            },
        };
    }
console.log('action.type second')
    // For all other actions, use the standard combined reducer
    return combinedReducer(state, action);
};

// Configure redux-persist on the root reducer
const persistConfig = {
    key: 'root',
    whitelist: ['categorie', 'user','counter','wichList','product'], // slices you want to persist
    storage: storage,
};

export default persistReducer<RootState>(persistConfig, rootReducer);

// A custom root reducer to handle HYDRATE
// export const rootReducer = (state: RootState | undefined, action: AnyAction) => {
//     if (action.type === HYDRATE) {
//         // Merge server state into the client state
//         return {
//             // ...state,           // keep existing state
//             // ...action.payload,  // apply delta from hydration
//             // or, to be more selective:
//             counter: {
//                 ...state.counter,
//                 ...action.payload.counter,
//             },
//
//             user: {
//                 ...state.user,
//                 ...action.payload.user,
//             },
//             categorie: {
//                 ...state,
//                 ...action.payload.categorie,
//             }
//         };
//     }
//     // Otherwise, return the combined normal reducers
//     return combinedReducer(state, action);
// };


// export default rootReducer;
