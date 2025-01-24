import type { NextApiRequest, NextApiResponse } from "next";

import {sdk} from "../../../../sdk.config";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log("this is in api present", req.query)
    // // const uid = Array.isArray(req.query.url_key) ? req.query.url_key[0] : req.query.url_key;
     console.log( 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',  req.body)
    console.log( 'xasxasxsaxsaxsxsaxasxsaxscssacsacscacscascasxwdqwdwfqwfeqwfqweffwq',  Object.keys(req.body).length)
    // let {uid} = req.query;
    // console.log("this is uid", uid)
// let {color,material,size,climate} = req?.body?.valueselected;
// console.log("this is uid", color, material, size, climate)
    const arr = ['30_40', '50_60'];
    // const separated = req?.body?.valueselected?.price?.map((item: string) => item.split('_').map(Number))[0][0];
    // console.log('scdsssssssssssssssssssssssssssssssssssssssssssssss',  req?.body?.valueselected?.price?.map((item: string) => item.split('_').map(Number))[0][0]);

console.log("this is req.query", req?.query)


    // console.log("this is req.bodysssssssssssssssssssssswswww", req.body.valueselected.color.map((e)=>e ))
    try {
        // const index = await sdk.magento.route({url:"women.html"});
        // console.log("this is index",index)
        // const gql = ` children_count children {name uid} products { items { review_count rating_summary uid sku url_rewrites { url } name url_key url_suffix  thumbnail {url} } }`


        const customQuery = {
            categorySearch: 'products-custom-query',
            metadata: {

                fields: `  products {
                   
                
                     
                   
                   items {
                     description{html}
                     configurable_options{
                     attribute_uid
                     position
                     uid
                     use_default
                     attribute_code
                     label
                     values{
                     
                     label
                     swatch_data{
                     value
                     }
                     uid
                     }}
                     
                     

        uid
        sku
        name
        stock_status
        only_x_left_in_stock
        rating_summary
        thumbnail {
          url
          position
          disabled
          label
        }
        url_key
        url_rewrites {
          url
        }
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
          minimum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
        }
        categories {
        image
          uid
          name
          url_suffix
          url_path
          breadcrumbs {
            category_name,
            category_url_path
          }
        }
        review_count
        reviews {
          items {
            average_rating
            ratings_breakdown {
              name
              value
            }
          }
        }
        
        
        
        ... on GroupedProduct {
          items {
            product {
              sku
            }
          }
        }
        ... on ConfigurableProduct {
          variants {
            product {
              uid
              id
              color
              options{
              uid
            
              
              }
              sku
              size
              name
              only_x_left_in_stock
              price_range {
                minimum_price {
                  final_price {
                    currency
                    value
                  }
                  regular_price {
                    currency
                    value
                  }
                }
              }
              thumbnail {
                url
                position
                disabled
                label
              }
            }
          }
        }
        
      } 
       page_info {
        current_page
        page_size
        total_pages
      }
      total_count
      
      }
      `,

            },

        };


        const result = await sdk.magento.products({
                // pageSize: 60,
                // currentPage: req.body.selectedPage ? req.body.selectedPage : 1,
                filter: {
                    category_uid: {
                         in: [Object.keys(req.body).length > 0?req?.body?.uid:req.query.uid]
                        // in:['MjM=']
                    },
                    // price:{
                    //     from :'40',
                    //     to :'50'
                    // },
                    climate: {
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.climate?.map((e)=>e ) :null
                        // in: ['204', '208']
                    },
                    color:{
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.color?.map((e)=>e ) :null
                    },
                    material:{
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.material?.map((e)=>e ) :null
                    },
                    size:{
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.size?.map((e)=>e ) :null
                    },
                    new:{
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.new?.map((e)=>e ) :null
                    },
                    sale:{
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.sale?.map((e)=>e ) :null
                    },
                    pattern:{
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.pattern?.map((e)=>e ) :null
                    },
                    style_general:{
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.style?.map((e)=>e ) :null
                    },
                    erin_recommends:{
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.erin_recommends?.map((e)=>e ) :null
                    },
                    performance_fabric:{
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.performance_fabric?.map((e)=>e ) :null
                    },
                    style_bottom:{
                        in:Object?.keys(req.body).length > 0?req?.body?.valueselected?.style_bottom?.map((e)=>e ) :null
                    },
                    eco_collection:{
                        in:Object.keys(req.body).length > 0?req?.body?.valueselected?.eco_collection?.map((e)=>e ) :null
                    },
                    price:{
                        from: Object.keys(req.body).length > 0 &&req?.body?.valueselected?.price?.length>0 ? req?.body?.valueselected?.price?.map((item: string) => item.split('_').map(Number))[0][0] : null,
                        to: Object.keys(req.body).length > 0&&req?.body?.valueselected?.price?.length>0 ? req?.body?.valueselected?.price?.map((item: string) => item.split('_').map(Number))[0][1] : null
                    },



                }
            },
            {customQuery}
        );


        console.log("this is result", result)
        res.status(200).json({data: result});

    } catch (e) {
        throw e;
    }


};

