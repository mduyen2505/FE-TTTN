

const BASE_URL = "http://localhost:3000/api";

export const CATEGORIES = `${BASE_URL}/types`;
export const SUBCATEGORIES = `${BASE_URL}/subcategories`; 
export const BRANDS = `${BASE_URL}/brands`; 
export const API_CART = `${BASE_URL}/carts`;
export const WISHLIST = `${BASE_URL}/users/wishlist`;



export const FEATURED_PRODUCTS = `${BASE_URL}/products/featured?limit=8`;
export const ALL_PRODUCTS = `${BASE_URL}/products`;
export const getProductsByCategory = (categoryId) => 
    `${BASE_URL}/products/bytypes/${categoryId}`;

export const getProductsBySubcategory = (subCategoryId) => 
    `${BASE_URL}/products/subcategory/${subCategoryId}`;

export const getProductsbyBrand = (brandId) => 
    `${BASE_URL}/products/brands/${brandId}`;

export const getBrandDetails = (brandId) => 
    `${BASE_URL}/brands/${brandId}`;

export const getCoupons = `${BASE_URL}/coupons`;
export const getProductDetails = (productId) => 
    `${BASE_URL}/products/types/${productId}`;
export const REGISTER_USER = `${BASE_URL}/users/register`;
export const LOGIN_USER = `${BASE_URL}/users/login`;   
export const GOOGLE_LOGIN = `${BASE_URL}/users/auth/google`; 
export const VERIFY_OTP = `${BASE_URL}/users/verify-otp`; 

export const GET_CART = `${BASE_URL}/carts`;
export const DELETE_CART_ITEM = (productId) => `${BASE_URL}/carts/${productId}`; 
export const CLEAR_CART = `${BASE_URL}/carts`; 

export const ORDER_API = `${BASE_URL}/orders`;
export const getOrderDetails = (orderId) => `${ORDER_API}/${orderId}`; 

export const UPDATE_CART = `${BASE_URL}/carts/update`;

export const GET_USER_INFO = `${BASE_URL}/users`; 
export const UPDATE_USER_INFO = `${BASE_URL}/users`; 

export const COUPONS_API = `${BASE_URL}/coupons`;
export const CHECK_COUPON_API = `${BASE_URL}/coupons/check-coupon`;
export const MOMO_PAYMENT_API = `${BASE_URL}/payments`; 
export const UPDATE_PAYMENT_STATUS = `${BASE_URL}/payments/momo-ipn`; 

//blog trang home 
export const GET_BLOB = `${BASE_URL}/blogs`; 

export const FORGOT_PASSWORD = `${BASE_URL}/users/forgot-password`; 

export const RESET_PASSWORD = `${BASE_URL}/users/reset-password`; 
export const DELETE_USER_ACCOUNT = `${BASE_URL}/users/me`; 








