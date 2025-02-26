import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import LoginPage from './Pages/auth/Login';
import SubCategoryPage from './Pages/SubCategory/SubCategory';
import Promo from './Pages/Promotion/Promotion';
import MenuPage from './Pages/Menu/MenuPage';
import CategoryPage from './Pages/Category/CategoryPage';
import ProductsbyBrand from './Pages/ProductsbyBrand/ProductsbyBrand';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import SignUpPage from './Pages/Register/register';
import CartPage from './Pages/Cart/CartPage';
import WishlistPage from './Pages/Wishlist/WishlistPage';
import OrderPage from './Pages/Order/OrderPage';
import AccountPage from './Pages/Account/AccountPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/subcategory/:subCategoryId" element={<SubCategoryPage />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/category/:typeId" element={<CategoryPage />} />
        <Route path="/brand/:brandId" element={<ProductsbyBrand />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />  
        <Route path="/order" element={<OrderPage />} />  
        <Route path="/account" element={<AccountPage />} />  




      </Routes>
    </BrowserRouter>
  );
}

export default App;