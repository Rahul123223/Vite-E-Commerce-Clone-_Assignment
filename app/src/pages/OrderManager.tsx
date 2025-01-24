import { Box, Typography } from "@mui/material";
import { useCart } from "../Context/CartContext";

const OrderManager = () => {
  const { getOrders } = useCart();
  const orders = getOrders();

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders placed yet</Typography>
      ) : (
        orders.map((order, index) => (
          <Box key={index} sx={{ marginBottom: "20px" }}>
            <Typography variant="h6">Order #{index + 1}</Typography>
            {order.map((item: any) => (
              <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <img src={item.image} alt={item.title} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                  <Typography>{item.title}</Typography>
                  <Typography>Price: ${item.price}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                </div>
              </Box>
            ))}
          </Box>
        ))
      )}
    </Box>
  );
};

export default OrderManager;
