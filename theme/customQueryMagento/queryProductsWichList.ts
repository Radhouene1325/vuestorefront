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
export const ITEMS =`#graphql

fragment items on CustomerOrder {
    items {
        discounts {
            amount{currency value}
            applied_to
            coupon{ code}
            label
        }
        entered_options {
            label
            value
        }
        gift_message {
            from
            message
            to
        }
        id
        product {
            activity
            attribute_set_id
            canonical_url
            categories{
                canonical_url
                children_count
                filter_price_range
                image
                include_in_menu
                is_anchor
                landing_page
                level
                meta_description
                path
                path_in_store
                url_key
                position
                product_count
                uid
                url_key
                url_path
                url_suffix
            }
            category_gear
            climate
            collar
            color
            country_of_manufacture
            created_at
            
            custom_attributesV2{
                errors{message type}
                items{code}
            }
            description{html}
            eco_collection
            erin_recommends
            features_bags
            format
            gender
            gift_message_available
            id
            image{url}
            manufacturer
            material
            media_gallery{label position url disabled}
           
            meta_description
            meta_keyword
            meta_title
            name
            new
            new_from_date
            new_to_date
            only_x_left_in_stock
            options_container
            pattern
            performance_fabric
#            price{
#                maximalPrice {
#                    adjustments {
#                        amount{currency value}
#                        code{
#                            TAX
#                            WEEE
#                            WEEE_TAX
#                        }
#                        description{
#                            INCLUDED
#                            EXCLUDED
#                        }
#                    }
#                    amount{currency value}
#                }
#                regularPrice {
#                    adjustments {
#                        amount{currency value}
#                        code{
#                            TAX
#                            WEEE
#                            WEEE_TAX
#                        }
#                        description{
#                            INCLUDED
#                            EXCLUDED
#                        }
#                    }
#                    amount{currency value}
#                }
#                minimalPrice {
#                    adjustments {
#                        amount{currency value}
#                        code{
#                            TAX
#                            WEEE
#                            WEEE_TAX
#                        }
#                        description{
#                            INCLUDED
#                            EXCLUDED
#                        }
#                    }
#                    amount{currency value}
#                }
#            }
            price_range{
                maximum_price{discount{amount_off percent_off }final_price{currency value} fixed_product_taxes{amount{currency value}label } regular_price{currency value}  }
                maximum_price{discount{amount_off percent_off }final_price{currency value} fixed_product_taxes{amount{currency value}label } regular_price{currency value} }

            }
            price_tiers{
                discount{amount_off percent_off }final_price{currency value} quantity
            }
            product_links{link_type linked_product_sku linked_product_type sku position}
            rating_summary
           
            review_count
           
            sale
           
            size
            sku
            sleeve
           
            special_from_date
            special_price
            special_to_date
            
            strap_bags
            style_bags
            style_bottom
            style_general
            swatch_image
            thumbnail{url}
            tier_price
            tier_prices{customer_group_id qty website_id value percentage_value}
            type_id
            uid
            updated_at
#            upsell_products
            url_key
            url_path
            url_rewrites{
                parameters {
                    name value
                }
                url
            }
            url_suffix
            websites{
                code
                default_group_id
                id
                is_default
                name
                sort_order
            }
        }
        product_name
        product_sale_price {
            currency
            value
        }
        product_sku
        product_type
        product_url_key
        quantity_canceled
        quantity_invoiced
        quantity_ordered
        quantity_refunded
        quantity_returned
        quantity_shipped
        selected_options {
            label
            value
        }
        status
    }
}
`


 const customerOrdersQuery = `#graphql
${APPLIED_COUPONS_FRAGMENT}, ${GIFT_MESSAGE} , ${COMMENTS},${ITEMS}
query{

        customerOrders {
            items {

                carrier
                email
             ...gift_message
                ...comments
                ... items
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




const BILLINGdRESS =`#graphql
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
`





const SHIPPINGMETHODE = `#graphql
fragment shipiingmethode on CustomerOrder {
    shipping_method
}
`;

const SHIPMENTS =`#graphql

