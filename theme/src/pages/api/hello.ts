// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../sdk.config";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
  // const customQuery = {
  //       categories: 'categories-custom-query',
  //        metadata: {
  //             fields: ` items {  image       children {   image       include_in_menu          is_anchor          level          name          position          product_count          uid          url_key          url_path          url_suffix          children {            include_in_menu            is_anchor            level            name            position            product_count            uid            url_key            url_path            url_suffix            children {              include_in_menu              is_anchor              level              name              position              product_count              uid              url_key              url_path              url_suffix              children {                include_in_menu                is_anchor                level                name                position                product_count                uid                url_key                url_path                url_suffix              }            }          }        }        product_count  image      name        uid      }      page_info {        current_page        page_size        total_pages      }      total_count`
  //           }
  //      };



    // const {data: {cmsPage: pageData}, error, errors} = await sdk.magento.cmsPage({
    //   identifier: 'home',id:1
    // });
    // console.log("cms page",pageData)



    const itemsCategoryHeader = await sdk.magento.categoryList();
     res.status(200).json({ data: itemsCategoryHeader});
  } catch (error) {


    console.error('Direct fetch error:', error);
  }

}




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
