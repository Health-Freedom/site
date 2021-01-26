module.exports = {
    client: {
        service: {
            name: 'strapi_site',
            url: 'https://strapi.yrtestingdomainfor.info/graphql',
            skipSSLValidation: true
        },
        includes: [
            'scully.green-client.config.ts',
            'src/**/*.ts'
        ]
    }
};

