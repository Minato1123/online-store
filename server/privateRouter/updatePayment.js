const { defineRoute } = require('../utils')

module.exports = defineRoute((router, data) => {
  router.patch('/payment/:id', (ctx) => {
    const id = parseInt(ctx.params.id)
    const payment = ctx.request.body
    const paymentList = data.payment

    const thePayment = paymentList.find(item => item.id === id)

    if (thePayment.cardNumber !== '') {
      thePayment.cardNumber = payment.cardNumber
      thePayment.cardOwner = payment.cardOwner
      thePayment.cardValidDate = payment.cardValidDate
      thePayment.cardValidCode = payment.cardValidCode
    }
    else if (thePayment.bankCode !== '') {
      thePayment.bankCode = payment.bankCode
      thePayment.bankAccount = payment.bankAccount
    }

    ctx.response.body = {}
  })
})

