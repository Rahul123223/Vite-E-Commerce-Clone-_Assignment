import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Box,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { useTheme, useMediaQuery } from "@mui/material";

const Header: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const { getCartItemCount } = useCart();
  const { user, logout } = useAuth();
  const cartItemCount = getCartItemCount();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Responsive check for small screens

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        color: "black",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/")}
        >
          Shopee
        </Typography>

        {/* Search Bar */}
        {!isMobile && (
          <InputBase
            placeholder="Search items..."
            onChange={(e) => onSearch(e.target.value)}
            sx={{
              width: "30%",
              padding: "6px 12px",
              borderRadius: "5px",
              backgroundColor: "#f0f0f0",
            }}
          />
        )}

        {/* Desktop Navigation */}
        {!isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <IconButton>
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            <Link
              to="/orders"
              style={{
                textDecoration: "none",
                color: "black",
                marginLeft: "15px",
              }}
            >
              <Button sx={{ color: "black" }}>Orders</Button>
            </Link>
            {user ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                <Typography variant="body2" sx={{ marginRight: 2 }}>
                  Welcome, {user}
                </Typography>
                <IconButton color="inherit" onClick={handleLogout}>
                  <ExitToAppIcon />
                </IconButton>
              </Box>
            ) : (
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginLeft: "15px",
                }}
              >
                <Button sx={{ color: "black" }}>Login</Button>
              </Link>
            )}
          </Box>
        ) : (
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Search Bar */}
      {isMobile && (
        <Box sx={{ padding: "10px", backgroundColor: "#f8f8f8" }}>
          <InputBase
            placeholder="Search items..."
            onChange={(e) => onSearch(e.target.value)}
            sx={{
              width: "100%",
              padding: "6px 12px",
              borderRadius: "5px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      )}

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem component={Link} to="/cart">
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
              <ListItemText primary="Cart" sx={{ marginLeft: 2 }} />
            </ListItem>
            <ListItem component={Link} to="/orders">
              <ListItemText primary="Orders" />
            </ListItem>
            {user ? (
              <ListItem component="button" onClick={handleLogout}>
                <ExitToAppIcon />
                <ListItemText primary="Logout" sx={{ marginLeft: 2 }} />
              </ListItem>
            ) : (
              <ListItem component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>{" "}
      </Drawer>
    </AppBar>
  );
};

export default Header;
