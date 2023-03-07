import login from './login'
import addUser from './addUser'
import getCategory from './getCategory'
import getCategoryList from './getCategoryList'
import getSubCategory from './getSubCategory'
import getSubCategoryList from './getSubCategoryList'
import getProduct from './getProduct'
import getProductList from './getProductList'
import getTotalNumOfProducts from './getTotalNumOfProducts'
import getProductDescription from './getProductDescription'
import getProductImages from './getProductImages'
import getProductSpecifications from './getProductSpecifications'
import getSlides from './getSlides'

export default function usePublicRouter(router, data, tokenMap) {
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
