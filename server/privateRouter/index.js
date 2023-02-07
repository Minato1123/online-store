const deleteUser = require('./deleteUser')
const getCurrentUser = require('./getCurrentUser')
const updateUser = require('./updateUser')
const addProductToCart = require('./addProductToCart')
const deleteProductInCart = require('./deleteProductInCart')
const getProductListInCartByUserId = require('./getProductListInCartByUserId')
const getTotalNumOfProductInCartByUserId = require('./getTotalNumOfProductInCartByUserId')
const updateProductInCart = require('./updateProductInCart')
const addProductToFollowing = require('./addProductToFollowing')
const deleteProductInFollowing = require('./deleteProductInFollowing')
const getProductListInFollowingByUserId = require('./getProductListInFollowingByUserId')
const getOrder = require('./getOrder')
const addOrder = require('./addOrder')
const getProductListInBought = require('./getProductListInBought')
const logout = require('./logout')

module.exports = function usePrivateRouter(router, data, tokenMap) {
  [
    deleteUser,
    getCurrentUser,
    updateUser,
    addProductToCart,
    deleteProductInCart,
    getProductListInCartByUserId,
    getTotalNumOfProductInCartByUserId,
    updateProductInCart,
    addProductToFollowing,
    deleteProductInFollowing,
    getProductListInFollowingByUserId,
    getOrder,
    addOrder,
    getProductListInBought,
    logout,
  ].forEach(fn => fn(router, data, tokenMap))
}
