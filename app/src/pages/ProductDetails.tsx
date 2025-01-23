import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "40%",
          height: "300px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      />
      <Typography variant="h6" gutterBottom>
        Price: ${product.price}
      </Typography>
      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>
      <Typography variant="body2" paragraph>
        Rating: {product.rating.rate} ({product.rating.count} reviews)
      </Typography>
      <Button variant="contained" color="primary" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </Box>
  );
};

export default ProductDetails;
