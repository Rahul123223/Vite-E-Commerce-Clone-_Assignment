import { Box, IconButton, Tooltip, Rating, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

interface ProductCardProps {
  products: any[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const { cart, addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        justifyContent: "center",
      }}
    >
      {products.map((item) => (
        <Box
          key={item.id}
          sx={{
            width: "250px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          {/* Wrap image + title with Link */}
          <Link
            to={`/product/${item.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={
                item.image ||
                "https://via.placeholder.com/640x480?text=No+Image"
              }
              alt={item.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "contain",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
            <p className="text-lg mb-2 truncate w-full">{item.title}</p>
          </Link>

          {/* Product Details */}
          <Box sx={{ flexGrow: 1 }}>
            <p style={{ fontWeight: "bold", fontSize: "15px" }}>
              Price: ${item.price}
            </p>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Rating
                name="read-only"
                value={item.rating.rate}
                precision={0.5} // half stars allowed
                readOnly
                size="small"
              />
              <span style={{ fontSize: "13px", color: "#777" }}>
                ({item.rating.count})
              </span>
            </Box>
          </Box>

          {/* View Details + Add to Cart */}

          <Box sx={{ marginTop: "auto" }}>
            {/* Add to Cart / Go to Cart Button */}
            {cart.some((cartItem) => cartItem.id === item.id) ? (
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <Tooltip title="Go to Cart">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#FFA41C",
                      color: "black",
                      fontWeight: "bold",
                      borderRadius: "6px",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#FF8C00" },
                    }}
                    fullWidth
                  >
                    🛒 Go to Cart
                  </Button>
                </Tooltip>
              </Link>
            ) : (
              <Tooltip title="Add to Cart">
                <Button
                  onClick={() => handleAddToCart(item)}
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#FFD814",
                    color: "black",
                    fontWeight: "bold",
                    borderRadius: "6px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#F7CA00" },
                  }}
                  fullWidth
                >
                  <AddShoppingCartIcon
                    sx={{ fontSize: "18px", marginRight: "6px" }}
                  />
                  Add to Cart
                </Button>
              </Tooltip>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ProductCard;
