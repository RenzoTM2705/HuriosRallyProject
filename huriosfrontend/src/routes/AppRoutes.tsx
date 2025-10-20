// src/routes/AppRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { VerifyEmail } from "../pages/VerifyEmail";
import { ResetPassword } from "../pages/ResetPassword";
import { NewPassword } from "../pages/NewPassword";
import  Products  from "../pages/Products";
import { About } from "../pages/About";
import  ProductsDetails  from "../pages/ProductsDetails";
import { Cart } from "../pages/Cart";
import { CartProvider } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";
/*
  AppRoutes instrumentado:
   - muestra en pantalla (y en consola) la location actual
   - incluye ruta catch-all para ver qué path están pidiendo exactamente
*/

function LocationDebugger() {
  const loc = useLocation();
  // imprime en consola cada vez que cambia la ubicación
  console.log("[Router] location changed:", loc);
  return (
    <div style={{ position: "fixed", right: 8, bottom: 8, zIndex: 9999 }}>
      <div style={{ background: "rgba(0,0,0,0.6)", color: "white", padding: "6px 8px", borderRadius: 6, fontSize: 12 }}>
        <div><strong>path:</strong> {loc.pathname}</div>
        <div><strong>search:</strong> {loc.search}</div>
      </div>
    </div>
  );
}

const AppRoutes: React.FC = () => (
  <CartProvider>
    <Router>
      {/* componente que imprime la location en consola y la muestra en pantalla */}
      <LocationDebugger />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/details" element={<ProductsDetails />} />
        <Route path="/cart" element={<Cart />} />

        {/* catch-all: muestra la location en la UI si no hubo match */}
        <Route
          path="*"
          element={
            <div style={{ padding: 24 }}>
              <h2>Ruta no encontrada</h2>
              <p>La ruta solicitada no coincide con ninguna ruta definida.</p>
              <p>Abre la consola (F12) y pega aquí lo que veas en el log <code>[Router] location changed</code>.</p>
            </div>
          }
        />
      </Routes>
      
      {/* CartSidebar global - se muestra en toda la aplicación */}
      <CartSidebar />
    </Router>
  </CartProvider>
);

export default AppRoutes;
