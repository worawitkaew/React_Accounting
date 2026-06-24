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
import SalesHistory from "./pages/SalesHistory";

import ProductDetail from "./pages/ProductDetail";
import CashDeposit
from "./pages/CashDeposit";
import CashDepositHistory
from "./pages/CashDepositHistory";

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
        <Route
          path="/transactions"
          element={<SalesHistory />}
        />
        <Route
          path="/cash-deposit"
          element={
            <CashDeposit />
          }
        />
        <Route
          path="/cash-deposit-history"
          element={
          <CashDepositHistory />
          }
        />
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;