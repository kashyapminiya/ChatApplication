import { useForm } from "react-hook-form";
import {
     Stack,
     TextField,
     Button,
     Grid,
     Box,
     Typography,
     Divider,
     Snackbar,
     Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../configs/GlobalConfig";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

     const {
          register,
          handleSubmit,
          watch,
          reset,
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

     const onSubmit = async (data) => {
          try {
               const response = await axios.post(`${API_URL}/register`, data);
               if (response.data) {
                    setSnackbar({
                         open: true,
                         message: "Registration successful!",
                         severity: "success",
                    });
                    navigate('/');
               }
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
                         <Grid item xs={12} md={12} sx={{ p: 4 }}>
                              <Typography variant="h4" fontWeight="bold" mb={1}>
                                   Create Your Account
                              </Typography>
                              <Typography variant="body1" color="textSecondary" mb={3}>
                                   Join Doom Chat and start chatting today!
                              </Typography>

                              {/* Registration Form */}
                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <Stack spacing={2}>
                                        {/* Name */}
                                        <TextField
                                             label="Full Name"
                                             fullWidth
                                             {...register("name", { required: "Name is required" })}
                                             error={!!errors.name}
                                             helperText={errors.name?.message}
                                        />

                                        {/* Email */}
                                        <TextField
                                             label="Email"
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

                                        {/* Phone */}
                                        <TextField
                                             label="Phone Number"
                                             fullWidth
                                             {...register("phone", {
                                                  required: "Phone number is required",
                                                  pattern: {
                                                       value: /^[0-9]{10}$/,
                                                       message: "Enter a valid 10-digit phone number",
                                                  },
                                             })}
                                             error={!!errors.phone}
                                             helperText={errors.phone?.message}
                                        />

                                        {/* Password */}
                                        <TextField
                                             label="Password"
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

                                        {/* Confirm Password */}
                                        <TextField
                                             label="Confirm Password"
                                             type="password"
                                             fullWidth
                                             {...register("password_confirmation", {
                                                  required: "Please confirm your password",
                                                  validate: (value) =>
                                                       value === watch("password") || "Passwords do not match",
                                             })}
                                             error={!!errors.password_confirmation}
                                             helperText={errors.password_confirmation?.message}
                                        />

                                        {/* Buttons */}
                                        <Stack direction="row" spacing={2}>
                                             <Button
                                                  type="submit"
                                                  variant="contained"
                                                  color="primary"
                                                  sx={{ flex: 1 }}
                                                  endIcon={<SendIcon />}
                                             >
                                                  Submit
                                             </Button>

                                             <Button
                                                  type="button"
                                                  variant="outlined"
                                                  color="dark"
                                                  sx={{ flex: 1 }}
                                                  startIcon={<DeleteIcon />}
                                                  onClick={() => reset()}
                                             >
                                                  Reset
                                             </Button>
                                        </Stack>
                                   </Stack>
                              </form>
                         </Grid>

                    </Grid>
               </Box>

               {/* Snackbar */}
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
