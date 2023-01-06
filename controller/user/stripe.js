const SECRET_KEY=process.env.SECRET_KEY;
const stripe=require('stripe')(SECRET_KEY);

exports.payment=async(req,res)=>{
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            // line_items: req.body.items.map(item => {
            //   const storeItem = storeItems.get(item.id)
            //   return {
            //     price_data: {
            //       currency: "inr",
            //       product_data: {
            //         name: storeItem.name,
            //       },
            //       unit_amount: storeItem.priceInCents,
            //     },
            //     quantity: item.quantity,
            //   }
            // }),
            line_items:[
                {
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name:"Order Total",
                        },
                        unit_amount:100,
                    },
                    quantity:1,
                }
            ],
            success_url:"http://localhost:3000/success",
            cancel_url: 'http://localhost:3000/',
          })
           res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}