import React from 'react';
import { Box, Button, Grid, TextField, Typography, useTheme ,Divider,Paper } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from "../../theme";


const Security = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    //const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
      console.log(values);
    };
    const initialValues = {
        passwd: '',
        passwdConf: ''
    };

    const checkoutSchema = yup.object().shape({
        passwd: yup.string().required('Required'),
        passwdConf: yup.string().required('Required')
      });

      const buttonSx = {
        backgroundColor: colors.pinkAccents[500],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 0", // Remove horizontal padding
        minWidth: "150px", // Set a fixed width for all buttons
        '&:hover': {
          backgroundColor: colors.pinkAccents[600], // New color on hover
        },
    };

      return (

        <Box m="20px">
            
        <Box display="flex" justifyContent="space-between" alignItems="center">
         <Header title="SECURITY SETTINGS" />
       </Box>

       <Box p={2} backgroundColor={colors.primary[400]}>
        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <h2>Update Password</h2>
                <p>Change your account password for added security.</p>
              </Grid>
              <Grid item>
                <Button sx={buttonSx}>
                  Update
                </Button>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
          

          {/* Row 2 */}
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <h2>Security Question</h2>
                <p>Set up or change your security question for account recovery.</p>
              </Grid>
              <Grid item>
                <Button  sx={buttonSx}>
                  Update
                </Button>
              </Grid>
            </Grid> 
          <Divider />
          </Grid>
         

          {/* Row 3 */}
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <h2>Auto-Logout</h2>
                <p>Configure auto-logout settings for enhanced security.</p>
              </Grid>
              <Grid item>
                <Button  sx={buttonSx}>
                  Update
                </Button>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
          

          {/* Row 4 */}
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <h2>Terms of Service and Privacy Policy</h2>
                <p>Read our terms of service and privacy policy for more information.</p>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" sx={buttonSx}>
                More Info
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>



       </Box>

      );


};

export default Security;