// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {sdk} from "../../../sdk.config";
import {getCookie} from "cookies-next";
import jwt from 'jsonwebtoken';
import {serialize} from "cookie";

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
      const token = 'eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjksInV0eXBpZCI6MywiaWF0IjoxNzM2ODEwNzMyLCJleHAiOjE3MzY4MTQzMzJ9.OB8RQ1dM_G9Su3UXkPKgDPWTY6LyvL2QcKOFaaFn18A';

      // 2. Verify the token
      const decoded = jwt.decode(token, process.env.JWT_SECRET as string);
      console.log('decodecccccccccsssssssssssssssssssssssssssscccccccccccccccccd', decoded)

    const itemsCategoryHeader = await sdk.magento.categoryList();


    res.status(200).json({data: itemsCategoryHeader});

    if (!token) {
      // If the cookie has expired or doesn't exist, handle it here
      return res.status(401).json({ error: 'No token found. Please log in.' });
    }

    try {
        let JWT_SECRET = 'ewwecefawvaerv56r46aerv4a6w4vrva6r8ew4re'
        // 2. Verify the token
        const decoded = jwt.verify(token, JWT_SECRET as string);
        console.log('decodeccccccccccccccccccccccccccd', decoded)
        // If successful, `decoded` will contain your payload

        // e.g., { userId: '...', iat: 123, exp: 456 }

        // Continue with your protected logic



        // return res.status(200).json({data: 'Protected data', user: decoded});
    } catch (err) {
      // If the token is invalid or expired, you’ll get an error here
      res.setHeader(
          'Set-Cookie',
          serialize('auth-token', '', {
            httpOnly: true, // Prevent JavaScript access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Protect against CSRF
            path: "/", // Make cookie accessible across the site
            maxAge:0
          })
      );
      // return res.status(401).json({ error: 'Token invalid or expired.' });
    }

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
