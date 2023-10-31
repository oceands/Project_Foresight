import React from "react";
import { useEffect } from "react";
import { Box,Button,TextField, Typography, Toolbar } from "@mui/material";
import { DataGrid,GridToolbarQuickFilter , GridToolbarContainer, GridToolbarFilterButton} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Formik } from 'formik';
import * as yup from 'yup';
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { mockDataDispatch} from "../../data/mockData";
import {MdEdit} from 'react-icons/md';
import {BsTrash3Fill} from 'react-icons/bs';
import {BiUserVoice} from 'react-icons/bi';

function CustomToolbar({ setFilterButtonEl }) {
  const colors = tokens;

  //This function helps to close the form when the overlay is clicked
  const handleOverlayClick = (e) => {
  e.stopPropagation();
  setShowForm(false); 
  };

  //State for showing/ hiding the form
  const [showForm, setShowForm] = React.useState(false);

 

  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  
  //Event in case the form is submitted
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

  //Adding the Dispatch Form
  const AddDispatchForm = ({onClose, onSubmit, initialValues, validationSchema, setShowForm}) => {
       
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
        
        onClick={handleOverlayClick} 
        backgroundColor="rgba(0, 0, 0, 0.65)" // Semi-transparent black background
        zIndex={9999}
      >
        
        <Box
          onClick={(e) => e.stopPropagation()}
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          padding="20px"
          width="100%"
          maxWidth="600px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        >
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange }) => (
          <form onSubmit={handleFormSubmit}>
                <Box p={1} display={'flex'} alignItems={'center'} >
                  <BiUserVoice style={{ fontSize: '2rem' }} />
                  <Typography variant="h6" p={2} fontWeight={"bold"}>Dispatch Details</Typography>
              </Box>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
            <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 4" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Type"
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
                type="IP"
                label="Number"
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
                label="Location"
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
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              
             
            <Box gridColumn="span 4" maxWidth={"100%"} display="flex" justifyContent="right" gap={"10px"}>
              <Button type="submit" 
                variant="contained"  size="small" sx={{ color: colors.orangeAccents[500], padding: '10px', backgroundColor: colors.primary[500], border: '1px solid'+colors.orangeAccents[500], width:"120px"}}>
                Help
                </Button>
                <Button type="submit" 
                color="secondary" 
                variant="contained"  size="small" sx={{ color: colors.primary[500], padding: '10px', backgroundColor: colors.orangeAccents[500], width:"120px"}}>
                Add Dispatch
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


  return (

    
    <Box sx={{ flexGrow: 1, borderRadius: '8px 8px 0 0' }} backgroundColor={"#fefffe"}>
     
      <Toolbar variant="dense" disableGutters >

      <Box p={2} display={'flex'} alignItems={'center'} >
      <Button
        onClick={() => setShowForm(!showForm)}
        sx={buttonSx}
      >
      Setup Dispatch
      </Button>
      </Box>

        <Box sx={{ flexGrow: 1 }} />
            <GridToolbarContainer sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
              <Box p={2} >
                <GridToolbarQuickFilter variant="outlined" size={"small"}sx={{ padding: '4', borderColor:"#DCDDDD" ,color:"#202020"
                    }} />
              </Box>
              <Box p={2} >
                <GridToolbarFilterButton variant="outlined"  sx={{ padding: '4' , height:"3.125em", borderColor:"#bcbdbd", color:"#202020", '&:hover': {borderColor:"black"}, }} ref={setFilterButtonEl} />
              </Box>
            </GridToolbarContainer>
            {showForm && (
         
         <AddDispatchForm
        onClose={() => setShowForm(false)} // Close the form
        onSubmit={handleFormSubmit}
        
        initialValues={initialValues}
        validationSchema={checkoutSchema}/>
            )}
      </Toolbar>
    </Box>
  );
}

const DispatchSettings = ({ changeWelcomeText }) => {
  useEffect(() => {
    changeWelcomeText("Settings / Dispatch Settings");
  }, []);
  const [rows, setRows] = React.useState(mockDataDispatch);

  const handleDelete = (id) => {
      // Filter out the row with the specified id
      const updatedRows = rows.filter((row) => row.id !== id);
      // Update the rows state
      setRows(updatedRows);
    };

  const handleEdit = (id) => {
    // Your edit logic here
    console.log(`Editing row with id ${id}`);
  };

    const colors = tokens;
    const [filterButtonEl, setFilterButtonEl] = useState(null);
    const columns = [
        
      {
        field: "name",
        headerName: "Name",
        flex: 1, // Space columns equally
        cellClassName: "name-column--cell", 
      },
      {
        field: "type",
        headerName: "Type",
        type: "number",
        headerAlign: "left",
        align: "left",
        flex: 1, // Space columns equally
        cellClassName: "name-column--cell", 
      },
      { 
        field: "number", 
        headerName: "Number", 
        flex: 1, // Space columns equally
        cellClassName: "name-column--cell", 
      },
      { 
        field: "location", 
        headerName: "Location", 
        flex: 1, // Space columns equally
        cellClassName: "name-column--cell", 
      },
      { 
        field: "description", 
        headerName: "Description", 
        flex: 1, // Space columns equally
        cellClassName: "name-column--cell", 
      },
      { 
        field: "autoDispatch", 
        headerName: "Auto Dispatch", 
        flex: 1, // Space columns equally
        cellClassName: "name-column--cell", 
      },

      { 
        field: "action", 
        headerName: "Action", 
        flex: 1, // Space columns equally
        cellClassName: "name-column--cell", 
        disableColumnMenu: true,
      renderCell: (params) => (
        <Box display="flex">
          <IconButton >
            <MdEdit style={{ color: colors.blueAccents[500], width: "15px", height: "15px" }}/>
          </IconButton>
          <IconButton>
            <BsTrash3Fill  style={{ color: colors.blueAccents[500], width: "15px", height: "15px" }}/>
          </IconButton>
        </Box>
      ),
      }
      
    ];
   

      return (
        <Box backgroundColor={colors.primary[500]} p={3} minHeight={"100vh"}>
        <Box p={1}
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "14px",
            "& .MuiDataGrid-cell:focus": {
              outline: "none", // Remove the focus outline
            },
          
          },
         
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
    
            
          },
          "& .name-column--cell": {
            backgroundColor: colors.secondary[500],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.secondary[500],
            borderBottom: "none",
            color: colors.blackAccents[300]
          },
          "& .MuiDataGrid-columnHeaderTitle": {
           
            fontSize: "15px"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.secondary[500],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.secondary[500],
            borderRadius: '0 0 8px 8px'
          },
          "& .MuiCheckbox-root": {
            color: `${colors.primary[500]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.blackAccents[100]} !important`,
            fontSize: "14px",
          },
        }}
      >
    
         <DataGrid
          
          disableColumnSelector
          disableDensitySelector
          
          rows={mockDataDispatch}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
              placement: "bottom-end",
            },
            toolbar: {
              setFilterButtonEl,
    
            }
          }}
    
          />
    
      </Box>
      </Box>
      );
};

export default DispatchSettings;

