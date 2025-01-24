import { Box, IconButton, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

interface ProductCardProps {
  products: any[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {products.map((item) => (
        <Box
          key={item.id}
          sx={{
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            position: "relative",
          }}
        >
          <img
            src={item.image || "https://via.placeholder.com/640x480?text=No+Image"}
            alt={item.title}
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
          />
          <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{item.title}</h3>
          <p style={{ color: "#555", fontSize: "14px" }}>{item.description}</p>
          <p style={{ fontWeight: "bold" }}>Price: ${item.price}</p>
          <p>
            Rating: {item.rating.rate} ({item.rating.count} reviews)
          </p>

          <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "blue" }}>
            View Details
          </Link>

          <Tooltip title="Add to Cart">
            <IconButton
              color="primary"
              onClick={() => handleAddToCart(item)}
              sx={{ position: "absolute", top: "16px", right: "16px" }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ))}
    </Box>
  );
};

export default ProductCard;
