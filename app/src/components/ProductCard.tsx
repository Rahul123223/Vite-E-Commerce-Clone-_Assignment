import { Box } from "@mui/material";
import { Link } from "react-router-dom";

interface ProductCardProps {
  products: any[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}
    >
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
          }}
        >
          <img
            src={
              item.image
                ? item.image
                : "https://via.placeholder.com/640x480?text=No+Image"
            }
            alt={item.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{item.title}</h3>
          <p style={{ color: "#555", fontSize: "14px" }}>{item.description}</p>
          <p style={{ fontWeight: "bold" }}>Price: ${item.price}</p>
          <p>
            Rating: {item.rating.rate} ({item.rating.count} reviews)
          </p>

          <Link
            to={`/product/${item.id}`}
            style={{ textDecoration: "none", color: "blue" }}
          >
            View Details
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default ProductCard;
