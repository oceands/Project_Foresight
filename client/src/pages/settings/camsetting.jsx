import React from "react";
import { useEffect } from "react";
import { Box,Button,TextField, Toolbar } from "@mui/material";
import { DataGrid,GridToolbarQuickFilter , GridToolbarContainer, GridToolbarFilterButton} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Formik } from 'formik';
import * as yup from 'yup';
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { mockDataCamera} from "../../data/mockData";
import { useState } from "react";
import {AiOutlineCamera} from 'react-icons/ai';
import {MdEdit} from 'react-icons/md';
import {BsTrash3Fill} from 'react-icons/bs';

function CustomToolbar({ setFilterButtonEl }) {

  const colors = tokens;

  //This function helps to close the form when the overlay is clicked
  const handleOverlayClick = (e) => {
  e.stopPropagation();
  setShowForm(false); 
  };

  //State for showing/ hiding the form
  const [showForm, setShowForm] = React.useState(false);

   // Regular expression for IP validation
  const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  
  //Event in case the form is submitted
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const initialValues = 
  {
    name: '',
    type: '',
    IP: '',
    MAC: '',
    Owner: '',
    Description: '',
  };


  const checkoutSchema = yup.object().shape({

  name: yup.string().required('Required'),
  type: yup.string().required('Required'),
  IP: yup.string().email('Invalid IP!').required('Required'),
  MAC: yup.string().matches(phoneRegExp, 'MAC is not valid!').required('Required'),
  Owner: yup.string().required('Required'),
  Description: yup.string().required('Required'),

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
  //Adding the Camera Form
  const AddCameraForm = ({ onClose, onSubmit, initialValues, validationSchema, setShowForm}) => 
  {      
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
        backgroundColor={colors.primary[500]}
        borderRadius="8px"
        padding="20px"
        maxWidth="600px"
        height={"700px"}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      >
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
      {({ values, errors, touched, handleBlur, handleChange }) => (
        <form onSubmit={handleFormSubmit}>
             <Box p={1} display={'flex'} alignItems={'center'} >
                <AiOutlineCamera style={{ fontSize: '2rem' }} />
                <Typography variant="h6" p={2} fontWeight={"bold"}>Camera Details</Typography>
              </Box>
          <Box display="grid" gap="25px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" p={4}>

          {/*Text feild 1*/}
          <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Camera's Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Name}
              name="Name"
              error={!!touched.Name && !!errors.Name}
              helperText={touched.Name && errors.Name}
              sx={{ gridColumn: "span 4" }}
              size="small"
            />
            {/*Text feild 2*/}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Camera's Type"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Type}
              name="Type"
              error={!!touched.Type && !!errors.Type}
              helperText={touched.Type && errors.Type}
              sx={{ gridColumn: "span 4" }}
              size="small"
            />

        
            {/*Text feild 3*/}
            <TextField
              

              fullWidth
              variant="filled"
              type="IP"
              label="Camera's IP Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.IP}
              name="IP"
              error={!!touched.IP && !!errors.IP}
              helperText={touched.IP && errors.IP}
              sx={{ gridColumn: "span 2",}}
              size="small"
            />
            {/*Text feild 4*/}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Camera's MAC Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.MAC}
              name="MAC"
              error={!!touched.MAC && !!errors.MAC}
              helperText={touched.MAC && errors.MAC}
              sx={{ gridColumn: "span 2", }}
              size="small"
            />


            {/*Text feild 5*/}
             <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Owner Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Owner}
              name="Owner"
              error={!!touched.Owner && !!errors.Owner}
              helperText={touched.Owner && errors.Owner}
              sx={{ gridColumn: "span 4" }}
              size="small"
            />
            {/*Text feild 6*/}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Description}
              name="Description"
              error={!!touched.Description && !!errors.Description}
              helperText={touched.Description && errors.Description}
              sx={{ 
                gridColumn: "span 4",
                ".MuiInputBase-input": {
                  height: "8rem" // You can adjust the height as needed
                }
              }}
            />


            <Box gridColumn="span 4" maxWidth={"100%"} display="flex" justifyContent="right" gap={"10px"}>
            <Button type="submit" 
              variant="contained"  size="small" sx={{ color: colors.orangeAccents[500], padding: '10px', backgroundColor: colors.primary[500], border: '1px solid'+colors.orangeAccents[500], width:"120px"}}>
              Help
              </Button>
              <Button type="submit" 
              variant="contained"  size="small" sx={{ color: colors.primary[500], padding: '10px', backgroundColor: colors.orangeAccents[500], width:"120px"}}>
              Add Camera
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
      Setup Camera
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
         
         <AddCameraForm
        onClose={() => setShowForm(false)} // Close the form
        onSubmit={handleFormSubmit}
        
        initialValues={initialValues}
        validationSchema={checkoutSchema}/>
            )}
      </Toolbar>
    </Box>
  );
}


const CameraSettings = ({ changeWelcomeText }) => {
  useEffect(() => {
    changeWelcomeText("Settings / Camera Settings");
  }, []);
  const [rows, setRows] = React.useState(mockDataCamera);

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
        field: "IP", 
      headerName: "IP", 
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      },
      { 
        field: "MAC", 
        headerName: "MAC", 
        flex: 1, // Space columns equally
        cellClassName: "name-column--cell",
      },
      { 
        field: "Owner", 
        headerName: "Owner", 
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
          field: "Status", 
          headerName: "Status", 
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
            <IconButton>
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
        
        rows={mockDataCamera}
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

export default CameraSettings;

