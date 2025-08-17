import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);

  const toggleLeftDrawer = (open: boolean) => setLeftDrawerOpen(open);
  const toggleRightDrawer = (open: boolean) => setRightDrawerOpen(open);

  const handleLogout = () => logout();

  return (
    //added changes for sidebar
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#131921",
        color: "white",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "60px",
        }}
      >
        {/* Left Hamburger Menu (always visible) */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => toggleLeftDrawer(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
            flexShrink: 0,
            color: "white",
          }}
          onClick={() => (window.location.href = "/")}
        >
          RG Shop
        </Typography>

        {/* Search Bar (Amazon-style, center & wide) */}
        {!isMobile && (
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: "600px",
              mx: 3,
              backgroundColor: "white",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              px: 1,
            }}
          >
            <InputBase
              placeholder="Search items..."
              onChange={(e) => onSearch(e.target.value)}
              sx={{
                flex: 1,
                color: "black",
                px: 1,
              }}
            />
          </Box>
        )}

        {/* Desktop Navigation */}
        {!isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link to="/orders" style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "white", fontSize: 14 }}>
                Returns & Orders
              </Typography>
            </Link>

            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ color: "white" }}>
                  Hello, {user}
                </Typography>
                <IconButton color="inherit" onClick={handleLogout}>
                  <ExitToAppIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "white", fontSize: 14 }}>
                  Sign In
                </Typography>
              </Link>
            )}

            <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
              <IconButton>
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        ) : (
          // Right Drawer trigger (mobile)
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => toggleRightDrawer(true)}
          >
            <ShoppingCartIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Search Bar (below navbar) */}
      {isMobile && (
        <Box
          sx={{
            backgroundColor: "#232f3e",
            px: 1,
            py: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              px: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              placeholder="Search items..."
              onChange={(e) => onSearch(e.target.value)}
              sx={{
                flex: 1,
                color: "black",
                px: 1,
              }}
            />
          </Box>
        </Box>
      )}

      {/* Left Drawer (Hamburger menu for navigation) */}
      <Drawer
        anchor="left"
        open={leftDrawerOpen}
        onClose={() => toggleLeftDrawer(false)}
      >
        <Box sx={{ width: 250, backgroundColor: "#fff", height: "100%" }}>
          <List>
            <ListItem component={Link} to="/" onClick={() => toggleLeftDrawer(false)}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem component={Link} to="/products" onClick={() => toggleLeftDrawer(false)}>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem component={Link} to="/cart" onClick={() => toggleLeftDrawer(false)}>
              <ListItemText primary="Cart" />
            </ListItem>
            <ListItem component={Link} to="/orders" onClick={() => toggleLeftDrawer(false)}>
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
          <Divider />
          {user ? (
            <ListItem onClick={handleLogout}>
              <ExitToAppIcon />
              <ListItemText primary="Logout" sx={{ ml: 2 }} />
            </ListItem>
          ) : (
            <ListItem component={Link} to="/login" onClick={() => toggleLeftDrawer(false)}>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </Box>
      </Drawer>

      {/* Right Drawer (Mobile actions: cart, orders, etc.) */}
      <Drawer
        anchor="right"
        open={rightDrawerOpen}
        onClose={() => toggleRightDrawer(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem component={Link} to="/cart" onClick={() => toggleRightDrawer(false)}>
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
              <ListItemText primary="Cart" sx={{ ml: 2 }} />
            </ListItem>
            <ListItem component={Link} to="/orders" onClick={() => toggleRightDrawer(false)}>
              <ListItemText primary="Orders" />
            </ListItem>
            {user ? (
              <ListItem onClick={handleLogout}>
                <ExitToAppIcon />
                <ListItemText primary="Logout" sx={{ ml: 2 }} />
              </ListItem>
            ) : (
              <ListItem component={Link} to="/login" onClick={() => toggleRightDrawer(false)}>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
