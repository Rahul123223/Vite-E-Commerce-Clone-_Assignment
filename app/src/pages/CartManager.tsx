import { Box, Typography, Button, IconButton } from "@mui/material";
import { useCart } from "../Context/CartContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CartManager = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, getTotalPrice, placeOrder } = useCart();

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Cart Manager
      </Typography>
      {cart.length === 0 ? (
        <Typography>No items in your cart</Typography>
      ) : (
        cart.map((item) => (
          <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <div>
              <img src={item.image} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
              <Typography>{item.title}</Typography>
              <Typography>Price: ${item.price}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
            </div>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => decrementQuantity(item.id)} color="primary">
                <RemoveIcon />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton onClick={() => incrementQuantity(item.id)} color="primary">
                <AddIcon />
              </IconButton>
              <Button onClick={() => removeFromCart(item.id)} color="secondary" sx={{ marginLeft: "10px" }}>
                Remove
              </Button>
            </Box>
          </Box>
        ))
      )}

      <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Total Price: ${getTotalPrice()}</Typography>
        <Button variant="contained" color="primary" onClick={placeOrder}>
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default CartManager;
