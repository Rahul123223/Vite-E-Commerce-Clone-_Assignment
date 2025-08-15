import { Box, Typography, Button, IconButton, Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { useCart } from "../Context/CartContext";

const CartManager = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, getTotalPrice, placeOrder } = useCart();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ marginBottom: "20px" }}
      >
        Back
      </Button>

      {/* Header */}
      <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
        Cart Manager
      </Typography>

      {/* Empty Cart Message */}
      {cart.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No items in your cart.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {cart.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Product Image */}
              <CardMedia
                component="img"
                image={item.image || "https://via.placeholder.com/100"}
                alt={item.title}
                sx={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              {/* Product Details */}
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1" color="textSecondary">
                  Price: ${item.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {item.quantity}
                </Typography>
              </CardContent>

              {/* Quantity Controls and Remove Button */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <IconButton
                  onClick={() => decrementQuantity(item.id)}
                  color="primary"
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    padding: "5px",
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography variant="body1">{item.quantity}</Typography>
                <IconButton
                  onClick={() => incrementQuantity(item.id)}
                  color="primary"
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    padding: "5px",
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  Remove
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}

      {/* Total Price and Place Order Button */}
      {cart.length > 0 && (
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderTop: "1px solid #ccc",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Total Price: ${getTotalPrice()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={placeOrder}
            sx={{ padding: "10px 20px", fontWeight: "bold" }}
          >
            Place Order
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartManager;
