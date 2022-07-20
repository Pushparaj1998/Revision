const stripe = require('stripe')(process.env.STRIPE_SK);

var Stripe = {

    createCustomer: async function(email) {
        try {
            let customers = await stripe.customers.create({
                email: email,
                name: 'Jenny Rosen',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            });

            if (customers && customers.id) {
                return customers.id;
            } else {
                console.log("Error @ createCustomer : ", customers)
                return null;
            }
        } catch (error) {
            console.log("Error @ catch createCustomer : ", error)
            return null;
        }

    },


    addCard: async function(number, month, year, cvc, name, customer_id) {
        try {

            let token = await stripe.tokens.create({
                card: {
                    number: number,
                    exp_month: month,
                    exp_year: year,
                    cvc: cvc,
                    name: name
                },
            });

            if (token && token.id) {
                let card = await stripe.customers.createSource(customer_id, {
                    source: token.id
                });

                if (card && card.id) {
                    return card;
                } else {
                    console.log("Error @ addCard : ", card)
                    return null;
                }

            } else {
                return null;
            }
        } catch (error) {
            console.log("Error @ Catch addCard : ", error)
            return null;
        }
    },

    buyNow: async function(amount, currency, customer_id, card_id, description) {
        try {
            amount = parseFloat((amount * 100).toFixed(2))
            let txn = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                customer: customer_id,
                // card: card_id,
                description: description,
            });

            console.log(amount)

            if (txn && txn.id && txn.status == 'requires_payment_method') {
                return txn.id;
            } else {
                console.log("Error @ buyNow : ", txn)
                return null;
            }
        } catch (error) {
            console.log("Error @ Catch buyNow : ", error)
            return null;
        }

    },

    deleteCard: async function(customer_id, card_id) {
        try {
            let del = await stripe.customers.deleteSource(
                customer_id,
                card_id,
            );

            if (del && del.deleted == true) {
                return del.id;
            } else {
                console.log("Error @ deleteCard : ", del)
                return null;
            }
        } catch (error) {
            console.log("Error @ catch deleteCard : ", error)
            return null;
        }

    },

}

module.exports = Stripe;