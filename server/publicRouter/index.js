const login = require('./login')
const addUser = require('./addUser')
const getCategory = require('./getCategory')
const getCategoryList = require('./getCategoryList')
const getSubCategory = require('./getSubCategory')
const getSubCategoryList = require('./getSubCategoryList')
const getProduct = require('./getProduct')
const getProductList = require('./getProductList')
const getTotalNumOfProducts = require('./getTotalNumOfProducts')
const getProductDescription = require('./getProductDescription')
const getProductImages = require('./getProductImages')
const getProductSpecifications = require('./getProductSpecifications')
const getSlides = require('./getSlides')

module.exports = function usePublicRouter(router, data, tokenMap) {
  [
    login,
    addUser,
    getCategory,
    getCategoryList,
    getSubCategory,
    getSubCategoryList,
    getProduct,
    getProductList,
    getTotalNumOfProducts,
    getProductDescription,
    getProductImages,
    getProductSpecifications,
    getSlides,
  ].forEach(fn => fn(router, data, tokenMap))
}
