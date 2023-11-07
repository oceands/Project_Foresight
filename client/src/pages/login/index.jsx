//react
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import configData from "../../config";

//MUI
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  useMediaQuery,
  InputAdornment,
  IconButton,
} from "@mui/material";

//Third party
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ACCOUNT_INITIALIZE } from "../../store/actions";

//Project Imports
import useScriptRef from "../../hooks/useScriptRef";
import { tokens } from "../../theme";

//assets
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

const Login = (props, { ...others }) => {
  const dispatcher = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordRegEx =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/; // Regular expression for password validation

  const scriptedRef = useScriptRef();

  const handleFormSubmit = (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      axios
        .post(configData.API_SERVER + "auth/api/users/login", {
          email: values.email,
          password: values.password,
        })
        .then(function (response) {
          if (response.data.success) {
            dispatcher({
              type: ACCOUNT_INITIALIZE,
              payload: {
                isLoggedIn: true,
                Access_token: response.data.Access_token,
                Refresh_token: response.data.Refresh_token,
                user: response.data.user,
              },
            });
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } else {
            setStatus({ success: false });
            setErrors({ submit: response.data.msg });
            setSubmitting(false);
          }
        })
        .catch(function (error) {
          setStatus({ success: false });
          //setErrors({ submit: error.response.data.msg });
          setSubmitting(false);
        });
    } catch (err) {
      console.error(err);
      if (scriptedRef.current) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  };

  const colors = tokens;

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };
  // Function to handle checkbox value
  const getValue = () => {};
  // Form validation schema
  const loginSchema = yup.object().shape({
    email: yup.string().required("Email is Required"),
    password: yup
      .string()
      .matches(passwordRegEx, "Invalid Password!")
      .required("Password is Required"),
  });

  const buttonSx = {
    backgroundColor: colors.orangeAccents[500],
    color: colors.primary[500],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px", // Remove horizontal padding
    minWidth: "130px", // Set a fixed width for all buttons
    "&:hover": {
      backgroundColor: colors.primary[500], // New color on hover
      color: colors.orangeAccents[500],
      boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
    },
  };

  const loginBox = {
    backgroundImage: "url('../../assets/backgroundLogin.webp')",
    backgroundSize: "cover", // Cover the entire Box
    backgroundPosition: "center", // Center the image
    display: "flex", // Set display to flex
    flexDirection: "column", // Stack items vertically
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    textAlign: "left", // Left align text inside the Box
  };

  return (
    <Box flex="1" p={3} minHeight={"100vh"} style={loginBox}>
      <Box>
        <Box
          flex="1"
          ml="200px"
          mr="200px"
          p={5}
          borderRadius={5}
          backgroundColor={colors.primary[500]}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={3}
            sx={{
              "& .avater-image": {
                backgroundColor: colors.secondary[500],
              },
            }}
          >
            <img
              className="logo-image"
              alt="profile user"
              width="124px"
              height="102px"
              backgroundColor="white"
              src={"../../assets/logoNew.png"}
              style={{ cursor: "pointer", padding: "5px" }}
            />
          </Box>
          <Typography variant="h6" fontWeight="bold" textAlign={"center"} p={3}>
            Login to Foresight
          </Typography>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={loginSchema}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit} {...others}>
                <FormControl fullWidth>
                  <Box
                    display="flex"
                    alignContent="center"
                    alignItems="center"
                    justifyContent="center"
                    gap="30px"
                    p="20px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <Box>
                      <TextField
                        fullWidth
                        variant="filled"
                        display="flex"
                        justifyContent="center"
                        alignContent="center"
                        type="text"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 4", width: "40vh" }}
                      />

                      <Box p={1}></Box>

                      <TextField
                        fullWidth
                        variant="filled"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        sx={{ gridColumn: "span 6", width: "40vh" }}
                        alignItems="center"
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
                                  <MdVisibility />
                                ) : (
                                  <MdVisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Box
                        sx={{ width: "40vh" }}
                        display="flex"
                        justifyContent="left"
                        alignContent="left"
                        alignItems="left"
                      >
                        <Box sx={{ width: "40vh" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="medium"
                                style={{ color: colors.blackAccents[500] }}
                                alignContent="left"
                                onChange={() => getValue()}
                              ></Checkbox>
                            }
                            label="Remember Me"
                            sx={{ color: colors.blackAccents[500] }}
                          ></FormControlLabel>
                        </Box>

                        <Box
                          sx={{ width: "40vh" }}
                          display="flex"
                          justifyContent="right"
                          alignContent="right"
                          alignItems="right"
                          p={1}
                        >
                          <Link
                            to="/"
                            style={{ color: colors.blackAccents[500] }}
                            alignContent="right"
                            display="flex"
                            alignItems="right"
                            justifyContent="right"
                          >
                            Forgot Password?
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box display="flex" justifyContent="center" mt="20px">
                    <Button
                      type="submit"
                      color="secondary"
                      p={8}
                      variant="contained"
                      sx={buttonSx}
                    >
                      Login
                    </Button>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignContent="center"
                    alignItems="center"
                    p={2}
                  >
                    <Link to="/" style={{ color: colors.blackAccents[500] }}>
                      Need Help?
                    </Link>
                  </Box>
                </FormControl>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
