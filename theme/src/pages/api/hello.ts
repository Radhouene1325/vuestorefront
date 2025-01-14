// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../sdk.config";
import {getCookie} from "cookies-next";
import jwt from 'jsonwebtoken';
import {serialize} from "cookie";
import {authMiddleware, middleware} from "../../../middleware/auth";
import {withMiddleware} from "../../../utils/withMiddleware";
import { parseCookies, setCookie, destroyCookie } from 'nookies';

 async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {


     const itemsCategoryHeader = await sdk.magento.categoryList();
//      const cookies = parseCookies({ req })
//      const token = cookies['auth-token']
// console.log("the tokensssssssssssssssssssssssssssssssssssssssssssswwwwwwwwwwwwwwwwwwwwwwwwwwwwww", token);
//      destroyCookie({ res }, 'auth-token', {
//          path: '/',
//      })


     res.status(200).json({data: itemsCategoryHeader});

}

export default withMiddleware(authMiddleware)(handler);



// export default `
//   query categories(
//     $filters: CategoryFilterInput,
//     $pageSize: Int,
//     $currentPage: Int
//   ) {
//     categories(
//       filters: $filters,
//       pageSize: $pageSize,
//       currentPage: $currentPage
//     ) {
//       items {
//         children {
//           include_in_menu
//           is_anchor
//           level
//           name
//           position
//           product_count
//           uid
//           url_key
//           url_path
//           url_suffix
//           children {
//             include_in_menu
//             is_anchor
//             level
//             name
//             position
//             product_count
//             uid
//             url_key
//             url_path
//             url_suffix
//             children {
//               include_in_menu
//               is_anchor
//               level
//               name
//               position
//               product_count
//               uid
//               url_key
//               url_path
//               url_suffix
//               children {
//                 include_in_menu
//                 is_anchor
//                 level
//                 name
//                 position
//                 product_count
//                 uid
//                 url_key
//                 url_path
//                 url_suffix
//               }
//             }
//           }
//         }
//         product_count
//         name
//         uid
//       }
//       page_info {
//         current_page
//         page_size
//         total_pages
//       }
//       total_count
//     }
//   }
// `;





// {
//     "name": "middleware-app",
//     "version": "0.1.0",
//     "license": "MIT",
//     "type": "module",
//     "scripts": {
//     "dev": "node middleware.js"
// },
//     "dependencies": {
//     "@vue-storefront/magento-api": "^2.7.0",
//         "@vue-storefront/magento-sdk": "^4.0.0",
//         "@vue-storefront/middleware": "^3.10.1",
//         "@vue-storefront/sdk": "^3.4.1",
//         "consola": "^3.1.0",
//         "cors": "^2.8.5"
// },
//     "devDependencies": {
//     "lerna": "^7.0.1"
// }
// }
