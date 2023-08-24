import React, { useState } from 'react';
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';

import { tokens } from "../../theme";
const Contact = () => {

const theme = useTheme();
const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    type: '',
    template: '',
    dateTime: '',
    Frames: '',
  };

  const checkoutSchema = yup.object().shape({
    type: yup.string().required('Required'),
    template: yup.string().required('Required'),
    dateTime: yup.string().required('Required'),
    Frames: yup.string().required('Required'),
  });

  const [isApproved, setIsApproved] = useState(false);

  const handleApprovalToggle = () => {
    setIsApproved(!isApproved);
  };

  return (
    <Box 
    flex="1" p={2} 

    backgroundColor={colors.primary[400]}>
    <Header title="Create Report" subtitle="Creating a report using Formik" />
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
          
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.type}
                    name="type"
                    error={!!touched.type && !!errors.type}
                    helperText={touched.type && errors.type}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="template"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.template}
                    name="template"
                    error={!!touched.template && !!errors.template}
                    helperText={touched.template && errors.template}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="dateTime"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dateTime}
                    name="dateTime"
                    error={!!touched.dateTime && !!errors.dateTime}
                    helperText={touched.dateTime && errors.dateTime}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Frames"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Frames}
                    name="Frames"
                    error={!!touched.Frames && !!errors.Frames}
                    helperText={touched.Frames && errors.Frames}
                    sx={{ gridColumn: "span 4" }}
                  />
          <ToggleButtonGroup
                value={isApproved}
                exclusive
                onChange={handleApprovalToggle}
                aria-label="approve incident"
                sx={{ gridColumn: 'span 1', marginTop: '10px' }}
              >
                <ToggleButton
                  value={true}
                  aria-label="approve"
                  size="small"
                  style={{
                    backgroundColor: isApproved ? '#4CAF50' : '',
                    color: isApproved ? '#ffffff' : '',
                    transition: 'background-color 0.3s, color 0.3s',
                    border: isApproved ? 'none' : '1px solid #ccc',
                  }}
                >
                  Approve Incident?
                </ToggleButton>
              </ToggleButtonGroup>
              <Box sx={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" color="secondary" variant="contained" style={{ height: '36px' }}>
                Submit
              </Button>
            </Box>
            </Box>
           
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Contact;