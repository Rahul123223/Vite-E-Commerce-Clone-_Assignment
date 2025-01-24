import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Button, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; 
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext"; 

const Header: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const { cart, getCartItemCount } = useCart();
  const { user, logout } = useAuth(); 
  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-Commerce Store
        </Typography>

        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          style={{ padding: "5px", borderRadius: "5px" }}
        />

        <Link to="/cart" style={{ textDecoration: "none", color: "white", marginLeft: "20px" }}>
          <IconButton color="inherit">
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>

        <Link to="/orders" style={{ textDecoration: "none", color: "white", marginLeft: "20px" }}>
          <Button color="inherit">My Orders</Button>
        </Link>

        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Welcome, {user}
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Box>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", color: "white", marginLeft: "20px" }}>
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar> 
  );
};

export default Header;
