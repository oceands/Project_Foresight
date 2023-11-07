import React from 'react';
import { Box, Button, TextField, Typography} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { tokens } from "../../theme";
import { mockDataContacts } from '../../data/mockData';


// Import icons for contact information
import {IoLocationSharp} from 'react-icons/io5'
import {IoMailSharp} from 'react-icons/io5'
import {BsTelephoneFill} from 'react-icons/bs'


const Contact = () => {


    const colors = tokens;
    // Define a regular expression for validating phone numbers
    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    // Function to handle form submission
    const handleFormSubmit = (values) => {
      console.log(values);
    };
    //Initial form field values
    const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      address1: '',
      address2: '',
    };
     //Define the validation schema for form fields
    const checkoutSchema = yup.object().shape({
      firstName: yup.string().required('Required'),
      lastName: yup.string().required('Required'),
      email: yup.string().email('Invalid email!').required('Required'),
      contact: yup.string().matches(phoneRegExp, 'Phone number is not valid!').required('Required'),
      address1: yup.string().required('Required'),
      address2: yup.string().required('Required'),
    });
    



    //Render the component 
    return (
      <Box display="flex" height={"100vh"} backgroundColor={colors.primary[500]} minHeight={"100vh"}>
        <Box flex="1"
         p={2}
         style={{
          backgroundImage: "url('../../assets/ContactUsBackground.png')",
          backgroundSize: 'cover', // Cover the entire Box
          backgroundPosition: 'center', // Center the image
          display: 'flex',              // Set display to flex
          flexDirection: 'column',     // Stack items vertically
          alignItems: 'center',        // Center items horizontally
          justifyContent: 'center',    // Center items vertically
          textAlign: 'left',           // Left align text inside the Box

        }}>
          
        

    <Box>
    <Typography variant="h5" fontWeight={"bold"} gutterBottom paddingBottom={3}>
          Our Contacts
    </Typography>
    {mockDataContacts.map((contact, index) => (
    <Box key={contact.id} mb={2}>
      <Box display="flex" alignItems="center">
        <IoLocationSharp style={{ fontSize: 20, marginRight: 10, color: colors.blueAccents[500] }} />
        <Typography variant="h6" whiteSpace="pre-line">
          {contact.city}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <IoMailSharp style={{ fontSize: 20, marginRight: 10, color: colors.blueAccents[500] }} />
        <Typography variant="h6" whiteSpace="pre-line">
          {contact.email}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <BsTelephoneFill style={{ fontSize: 20, marginRight: 10, color: colors.blueAccents[500] }} />
        <Typography variant="h6" whiteSpace="pre-line">
          {contact.phone}
        </Typography>
      </Box>
      {index < mockDataContacts.length - 1 && <Box mb={8} />}
    </Box>
  ))}
  </Box>    

        </Box>


        <Box flex="0.8" padding={5}>
        <Box 
         p={10} 
        backgroundColor={colors.secondary[500]}
        borderRadius="8px">

         <Typography variant='h5' textAlign={"center"} paddingBottom={3}>Get in touch!</Typography>
         <Typography variant='h7' paddingBottom={3} >Fill in the form with your details and our team will get reach out to you!</Typography>

          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema} >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box display="grid" 
                gap="30px" 
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"> 
                <TextField     //Labling the textboxes
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
                   
                  <Button type="submit"  variant="contained" style={{ gridColumn: "span 4", backgroundColor: colors.orangeAccents[500] }}> 
                    Send  🡲
                  </Button>

                </Box>
              </form>
            )}
          </Formik>
        </Box>
        </Box>
      </Box>
    );
  };
  
  export default Contact;
  
  
  
  
  
  