fragment shipments on CustomerOrder {
    shipments {
        comments {
            message
            timestamp
        }
        id
        items {
            id
            order_item{
                discounts{amount{currency value} coupon{code} label }
                entered_options{value label}
                gift_message{from to message}
                id
                product_name
                product_sale_price{currency value}product_sku quantity_canceled quantity_shipped



            }
            product_name
            product_sale_price{currency value}
            product_sku
            quantity_shipped
        }
        number
        tracking {
            carrier
            number
            title
        }
    }
}


`

const SHIPPINGdRESS =`#graphql    
fragment shippingDress on CustomerOrder {
    shipping_address {
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
`


const queryPayments= `#graphql
${BILLINGdRESS},${SHIPPINGdRESS},${SHIPPINGMETHODE},${SHIPMENTS}
mutation placeOrder($input: PlaceOrderInput!) {
    placeOrder(input:$input) {
        errors {
            code
            message
        }
        order {
            
            order_id
            order_number
        }
        orderV2 {

         ...billing_address
            carrier

            created_at

            email
            gift_message {
                from
                message
                to
            }
            grand_total
            id
            increment_id

            items {
                discounts {
                    amount{currency value}
                    applied_to
                    coupon{ code}
                    label
                }
                entered_options {
                    label
                    value
                }
                gift_message {
                    from
                    message
                    to
                }
                id
                product {
                    activity
                    attribute_set_id
                    canonical_url
                    categories{
                        canonical_url
                        children_count
                        filter_price_range
                        image
                        include_in_menu
                        is_anchor
                        landing_page
                        level
                        meta_description
                        path
                        path_in_store
                        url_key
                        position
                        product_count
                        uid
                        url_key
                        url_path
                        url_suffix
                    }
                    category_gear
                    climate
                    collar
                    color
                    country_of_manufacture
                    created_at

                    custom_attributesV2{
                        errors{message type}
                        items{code}
                    }
                    description{html}
                    eco_collection
                    erin_recommends
                    features_bags
                    format
                    gender
                    gift_message_available
                    id
                    image{url}
                    manufacturer
                    material
                    media_gallery{label position url disabled}

                    meta_description
                    meta_keyword
                    meta_title
                    name
                    new
                    new_from_date
                    new_to_date
                    only_x_left_in_stock
                    options_container
                    pattern
                    performance_fabric

                    price_range{
                        maximum_price{discount{amount_off percent_off }final_price{currency value} fixed_product_taxes{amount{currency value}label } regular_price{currency value}  }
                        maximum_price{discount{amount_off percent_off }final_price{currency value} fixed_product_taxes{amount{currency value}label } regular_price{currency value} }

                    }
                    price_tiers{
                        discount{amount_off percent_off }final_price{currency value} quantity
                    }
                    product_links{link_type linked_product_sku linked_product_type sku position}
                    rating_summary

                    review_count

                    sale

                    size
                    sku
                    sleeve

                    special_from_date
                    special_price
                    special_to_date

                    strap_bags
                    style_bags
                    style_bottom
                    style_general
                    swatch_image
                    thumbnail{url}
                    tier_price
                    tier_prices{customer_group_id qty website_id value percentage_value}
                    type_id
                    uid
                    updated_at
                    #            upsell_products
                    url_key
                    url_path
                    url_rewrites{
                        parameters {
                            name value
                        }
                        url
                    }
                    url_suffix
                    websites{
                        code
                        default_group_id
                        id
                        is_default
                        name
                        sort_order
                    }
                }
                product_name
                product_sale_price {
                    currency
                    value
                }
                product_sku
                product_type
                product_url_key
                quantity_canceled
                quantity_invoiced
                quantity_ordered
                quantity_refunded
                quantity_returned
                quantity_shipped
                selected_options {
                    label
                    value
                }
                status
            }
            number
            order_date
            order_number

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
            ...shippingDress
            ...shipiingmethode
            ...shipments
        }
    }
}


`




export {
    queryProductsAndIdwichList,
    queryIdRegion,
    queryOrderHistory,
    customerOrdersQuery,
    queryPayments,


}







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



//









