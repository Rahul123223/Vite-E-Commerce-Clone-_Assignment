import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const OrderManager = () => {
  const { getOrders, clearOrders } = useCart(); // Added clearOrders from the CartContext
  const orders = getOrders();
  const navigate = useNavigate();

  const handleClearOrders = () => {
    clearOrders(); // Clear all orders
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          My Orders
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ marginRight: "10px" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleClearOrders}
            disabled={orders.length === 0} // Disable the button if there are no orders
          >
            Clear Orders
          </Button>
        </Box>
      </Box>

      {/* Orders List */}
      {orders.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No orders placed yet.
        </Typography>
      ) : (
        orders.map((order, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: "20px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {/* Order Header */}
            <CardContent
              sx={{
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="primary">
                Order #{index + 1}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Total Items: {order.reduce((sum, item) => sum + item.quantity, 0)}
              </Typography>
            </CardContent>

            {/* Order Items */}
            {order.map((item: any) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image || "https://via.placeholder.com/50"}
                  alt={item.title}
                  sx={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "15px",
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${item.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {item.quantity}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Card>
        ))
      )}
    </Box>
  );
};

export default OrderManager;
