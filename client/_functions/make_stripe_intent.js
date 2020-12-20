import { Stripe } from "stripe";
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = new Stripe('sk_test_51HRMSVJQNVhbDx2a5JrTaKPjDx8FqlUKjtHdOJby4759RtEgrMIpByL8uZnLfKRwAZLGG4Omqo6K5qjOhZMkuWRp00679co7wP', {
    apiVersion: "2020-08-27"
});
exports.handler = async function (event) {
    const amount = parseFloat(event.queryStringParameters?.amount ?? '');
    if (amount == NaN || amount < 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'Invalid amount'
            })
        };
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Donation',
                    },
                    unit_amount_decimal: amount.toFixed(10)
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://www.yrtestingdomainfor.info/donate/success',
        cancel_url: 'https://example.com/donate',
    });
    return {
        statusCode: 200,
        body: JSON.stringify({
            id: session.id
        })
    };
};
//# sourceMappingURL=index.js.map