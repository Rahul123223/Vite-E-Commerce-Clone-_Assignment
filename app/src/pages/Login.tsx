import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  Fade,
} from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { motion } from "framer-motion"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
    try {
      await login(username, password);
      navigate("/"); 
    } catch (error: any) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        mx: "auto",
        mt: 10,
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Login
        </Typography>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Username : mor_2314 Password :83r5^_
        </Typography>
      </motion.div>

      {error && (
        <Fade in={!!error} timeout={500}>
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        </Fade>
      )}

      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 3,
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 3,
            },
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              padding: "12px",
              fontSize: "16px",
              borderRadius: "20px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              "&:hover": {
                boxShadow: "0px 6px 12px rgba(0,0,0,0.2)",
              },
            }}
          >
            Log In
          </Button>
        </motion.div>
      </form>
    </Box>
  );
};

export default Login;
