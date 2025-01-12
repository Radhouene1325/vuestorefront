import type { NextApiRequest, NextApiResponse } from "next";

import {sdk} from "../../../../sdk.config";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("this is in api present", req.query)
    // const uid = Array.isArray(req.query.url_key) ? req.query.url_key[0] : req.query.url_key;

    let {uid} = req.query;
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
            pageSize: 30,
            currentPage: 1,
                filter: {
                    category_uid: {
                        in: [uid as string]
                    },

                }
            },
            {customQuery}
        );


        console.log("this is result", result.data.categoryList)
        res.status(200).json({data: result});

    } catch (e) {
        throw e;
    }


};

