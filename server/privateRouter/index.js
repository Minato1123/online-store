import deleteUser from './deleteUser'
import getCurrentUser from './getCurrentUser'
import updateUser from './updateUser'
import addProductToCart from './addProductToCart'
import deleteProductInCart from './deleteProductInCart'
import getProductListInCartByUserId from './getProductListInCartByUserId'
import getTotalNumOfProductInCartByUserId from './getTotalNumOfProductInCartByUserId'
import updateProductInCart from './updateProductInCart'
import addProductToFollowing from './addProductToFollowing'
import deleteProductInFollowing from './deleteProductInFollowing'
import getProductListInFollowingByUserId from './getProductListInFollowingByUserId'
import getOrder from './getOrder'
import addOrder from './addOrder'
import getProductListInBought from './getProductListInBought'
import addPayment from './addPayment'
import deletePayment from './deletePayment'
import getPayment from './getPayment'
import getPaymentByUserId from './getPaymentByUserId'
import updatePayment from './updatePayment'
import logout from './logout'

export default function usePrivateRouter(router, data, tokenMap) {
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
    addPayment,
    deletePayment,
    getPayment,
    getPaymentByUserId,
    updatePayment,
    logout,
  ].forEach(fn => fn(router, data, tokenMap))
}
