const queryProductsAndIdwichList = `#graphql
query {
    wishlist {
        sharing_code
        items {
            id
            qty
            description
            added_at
            product {
                name
#                meta_description
                categories{
                    available_sort_by
                    breadcrumbs{category_level category_name  category_url_key category_url_path category_uid }
                    name
                    uid
                    url_path
                    url_suffix
                }
                ...on ConfigurableProduct{
                    configurable_options{
                        attribute_code

                        attribute_uid

                        label

                        position

                        uid

                        use_default
                        values{
                            label
                            swatch_data{
                                value
                            }
                            uid
                        }

                    }
                }

                sku
                image{
                    disabled
                    label
                    position
                    url
                }
#                rating_summary
                short_description{html}
#                small_image
               stock_status
                thumbnail{url}
               url_key
                
                price {
                    regularPrice {
                        amount {
                            currency
                            value
                        }
                    }
                }
            }
        }
        items_count
        updated_at
    }
}
`;




const queryIdRegion = `#graphql
query getCountry($id: String!) {
    country(id: $id) {
        available_regions {
            code
            id
            name
        }
        full_name_english
        full_name_locale
        id
        three_letter_abbreviation
        two_letter_abbreviation
    }
}
`;


const queryOrderHistory = `#graphql
query {
    customerOrders {
        items {

            carrier


            email

            grand_total
            id
            increment_id





            payment_methods{
                name
                type
                additional_data{
                    name
                    value
                }
            }
            shipments{
                id
                number
            }
            shipping_address{
                city
                company
                country_code
                firstname
                lastname
            }
            shipping_method
            status
            token
            total{
                base_grand_total{value currency}
                discounts{
                    label
                    amount{currency value}
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
}
`


export {
    queryProductsAndIdwichList,
    queryIdRegion,
    queryOrderHistory,
    test

}

export const APPLIED_COUPONS_FRAGMENT =`#graphql
fragment billing_address on CustomerOrder {
    billing_address {
        city
        company
        country_code
        fax
        firstname
        lastname
        middlename
        postcode
        prefix
        region
        region_id
        street
        suffix
        telephone
        vat_id
    }
}
`;
export const GIFT_MESSAGE =`#graphql
fragment gift_message on CustomerOrder {
    gift_message {
        from
        message
        to
    }
}
`
export const COMMENTS =`#graphql

fragment comments on CustomerOrder {
    comments {
        message
        timestamp
    }
}
`


const test = `#graphql
${APPLIED_COUPONS_FRAGMENT}, ${GIFT_MESSAGE} , ${COMMENTS}
query{
  
        customerOrders {
            items {
              
                carrier
                email
             ...gift_message
                ...comments
                grand_total
                id
                increment_id
                
                payment_methods{
                    name
                    type
                    additional_data{
                        name
                        value
                    }
                }
                shipments{
                    id
                    number
                }
                ...billing_address
                shipping_method
                status
                token
                total{
                    base_grand_total{value currency}
                    discounts{
                        label
                        amount{currency value}
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
        
    

}
`





//
// fragment comments on CustomerOrder {
//     comments {
//         message
//         timestamp
//     }
// }
//
// fragment credit_memos on CustomerOrder {
//     credit_memos {
//         comments {
//             message
//             timestamp
//         }
//         id
//         items {
//             discounts
//             id
//             order_item
//             product_name
//             product_sale_price
//             product_sku
//             quantity_refunded
//         }
//         number
//         total {
//             adjustment
//             base_grand_total
//             discounts
//             grand_total
//             shipping_handling
//             subtotal
//             taxes
//             total_shipping
//             total_tax
//         }
//     }
// }
//

//
// fragment invoices on CustomerOrder {
//     invoices {
//         comments {
//             message
//             timestamp
//         }
//         id
//         items {
//             discounts
//             id
//             order_item
//             product_name
//             product_sale_price
//             product_sku
//             quantity_invoiced
//         }
//         number
//         total {
//             base_grand_total
//             discounts
//             grand_total
//             shipping_handling
//             subtotal
//             taxes
//             total_shipping
//             total_tax
//         }
//     }
// }
//
// fragment items on CustomerOrder {
//     items {
//         discounts {
//             amount
//             applied_to
//             coupon
//             label
//         }
//         entered_options {
//             label
//             value
//         }
//         gift_message {
//             from
//             message
//             to
//         }
//         id
//         product {
//             activity
//             attribute_set_id
//             canonical_url
//             categories
//             category_gear
//             climate
//             collar
//             color
//             country_of_manufacture
//             created_at
//             crosssell_products
//             custom_attributesV2(filters: {})
//             description
//             eco_collection
//             erin_recommends
//             features_bags
//             format
//             gender
//             gift_message_available
//             id
//             image
//             manufacturer
//             material
//             media_gallery
//             media_gallery_entries
//             meta_description
//             meta_keyword
//             meta_title
//             name
//             new
//             new_from_date
//             new_to_date
//             only_x_left_in_stock
//             options_container
//             pattern
//             performance_fabric
//             price
//             price_range
//             price_tiers
//             product_links
//             rating_summary
//             related_products
//             review_count
//             reviews(pageSize: 20, currentPage: 1)
//             sale
//             short_description
//             size
//             sku
//             sleeve
//             small_image
//             special_from_date
//             special_price
//             special_to_date
//             stock_status
//             strap_bags
//             style_bags
//             style_bottom
//             style_general
//             swatch_image
//             thumbnail
//             tier_price
//             tier_prices
//             type_id
//             uid
//             updated_at
//             upsell_products
//             url_key
//             url_path
//             url_rewrites
//             url_suffix
//             websites
//         }
//         product_name
//         product_sale_price {
//             currency
//             value
//         }
//         product_sku
//         product_type
//         product_url_key
//         quantity_canceled
//         quantity_invoiced
//         quantity_ordered
//         quantity_refunded
//         quantity_returned
//         quantity_shipped
//         selected_options {
//             label
//             value
//         }
//         status
//     }
// }
//
//









