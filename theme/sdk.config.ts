//
// import {magentoModule} from "@vue-storefront/magento-sdk";
// import {initSDK, buildModule} from "@vue-storefront/sdk";
//
// // customLink.ts
// import { setContext } from '@apollo/client/link/context';
//
// export const customLink = setContext((_, { headers, ...context }) => {
//     if (!context || !context.graphqlnetworkf) {
//         // If it's missing, just return existing headers or provide defaults
//         return { headers };
//     }
//     // Otherwise, use or pass along `graphqlnetworkf`
//     return {
//         headers,
//         graphqlnetworkf: context.graphqlnetworkf,
//     };
// });
//
//
// const sdkConfig={
//     magento:buildModule(magentoModule,{
//         apiUrl: "http://localhost:8181/magento",
//         linkFactory: (httpLink) => customLink.concat(httpLink),
//     } )
// }
//
// export const sdk=initSDK(sdkConfig)

import { buildModule, initSDK } from '@vue-storefront/sdk';
import { magentoModule, MagentoModuleType } from '@vue-storefront/magento-sdk';

const sdkConfig = {
    magento: buildModule(magentoModule, {
        apiUrl: 'http://localhost:8181/magento',

        // ...magentoConfig.integrations.magento,
    }),

};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);