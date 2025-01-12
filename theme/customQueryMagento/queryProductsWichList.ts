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




export {
    queryProductsAndIdwichList,
    queryIdRegion

}

