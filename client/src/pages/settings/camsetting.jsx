import React from "react";
import { Box,Button,TextField, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import { mockDataCamera} from "../../data/mockData";

const CameraSettings = () => {
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
      const [rows, setRows] = React.useState(mockDataCamera);

      const handleEdit = (id) => {
        // Your edit logic here
        console.log(`Editing row with id ${id}`);
      };

    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const handleFormSubmit = (values) => {
      console.log(values);


    };
    const initialValues = {
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
      { field: "IP", headerName: "IP", flex:1 },
      { field: "MAC", headerName: "MAC", flex:1},
      { field: "Owner", headerName: "Owner", flex:1},
        { field: "description", headerName: "Description", flex:1},
        { field: "Status", headerName: "Status", flex:1 ,
        cellClassName: "name-column--cell"},
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
                   <Header title="Camera Form" />
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
             
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Name}
                    name="Name"
                    error={!!touched.Name && !!errors.Name}
                    helperText={touched.Name && errors.Name}
                    sx={{ gridColumn: "span 4" }}
                  />
                 
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Type}
                    name="Type"
                    error={!!touched.Type && !!errors.Type}
                    helperText={touched.Type && errors.Type}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="IP"
                    label="IP"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.IP}
                    name="IP"
                    error={!!touched.IP && !!errors.IP}
                    helperText={touched.IP && errors.IP}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="MAC"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.MAC}
                    name="MAC"
                    error={!!touched.MAC && !!errors.MAC}
                    helperText={touched.MAC && errors.MAC}
                    sx={{ gridColumn: "span 4" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Owner"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Owner}
                    name="Owner"
                    error={!!touched.Owner && !!errors.Owner}
                    helperText={touched.Owner && errors.Owner}
                    sx={{ gridColumn: "span 4" }}
                  />
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
                    sx={{ gridColumn: "span 4" }}
                  />
                 
                  <Box gridColumn="span 4" display="flex" justifyContent="center">
                  <Button type="submit" 
                  color="secondary" 
                  variant="contained" fullWidth sx={{ color: 'white', padding: '10px'}}>
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
        
        <Box m="20px">
            
       <Box display="flex" justifyContent="space-between" alignItems="center">
        
        <Header title="CAMERA SETTINGS"/>
    
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
            backgroundColor: "#7C7CEA",
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
        
    Setup / Add Camera
      </Button>
         <DataGrid
          rows={mockDataCamera}
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
        validationSchema={checkoutSchema}/>
            )}
              </Box>
      
    </Box>
  );
};

export default CameraSettings;

