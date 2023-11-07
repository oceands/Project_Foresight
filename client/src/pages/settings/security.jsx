import React, { useState } from 'react';

import {
  Box,
  Button,
  Grid,
  TextField,
  useTheme,
  Divider,
  MenuItem,
  FormControl,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { tokens } from '../../theme';
import {Typography} from '@mui/material';

const Security = () => {

  const theme = useTheme();
  const colors = tokens;

  // Security: Update Password Const's
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const updatePassVals = {
    newpasswd: '',
    newpasswdConf: '',
  };

  const updatePassSchema = yup.object().shape({
    newpasswd: yup
      .string()
      .matches(
        passRegex,
        'Password must be at least 8 characters long and contain at least one letter, one digit, and may include special characters like @$!%*?&.'
      )
      .required('Required'),
    newpasswdConf: yup.string().required('Required'),
  });

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  // Security: Update Security Question
  const securityQuestions = [
    "What is your mother's maiden name?",
    'What was the name of your first pet?',
    'In which city were you born?',
    'What is your favorite book?',
    'What is your favorite movie?',
    'What is your favorite food?',
    'What is the name of your first school?',
    'What is your favorite sports team?',
    'What is the model of your first car?',
    'What is the name of your childhood best friend?',
  ];

  const [selectedQuestion, setSelectedQuestion] = useState(''); // State to hold the selected question
  const [answer, setAnswer] = useState(''); // State to hold the user's answer

  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  const secQuestionVals = {
    questionSelected: selectedQuestion,
    Answer: answer,
  };

  const secQuestionsSchema = yup.object().shape({
    questionSelected: yup.string().required('Required'),
    Answer: yup.string().required('Required'),
  });


  //Security: Update Logout Timer

  const secTimeOptions = [
    '1 minute',
    '2 minutes',
    '3 minutes',
    '5 minutes',
    '10 minutes',
    '15 minutes',
    '30 minutes',
    '60 minutes',
    'Never',
  ];

  const [selectedTime, setSelectedTime] = useState(''); // State to hold the selected question

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const secTimerVals = {
   timeSelected: selectedTime
  };

  const secTimerSchema = yup.object().shape({
    timeSelected: yup.string().required('Required'),
  });
  



  // Button Preloaded settings
  const buttonSx = {
    backgroundColor: colors.orangeAccents[500],
    color: colors.primary[500],
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px', // Remove horizontal padding
    minWidth: '130px', // Set a fixed width for all buttons
    '&:hover': {
      backgroundColor: colors.primary[500], // New color on hover
      color: colors.orangeAccents[500],
      boxShadow:' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;',
    },
  };


 // Propagation handling for updating password Form
const handleUpdatePassOverlayClick = (e) => {
  e.stopPropagation();
  setShowUpdatePassForm(false); // Close the Update Password form when overlay is clicked
};

// Propagation handling for Security Question Form
const handleSecQuestionOverlayClick = (e) => {
  e.stopPropagation();
  setShowSecQuestionForm(false); // Close the Security Question form when overlay is clicked
};

// Propagation handling for Security Timer Form
const handleSecTimerOverlayClick = (e) => {
  e.stopPropagation();
  setShowSecTimerForm(false); // Close the Security Timer form when overlay is clicked
};

  // Form states
  const [showUpdatePassForm, setShowUpdatePassForm] = useState(false);
  const [showSecQuestionForm, setShowSecQuestionForm] = useState(false);
  const [showSecTimerForm, setShowSecTimerForm] = useState(false);


  // Update Password Form Function
  const UpdatePasswd = ({ onClose, onSubmit, initialValues, validationSchema, setShowForm }) => {
    return (
      
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={handleUpdatePassOverlayClick}
        backgroundColor="rgba(0, 0, 0, 0.65)" // Semi-transparent black background
        zIndex={9999}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          backgroundColor={colors.primary[500]}
          borderRadius="8px"
          padding="20px"
          width="100%"
          maxWidth="600px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        >
          <Formik onSubmit={handleFormSubmit} initialValues={updatePassVals} validationSchema={updatePassSchema}>
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form onSubmit={handleFormSubmit} method='POST'>
                <Box p={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <Typography variant="h6" p={2} fontWeight={"bold"}>
                    Update Password
                  </Typography>
                </Box>
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="New Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newpasswd}
                    name="newpasswd"
                    error={!!touched.newpasswd && !!errors.newpasswd}
                    helperText={touched.newpasswd && errors.newpasswd}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Confirm New Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newpasswdConf}
                    name="newpasswdConf"
                    error={!!touched.newpasswdConf && !!errors.newpasswdConf}
                    helperText={touched.newpasswdConf && errors.newpasswdConf}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <Box gridColumn="span 4" display="flex" justifyContent="center">
                    <Button
                      type="submit"        
                      variant="contained"
                      size="small"
                      sx={{ color: 'white', padding: '10px', backgroundColor: colors.orangeAccents[500] }}
                      onClick={() => {
                        console.log('Update Password Form Values:', values); // Log the input values
                      }}
                    >
                      Update Password
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    );
  };

  //Update Questions Form
  const UpdateQuestions = ({ onClose, onSubmit, initialValues, validationSchema, setShowForm }) => {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={handleSecQuestionOverlayClick}
        backgroundColor="rgba(0, 0, 0, 0.65)" // Semi-transparent black background

      >
        <Box
          onClick={(e) => e.stopPropagation()}
          backgroundColor={colors.primary[500]}
          borderRadius="8px"
          padding="20px"
          width="100%"
          maxWidth="600px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"

        >
          <Formik 
          onSubmit={handleFormSubmit} 
          initialValues={secQuestionVals} 
          validationSchema={secQuestionsSchema}>
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form onSubmit={handleFormSubmit} method='POST'>
                <Box p={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <Typography variant="h6" p={2} fontWeight={"bold"}>
                    Update Security Question
                  </Typography>
                </Box>
                <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                
                <TextField
                  value={values.questionSelected}
                  onChange={handleQuestionChange}
                  sx={{ zIndex: 1000 }}
                  select
                  label="Select a Question"
                >
                    {securityQuestions.map((question, index) => (
                      <MenuItem key={index} value={question}>
                        {question}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>

                <TextField
                  
                  fullWidth
                  variant="filled"
                  label="Answer"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Answer}
                  name="Answer"
                  error={!!touched.Answer && !!errors.Answer}
                  helperText={touched.Answer && errors.Answer}
                  sx={{ marginBottom: '20px' }} // Add margin to separate the TextField and the button

                  
                />
                <Box gridColumn="span 4" display="flex" justifyContent="center" >
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{ color: 'white', padding: '10px', backgroundColor: colors.orangeAccents[500] }}
                    onClick={() => {
                      console.log('Update Password Form Values:', values); // Log the input values
                    }}
                  >
                    Update Security Question
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    );
  };





  const UpdateLogoutTimer = ({ onClose, onSubmit, initialValues, validationSchema, setShowForm }) => {

    return (

      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={handleSecTimerOverlayClick}
        backgroundColor="rgba(0, 0, 0, 0.65)" // Semi-transparent black background

      >
        <Box
          onClick={(e) => e.stopPropagation()}
          backgroundColor={colors.primary[500]}
          borderRadius="8px"
          padding="20px"
          width="100%"
          maxWidth="600px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        >

        <Formik
          initialValues={secTimerVals} // Initialize form values here
          validationSchema={secTimerSchema} // Define your validation schema here
          onSubmit={handleFormSubmit} // Specify the submission function
        >
          {({ values, errors, touched }) => (
            <form>
               <Box p={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <Typography variant="h6" p={2} fontWeight={"bold"}>
                    Auto-Logout Timer
                  </Typography>
                </Box>
              <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <TextField
                  value={values.timeSelected}
                  onChange={handleTimeChange}
                  sx={{ zIndex: 1000 }}
                  select
                  label="Select a Duration"
                >
                  {secTimeOptions.map((time, index) => (
                      <MenuItem key={index} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                </TextField>
              </FormControl>

              <Box gridColumn="span 4" display="flex" justifyContent="center" >
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{ color: 'white', padding: '10px', backgroundColor: colors.orangeAccents[500] }}
                    onClick={() => {
                      console.log('Update Time Form Values:', values); // Log the input values
                    }}
                  >
                    Update Security Question
                  </Button>
                </Box>
            </form>
          )}
        </Formik>

        </Box>

        </Box>
    );

  };



  return (
    <Box backgroundColor={colors.primary[500]} p={3} minHeight={"100vh"}>
    <Box m="20px">

      <Box p={2} borderRadius={"8px"} backgroundColor={colors.secondary[500]}>
        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <h2>Update Password</h2>
                <p>Change your account password for added security.</p>
              </Grid>
              <Grid item>
                <Button size={"small"} sx={buttonSx} onClick={() => setShowUpdatePassForm(!showUpdatePassForm)}>
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
                <Button size={"small"} sx={buttonSx} onClick={() => setShowSecQuestionForm(!showSecTimerForm)}>
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
                <Button  size={"small"} sx={buttonSx} onClick={() => setShowSecTimerForm(!showSecQuestionForm)}>
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
                <Button size={"small"} sx={buttonSx}>More Info</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>


        {/* Password Update Feilds */}
        {showUpdatePassForm && (
          <UpdatePasswd
            onClose={() => setShowUpdatePassForm(false)} // Close the form
            onSubmit={handleFormSubmit}
            initialValues={updatePassVals}
            validationSchema={updatePassSchema}
          />
        )}

        {/* Security Question Selector */}
        {showSecQuestionForm && (
          <UpdateQuestions
            onClose={() => setShowSecQuestionForm(false)} // Close the form
            onSubmit={handleFormSubmit}
            initialValues={secQuestionVals}
            validationSchema={secQuestionsSchema}
          />
        )}


        {/* Security Logout Timer Selector */}
        {showSecTimerForm && (
          <UpdateLogoutTimer
            onClose={() => setShowSecTimerForm(false)} // Close the form
            onSubmit={handleFormSubmit}
            initialValues={secTimerVals}
            validationSchema={secTimerSchema}
          />
        )}
      </Box>
    </Box>
    </Box>
  );
};

export default Security;
