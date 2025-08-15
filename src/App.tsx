import { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import CartManager from "./pages/CartManager";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import OrderManager from "./pages/OrderManager";
import ProductDetails from "./pages/ProductDetails";
import { APPPATHS } from "./utils/AppPaths";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./utils/Theme";

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
        </ThemeProvider>
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
