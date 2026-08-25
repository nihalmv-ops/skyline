import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}

          />

          <Route
  path="/products/:id"
  element={<ProductDetails />}
/>

<Route
  path="/cart"
  element={<Cart />}
/>

<Route
  path="/wishlist"
  element={<Wishlist />}
/>

<Route
  path="/checkout"
  element={<Checkout />}
/>

<Route
  path="/order-success"
  element={<OrderSuccess />}
/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;