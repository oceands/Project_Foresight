import React from "react";
import { Box,Button,TextField, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import { mockDataDispatch} from "../../data/mockData";

const DispatchSettings = () => {
    const handleDelete = (id) => {
        // Filter out the row with the specified id
        const updatedRows = rows.filter((row) => row.id !== id);
        
        // Update the rows state
        setRows(updatedRows);
      };
      
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    setShowForm(false); // Close the form when overlay is clicked
  };

    
      const [showForm, setShowForm] = React.useState(false);
      const [rows, setRows] = React.useState(mockDataDispatch);

      const handleEdit = (id) => {
        // Your edit logic here
        console.log(`Editing row with id ${id}`);
      };

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

    const theme = useTheme();

    const colors = tokens(theme.palette.mode);
    
    const columns = [
        
      {
        field: "name",
        headerName: "Name",
        flex:1
      },
      {
        field: "type",
        headerName: "Type",
        type: "number",
        headerAlign: "left",
        align: "left",
       flex:1
      },
      { field: "number", headerName: "Number", flex:1 },
      { field: "location", headerName: "Location", flex:1},
      { field: "description", headerName: "Description", flex:1 },
      { field: "autoDispatch", headerName: "Auto Dispatch", flex:1,
        cellClassName: "name-column--cell", },

      { field: "action", headerName: "Action", flex:1 ,    renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>)}
      
    ];
   
    const AddCameraForm = ({ onClose, onSubmit, initialValues, validationSchema, setShowForm}) => {
       
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
                   <Header title="Dispatch Form" />
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
                  
                 
                  <Box gridColumn="span 4" display="flex" justifyContent="center">
                  <Button type="submit" 
                  color="secondary" 
                  variant="contained" fullWidth sx={{ color: 'white', padding: '10px'}}>
                   Submit
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
        
        <Box m="20px">
            
       <Box display="flex" justifyContent="space-between" alignItems="center">
        
        <Header title="DISPATCH SETTINGS"/>
    
      </Box>
      <Box display="flex">
        
      <Box
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
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "#4f4f95",
              "&:hover": {
                backgroundColor: "#4f4f95", // Keep the same color on hover
              },
            },
          },
         
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#8cd2c6",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.purpleAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
           
            fontSize: "15px"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#26264F"
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.purpleAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.pinkAccents[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
            fontSize: "14px",
            padding: "20px 4px 20px"
            
          },
        }}
       
      >
        <Button
     
    type="addcamera"
    color="secondary" 
    variant="contained" 
    sx={{ color: 'white',  
    padding: '6px 12px', 
    fontSize: '12px',
    minWidth: '120px', }}  
    onClick={() => setShowForm(!showForm)} >
        
      Setup Dispatch
      </Button>
         <DataGrid
          rows={mockDataDispatch}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(params) => {
            // Handle row click here
            console.log("Row clicked:", params.row);

          }}
          
        />
      </Box>
      
      {showForm && (
         
         <AddCameraForm
        onClose={() => setShowForm(false)} // Close the form
        onSubmit={handleFormSubmit}
        
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      
      />
            )}
              </Box>
      
    </Box>
  );
};

export default DispatchSettings;

