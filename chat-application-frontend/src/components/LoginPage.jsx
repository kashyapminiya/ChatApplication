import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  FormControlLabel,
  TextField,
  Button,
  Checkbox,
  Grid,
  Box,
  Typography,
  Divider,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import { API_URL } from "../configs/GlobalConfig";
import loginIllustration from "../assets/login-illustration.gif";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // handle form submit
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      if(response.status === 200){
        setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
      }
      console.log('Login successful:', response.data);
    } catch (error) {
      let errorMessage = "Something went wrong";

      if (error.response && error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const createAccount = () => {
    navigate('/signup')
  };

    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            maxWidth: 900,
            width: "100%",
            backgroundColor: "#f3f3f3e6",
            borderRadius: 3,
            justifyContent: "center",
            boxShadow: 3,
            overflow: "hidden",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={9} sx={{ p: 4 }}>
              <Typography variant="h4" fontWeight="bold" mb={1}>
                Welcome Back!
              </Typography>
              <Typography variant="body1" color="textSecondary" mb={3}>
                Login to your account to continue
              </Typography>

              {/* Form with React Hook Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  {/* Email Field */}
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />

                  {/* Password Field */}
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />

                  {/* Remember me */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("remember")}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />

                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 2,
                      paddingY: 1.5,
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                    fullWidth
                  >
                    Login
                  </Button>
                </Stack>
              </form>

              <Divider sx={{ my: 3 }} textAlign="center">
                OR
              </Divider>

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: "center" }}
              >
                Don&apos;t have an account?{" "}
                <Link
                  onClick={createAccount}
                  sx={{ cursor: "pointer", fontWeight: "bold", color: "primary.main" }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Grid>

            {/* Illustration */}
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "end",
                backgroundColor: "#f5f5f5",
              }}
            >
              <img
                src={loginIllustration}
                alt="Login Illustration"
                style={{ width: "100%", borderRadius: "12px" }}
              />
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    );
}
