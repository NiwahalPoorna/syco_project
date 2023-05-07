import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
} from "@mui/material";

function RegistrationPage() {
  const theme = createTheme();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("First Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    mobileNumber: yup
      .string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    gender: yup.string().required("Gender is required"),
    rePassword: yup
      .string()
      .required("Re-enter Password is required")
      .oneOf([yup.ref("password"), null], "Passwords do not match"),
    nicNumber: yup.string().required("NIC number is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Perform form submission logic here
      // For example, send form data to a server for processing using Axios
      console.log(data);
      const response = await Axios.post(
        "http://localhost:3000/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Form submission successful
        console.log("Form submitted successfully");

        // Reset the form fields
        // Note: setValue is deprecated in the latest version of react-hook-form
        // Instead, you can use reset() method to reset the form
        reset();
        navigate("/"); 

      } else {
        // Form submission failed
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "The value already exists"
      ) {
        // Handle duplicate key error
        console.log("The value already exists");
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };

  return (
    
    <ThemeProvider theme={theme}>

      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "160vh",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 450,
              p: 5,
              borderRadius: 4,
              bgcolor: "background.paper",
              boxShadow: 3,
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "secondary.main",
                position: "relative",
                top: 0, // Positioning the Avatar at the top of the form
                left: "48%", // Positioning the Avatar at 50% from the left of the form
                transform: "translateX(-50%)",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Tax User Registration
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container maxWidth="sm" spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="First Name"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    )}
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "First Name is required" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Last Name"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    )}
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Last Name is required" }}
                  />
                </Grid>
                {/* Gender Field */}
                <Grid item xs={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.gender}
                  >
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Select label="Gender" id="gender" {...register("gender")}>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {errors.gender && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "0.875rem",
                          marginTop: "8px",
                        }}
                      >
                        {errors.gender.message}
                      </div>
                    )}
                  </FormControl>
                </Grid>
                {/* Mobile Number Field */}
                <Grid item xs={6}>
                  <TextField
                    id="mobileNumber"
                    label="Mobile Number"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    {...register("mobileNumber")}
                    error={!!errors.mobileNumber}
                    helperText={errors.mobileNumber?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Email Address"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} >
              <Controller
                name="companyName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Name"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="NIC Number"
                        error={!!errors.nicNumber}
                        helperText={errors.nicNumber?.message}
                      />
                    )}
                    name="nicNumber"
                    control={control}
                    defaultValue=""
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        margin="normal"
                        label="Password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        type={showRePassword ? "text" : "password"}
                        margin="normal"
                        label="Re-enter Password"
                        error={!!errors.rePassword}
                        helperText={errors.rePassword?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle re-enter password visibility"
                                onClick={handleClickShowRePassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showRePassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    name="rePassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Re-enter Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* Checkbox Field */}
                  <FormControlLabel
                    control={
                      <Controller
                        name="agree"
                        margin="normal"
                        control={control}
                        defaultValue={true}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            color="primary"
                            inputProps={{ "aria-label": "agree" }}
                          />
                        )}
                      />
                    }
                    label="I agree to the terms and conditions"
                  />
                  {errors.agree && (
                    <Typography variant="body2" color="error">
                      {errors.agree.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={12}>
                <Grid item>
                <p>
        Already have an account?{' '}
        <NavLink to="/" variant="body2">
          Sign in
        </NavLink>
      </p>
              </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegistrationPage;
