import React from 'react'
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material'
import { Formik } from "formik";
import * as yup from 'yup';
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import {tokens} from "../../theme"
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

const Login = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    const handleFormSubmit = (values) => {
    console.log(values);
}
const theme = useTheme();
const colors = tokens(theme.palette.mode)

const initialValues = {
    userName: "",
    password: "",
};

const getValue = () => {

}
 
const loginSchema = yup.object().shape({
    userName: yup.string().required("Required"),
    password: yup.string().matches(passwordRegEx, "Invalid Password!").required("Required"),
});


    return (
    <Box> 
        <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"> 

            <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  backgroundColor="white"
                  src={"../../assets/logo.png"}
                />


        </Box>
        
        <Box textAlign="center">
                
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  <span style={{ color: colors.pinkAccents[600] }}>Fore</span>sight
                </Typography>

                </Box> 
           

      <Box p={5}></Box>

        <Box flex="1" ml="200px" mr="200px"p={2} borderRadius={5}
         backgroundColor={colors.primary[400] } 
        >
            <Header title="LOGIN" subtitle="Login to access Foresight" />       
            
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={loginSchema}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit,}) => (

                <form onSubmit={handleSubmit}>
                    <Box
                        display="flex"
                        alignContent="center"
                        alignItems="center"
                        justifyContent="center"
                        gap="30px"
                        p="20px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        
                    >
                    <Box >
                    <TextField
                    fullWidth
                    variant="filled"
                    display="flex"
                    justifyContent="center"
                    alignContent="center"
                    type="text"
                    label="Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userName}
                    name="userName"
                    error={!!touched.userName && !!errors.userName}
                    helperText={touched.userName && errors.userName}
                    sx={{ gridColumn: "span 4", width: "40vh"}}
                  />
                  
                  <Box p={1}></Box>
                 
                 <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 6", width: "40vh"}}
                    alignItems= "center"
          
                  />

              <Box 
                sx={{width:"40vh"}}
                display="flex"
                justifyContent="left"
                alignContent="left"
                alignItems="left"
                 
              >

              <Box sx={{width:"40vh"}}>

                 <FormControlLabel control=
                 {<Checkbox 
                 size="medium"
                 style={{ color: colors.pinkAccents[400] }}
                 alignContent="left"                
                 onChange={() => getValue()}
                 
              > 
                 
                 </Checkbox>} 
                 label="Remember Me" 
                 sx={{ color: colors.pinkAccents[400] }}> 

                 </FormControlLabel> 
                 </Box>


                <Box
                    sx={{width:"40vh"}}
                    display="flex"
                    justifyContent="right"
                    alignContent="right"
                    alignItems="right"
                    p={1}
                 >

                 <Link to="/" style={{color:colors.pinkAccents[400]}} alignContent="right" display="flex" alignItems="right" justifyContent="right">Forgot Password?</Link>
                 </Box>
                 
                </Box>
               </Box>

                  

                </Box>
                

                <Box display="flex" justifyContent="center" mt="20px">
                    <Button type="submit" color="secondary" p={8}variant="contained" sx={{width:"20vh"}}>
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
                    <Link to="/" style={{color:colors.pinkAccents[400]}}>Need Help?</Link>
                </Box>

                </form>
                )}       
                   
            </Formik>        
        </Box>
        </Box>
    );
}
export default Login;