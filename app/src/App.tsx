import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import CartManager from "./pages/CartManager";
import OrderManager from "./pages/OrderManager";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Login from "./pages/Login"; // Assuming you created a Login component

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Header */}
          <Header onSearch={(query) => setSearchQuery(query)} />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Dashboard searchQuery={searchQuery} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><CartManager /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrderManager /></ProtectedRoute>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// ProtectedRoute component ensures only logged-in users can access certain routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;
