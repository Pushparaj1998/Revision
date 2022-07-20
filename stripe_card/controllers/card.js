const Card = require('../models/card');
const stripe = require('../services/stripe');

class CardController {
    constructor() {}

    async addCard(req, res) {
        try {
            console.log("req.body------------------>", req.body)
            let customer_id = await stripe.createCustomer(req.body.email);
            console.log("customer_id--------------------------------->", customer_id);
            const cards = await stripe.addCard(req.body.number, req.body.month, req.body.year, req.body.cvc, req.body.name, customer_id )
            if(cards == null) {
                return res.status(400).send({
                    success : false,
                    message : "Request Failed Kindly check card details",
                    error : "Stripe Error"
                })
            }
            let saveCard = {
                card_id: cards.id,
                number: +cards.last4,
                fingerprint: await cards.fingerprint,
                brand: cards.brand,
                exp_month: cards.exp_month,
                exp_year: cards.exp_year,
                name: cards.name,
                customer_id: customer_id,
                default: 0
            }
            const card = await new Card(saveCard).save();
            return res.status(200).json({ status: 200, success: true, message: "Card saved Successfully", data: card });
        } catch (error) {
            console.log('Error @addcard : ', error);
            return res.status(400).send({ status: 400, success: false, message: "error in add card", error: error.message });
        }
    }

    async buyNow(req, res) {
        try{
            const card = await Card.findOne({ _id : req.params.id });
            if(card) {
                const buy = await stripe.buyNow(req.body.amount, req.body.currency, card.customer_id, card.card_id, "Testing Purchase" );

                if(buy) {
                    return res.status(200).send({ status: 200, success: true, message: "Buy Successfully", data: buy });
                } else {
                    return res.status(400).send({ status: 400, success: false, message: "Details are not proper" });
                }
            } else {
                return res.status(200).send({ status:400, success: false, message: "Card Not Found"})
            }
        } catch(error) {
            console.log("Error @ buyNow :", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed at Buy", error: error.message });
        }
    }
}

module.exports = new CardController();