module.exports = {
    integrations: {
        magento: {
            customQueries: {
                'categories-custom-query': ({variables, metadata}) => ({
                    variables,
                    query: `
            query categories {
              categories {
                ${metadata.fields}
              }
            }
          `,
                }),
            },

        },

    },

};

