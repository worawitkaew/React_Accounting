import "./styles/theme.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import Expense from "./pages/Expense";
import Cashier from "./pages/Cashier";

import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products" element={<Products />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/cashier" element={<Cashier />} />
        <Route
          path="/products/:id"
          element={<ProductDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;