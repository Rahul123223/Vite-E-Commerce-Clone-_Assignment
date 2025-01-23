import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    useMediaQuery,
    IconButton,
    TextField,
    InputAdornment,
  } from "@mui/material";
  import MenuIcon from "@mui/icons-material/Menu";
  import SearchIcon from "@mui/icons-material/Search";
  import { useState } from "react";
  
  interface HeaderProps {
    onSearch: (query: string) => void;
  }
  
  const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const subCategories = ["email", "My Account", "Wishlist", "Cart"];
    const isMobile = useMediaQuery("(max-width:600px)");
    const [searchQuery, setSearchQuery] = useState("");
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);
      onSearch(query); 
    };
  
    return (
      <Box sx={{ flexGrow: 1, justifyContent: "space-between" }}>
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
            <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
              Shopi
            </Typography>
  
            {!isMobile && (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ width: "40%", marginRight: "20px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
  
            {isMobile ? (
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
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
            )}
          </Toolbar>
        </AppBar>
      </Box>
    );
  };
  
  export default Header;
  