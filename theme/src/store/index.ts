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
// const createNoopStorage = () => {
//     return {
//         getItem(_key: string) {
//             return Promise.resolve(null);
//         },
//         setItem(_key: string, value: any) {
//             return Promise.resolve(value);
//         },
//         removeItem(_key: string) {
//             return Promise.resolve();
//         },
//     };
// };
// const storage =
//     typeof window !== 'undefined'
//         ? createWebStorage('local')
//         : createNoopStorage();

// const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
//     key: 'root', // key in storage
//     version: 1,
//     storage:storage,
//     // optional: specify which slice(s) to persist, e.g.
//     whitelist: ['categorie','user'], // only persist the counter slice
// //   blacklist: ['user'], // don't persist user slice
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const makeStore = () =>{
//   const store=  configureStore({
//         reducer: persistedReducer,
//       middleware: (getDefaultMiddleware) =>
//           getDefaultMiddleware({
//               serializableCheck: false
//           }),
//         // Optionally add devTools, middleware, etc.
//     });
//     // (store as any).__persistor = persistStore(store); // `persistStore` returns a Persistor
//     (store as any).__persistor = null; // Just set to null for now
//
//     return store;
// }

const makeConfiguredStore = (reducer) => {
    if (typeof window !== 'undefined') {
        // const persistConfig = {
        //     key: 'root',
        //     storage,
        //     // whitelist: ['cart'], // Specify which reducers you want to persist
        // };

        // const persistedReducer = persistReducer(persistConfig, reducer);

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
const makeStore = () => makeConfiguredStore(persistReducer);


// For TypeScript, define store types
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>

// Create the Next.js wrapper (with debug if desired)
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
