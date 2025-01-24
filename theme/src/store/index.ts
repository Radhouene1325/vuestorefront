// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import persistReducer from "@/store/rootReducer";
// import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import localForage from 'localforage';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import {thunk} from "redux-thunk";

localForage.config({
    name: 'myApp',
    storeName: 'persistedStore',
    driver: [
        localForage.INDEXEDDB,
        localForage.WEBSQL,
        localForage.LOCALSTORAGE,
    ],
});


const makeConfiguredStore = (reducer) => {
    if (typeof window !== 'undefined') {


        return configureStore({
            reducer: reducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    },
                }).concat(thunk),
        });
    } else {
        // On the server, don't persist
        return configureStore({
            reducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(thunk),
        });
    }
};

// Create a makeStore function
export const makeStore = () => makeConfiguredStore(persistReducer);


// For TypeScript, define store types
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>

// Create the Next.js wrapper (with debug if desired)
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
