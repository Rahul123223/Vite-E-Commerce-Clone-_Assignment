import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import CartManager from "./pages/CartManager";
import OrderManager from "./pages/OrderManager";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Login from "./pages/Login";
import { APPPATHS } from "../utils/AppPaths";

interface RoutesArray {
  path: string;
  element: JSX.Element;
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const routesArray: RoutesArray[] = [
    {
      path: APPPATHS.DASHBOARD,
      element: <Dashboard searchQuery={searchQuery} />,
    },
    { path: APPPATHS.LOGIN, element: <Login /> },
    {
      path: APPPATHS.PRODUCTDETAILS,
      element: (
        <ProtectedRoute>
          <ProductDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: APPPATHS.CART,
      element: (
        <ProtectedRoute>
          <CartManager />
        </ProtectedRoute>
      ),
    },
    {
      path: APPPATHS.ORDERS,
      element: (
        <ProtectedRoute>
          <OrderManager />
        </ProtectedRoute>
      ),
    },
  ];

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header onSearch={(query) => setSearchQuery(query)} />
          <Routes>
            {routesArray.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {/* <Route path="/" element={<Dashboard searchQuery={searchQuery} />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderManager />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;
