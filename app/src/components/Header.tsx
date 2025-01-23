import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const categories = ["All", "Clothes", "Furniture", "Electronics", "Toys"];
  const subCategories = ["email", "My Account", "Wishlist", "Cart"];
  const isMobile = useMediaQuery("(max-width:600px)");



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo Section */}
          <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
            Shopi
          </Typography>

          {/* Menu Section */}
          {isMobile ? (
            // Mobile View: Display a menu icon
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          ) : (
            // Desktop View: Display menu items spaced between
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  //   justifyContent: "space-between",
                  //   flexGrow: 1,
                  gap: 5,
                }}
              >
                {categories.map((item, index) => (
                  <Typography
                    key={index}
                    variant="subtitle1"
                    component="div"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "gray" },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  //   justifyContent: "space-between",
                  gap: 5,
                  //   flexGrow: 2,
                }}
              >
                {subCategories.map((item, index) => (
                  <Typography
                    key={index}
                    variant="subtitle1"
                    component="div"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "gray" },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
