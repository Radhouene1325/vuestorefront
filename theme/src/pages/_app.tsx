// import "@/styles/globals.css"
//
// import type { ReactElement, ReactNode } from 'react'
// import type { NextPage } from 'next'
// import type { AppProps } from 'next/app'
// import Layout from "@/components/layout/layout";
// import {ThemeProvider} from "@/context/GlobalContext";
// import {wrapper} from "@/store";
// import {Provider} from "react-redux";
//
// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout?: (page: ReactElement,pageProps:P) => ReactNode
// }
//
// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout
// }
//
//  function MyApp({ Component, pageProps }: AppPropsWithLayout) {
//   // Default layout wrapping
//
//      const getLayout = Component.getLayout || ((page) =>
//          <ThemeProvider> <Layout>{page}</Layout></ThemeProvider>
//
//      );
//
//      return getLayout(
//              <Component {...pageProps} />,pageProps
//      );
// }
//
// export default wrapper.withRedux(MyApp);

import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/layout";
import { ThemeProvider } from "@/context/GlobalContext";
import { Provider } from "react-redux"; // We manually import Provider now
import { wrapper } from "@/store";
import localForage from 'localforage';
import { persistStore } from 'redux-persist';

import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement, pageProps: P) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const PersistGate=dynamic(
    () => import('redux-persist/integration/react').then((mod)=>mod.PersistGate),
    { ssr: false,loading:()=><div>........</div> }

)

function MyApp({ Component, ...rest }: AppPropsWithLayout) {
    console.log(PersistGate)
    const { store, props } = wrapper.useWrappedStore(rest);

    const [persistor, setPersistor] = useState<any>(null);

    useEffect(() => {
        // Create persistor client-side
        const _persistor = persistStore(store);
        (store as any).__persistor = _persistor;
        setPersistor(_persistor);
    }, [store]);
console.log(persistor)
    // 1. Extract the store and final props from wrapper.useWrappedStore()

    // 2. Layout retrieval
    const getLayout =
        Component.getLayout ??
        ((page) => (
            <ThemeProvider>
                <Layout>{page}</Layout>
            </ThemeProvider>
        ));

    const PageContent =  (
        // <PersistGate  persistor={store.__persistor}>
            <Component {...props.pageProps} />
        // </PersistGate>
    )
    // 3. Wrap your component in <Provider store={store}> for Redux
    return (
        <Provider store={store}>

            {getLayout(PageContent, props.pageProps)}
        </Provider>
    );
}

// 4. Export MyApp (no more wrapper.withRedux)
export default MyApp;

