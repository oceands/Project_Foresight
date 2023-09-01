 import React from 'react';
import { Box, Button, TextField, Typography, useTheme  } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from "../../theme";

const Contact = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
      console.log(values);
    };
    const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      address1: '',
      address2: '',
    };
    const checkoutSchema = yup.object().shape({
      firstName: yup.string().required('Required'),
      lastName: yup.string().required('Required'),
      email: yup.string().email('Invalid email!').required('Required'),
      contact: yup.string().matches(phoneRegExp, 'Phone number is not valid!').required('Required'),
      address1: yup.string().required('Required'),
      address2: yup.string().required('Required'),
    });
    
    const contactInfo1 = `
    City:Sharjah, United Arab Emirates
    Name: Simran patt
    Branch type: Headquarters
    Address: Al Wahda Street, Al Qasimia, Sharjah, UAE
    Phone: +971 6 123 4567
    Email: al-falah.electronics@example.com
  `;
  const contactInfo2 = `
  City:Dubai, United Arab Emirates
  Name:Saim Ali
  Branch type: Customer service office
  Address: Sheikh Zayed Road, Al Barsha, Dubai, UAE
  Phone: +971 4 987 6543
  Email: oasis.pharmacy@example.com
  
`;
const contactInfo3 = `
Ajman:Dubai, United Arab Emirates
Name: Uzair Naeem
Branch type: Foresight Industry 
Address: Al Jurf Area, Ajman, UAE
Phone: +971 6 789 0123
Email: elite.fitness@example.com
`;
    return (
      <Box m="20px" display="flex">
        <Box flex="1" p={2}>
        
        <Typography variant="h6" gutterBottom>
          Contact Details
        </Typography>
        <Typography variant="body1" whiteSpace="pre-line">
          {contactInfo1}
        </Typography>
       
        <Typography variant="h6" gutterBottom>
          Contact Details
        </Typography>
        <Typography variant="body1" whiteSpace="pre-line">
          {contactInfo2}
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Contact Details
        </Typography>
        <Typography variant="body1" whiteSpace="pre-line">
          {contactInfo3}
        </Typography>
        
        </Box>
        <Box 
        flex="1" p={2} 
        backgroundColor={colors.primary[400]}>
          <Header
          title="CONTACT US"
          subtitle="Example contact Form using Formik"
        
        />
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box display="grid" 
                gap="30px" 
                gridTemplateColumns="repeat(4, minmax(0, 1fr))">
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={!!touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={!!touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Contact Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contact}
                    name="contact"
                    error={!!touched.contact && !!errors.contact}
                    helperText={touched.contact && errors.contact}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address 1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address1}
                    name="address1"
                    error={!!touched.address1 && !!errors.address1}
                    helperText={touched.address1 && errors.address1}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address 2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address2}
                    name="address2"
                    error={!!touched.address2 && !!errors.address2}
                    helperText={touched.address2 && errors.address2}
                    sx={{ gridColumn: "span 4" }}
                  />
                  {/* Continue with other form fields */}
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Submit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    );
  };
  
  export default Contact;
  
  
  
  
  
  