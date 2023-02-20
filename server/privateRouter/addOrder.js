const { defineRoute, getTimeStamp, getUserIdByToken } = require('../utils')

module.exports = defineRoute((router, data, tokenMap) => {
  router.post('/orders', (ctx) => {
    const userId = getUserIdByToken(ctx.request.headers['access-token'], tokenMap)
    const { orderData, boughtItems } = ctx.request.body
    const orderList = data.orders
    const boughtItemList = data.boughtItems

    const createdTime = getTimeStamp()
    const totalAmount = boughtItems.reduce((acc, item) => acc + item.amount, 0)
    const totalPrice = boughtItems.reduce((acc, item) => acc + item.price * item.amount, 0)

    const orderId = orderList.length > 0 ? orderList[orderList.length - 1].id + 1 : 1
    let boughtItemId = boughtItemList.length > 0 ? boughtItemList[boughtItemList.length - 1].id : 0

    const addedOrderData = {
      id: orderId,
      userId,
      serialNumber: `${Date.now()}`,
      status: 'prepared',
      paymentStatus: orderData.paymentType === 'cash-on-delivery' ? 'unpaid' : 'paid',
      totalAmount,
      totalPrice,
      deleted: false,
      purchaseTime: createdTime,
      ...orderData,
    }
    orderList.push(addedOrderData)

    const addedBoughtItems = boughtItems.map((item) => {
      return {
        id: ++boughtItemId,
        userId,
        orderId: addedOrderData.serialNumber,
        purchaseTime: createdTime,
        deleted: false,
        ...item,
      }
    })

    boughtItemList.push(...addedBoughtItems)

    ctx.response.body = {
      serialNumber: addedOrderData.serialNumber,
      status: addedOrderData.status,
      name: addedOrderData.name,
      mobile: addedOrderData.mobile,
      email: addedOrderData.email,
      county: addedOrderData.county,
      address: addedOrderData.address,
      paymentStatus: addedOrderData.paymentStatus,
      boughtItems: addedBoughtItems,
      totalAmount: addedOrderData.totalAmount,
      totalPrice: addedOrderData.totalPrice,
    }
  })
})

