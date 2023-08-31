import React, { useState } from 'react';
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from "../../theme";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateReport = () => {
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
      flex="1"
      p={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      //minWidth="100vh"
    >
      <Box
        bgcolor={colors.primary[400]}
        width="500px" // Increase the maxWidth for a larger background box
        borderRadius="8px"
        boxShadow="0 0 8px rgba(0, 0, 0, 0.1)"
        padding="20px" // Add padding for spacing
      >
        <Header title="Create Report" />
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: '15px' }}>
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
                />
              </Box>
              <Box sx={{ marginBottom: '15px' }}>
                <TextField
                fullWidth
                  variant="filled"
                  type="text"
                  label="Template"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.template}
                  name="template"
                  error={!!touched.template && !!errors.template}
                  helperText={touched.template && errors.template}
                />
              </Box>
              <Box sx={{ marginBottom: '15px' }}
              display="flex"
              justifyContent="space-between">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>

                <TextField
                  variant="filled"
                  type="text"
                  label="Frames"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Frames}
                  name="Frames"
                  error={!!touched.Frames && !!errors.Frames}
                  helperText={touched.Frames && errors.Frames}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                gap="15px"
                marginTop="15px"
              >
                <ToggleButtonGroup
                  value={isApproved}
                  exclusive
                  onChange={handleApprovalToggle}
                  aria-label="approve incident"
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
                <Button type="submit" color="secondary" variant="contained" style={{ height: '36px' }}>
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

export default CreateReport;