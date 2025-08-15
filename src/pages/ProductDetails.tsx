import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useCart } from "../Context/CartContext"; // Import your cart context

const ProductImage = styled("img")({
  width: "100%",
  maxWidth: "500px",
  height: "auto",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  marginBottom: "20px",
});

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // Cart context hook
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackOpen, setSnackOpen] = useState(false); // To show snackbar notification

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async (): Promise<void> => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 }); // Add the product to the cart with a default quantity of 1
      setSnackOpen(true); // Show success snackbar
    }
  };

  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={50} color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6" color="textSecondary">
          No product found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Grid
        container
        spacing={4}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        {/* Product Image */}
        <Grid item xs={12} sm={6}>
          <ProductImage src={product.image} alt={product.title} />
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{ padding: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <IconButton
                color="primary"
                sx={{ fontSize: "bold" }}
                onClick={() => window.history.back()}
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                color="secondary"
                sx={{ fontSize: "bold" }}
                onClick={handleAddToCart}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Box>

            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {product.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#333", marginBottom: "10px" }}
            >
              Price: <span style={{ color: "#00796b" }}>${product.price}</span>
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: "#555" }}>
              {product.description}
            </Typography>
            <Typography variant="body2" paragraph sx={{ color: "#777" }}>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </Typography>

            {/* <Box sx={{ display: "flex", gap: "10px", flexDirection: "column", alignItems: "flex-start" }}>
              <Button variant="contained" color="primary" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Box> */}
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar for success */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetails;
