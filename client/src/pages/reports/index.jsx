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
import { mockDataInvoices} from "../../data/mockData";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const Report = () => {
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
      const [rows, setRows] = React.useState(mockDataInvoices);

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
      dateCreated: '',
      incidentID: '',
      cost: '',
      status: '',
    };
    const checkoutSchema = yup.object().shape({
      reportID: yup.string().required('Required'),
      title: yup.string().required('Required'),
      email: yup.string().email('Invalid email!').required('Required'),
      contact: yup.string().matches(phoneRegExp, 'Phone number is not valid!').required('Required'),
      address1: yup.string().required('Required'),
      address2: yup.string().required('Required'),
    });

    const theme = useTheme();

    const colors = tokens(theme.palette.mode);
    
    const columns = [
        
      {
        field: "reportID",
        headerName: "Report ID",
        flex:1
      },
      {
        field: "title",
        headerName: "Title",
        type: "text",
        headerAlign: "left",
        align: "left",
       flex:1
      },
      { field: "dateCreated", headerName: "Date Created", flex:1 },
      { field: "incidentID", headerName: "Incident ID", flex:1},
      { field: "cost", headerName: "Created By", flex:1 },
      { field: "status", headerName: "Status", flex:1,
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
              backgroundColor="#373954"
              borderRadius="8px"
              padding="20px"
              width="100%"
              maxWidth="600px"
              boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
            >
              <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form onSubmit={handleFormSubmit}>
                   <Header title="Report Forms" />
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="reportID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.reportID}
                    name="reportID"
                    error={!!touched.reportID && !!errors.reportID}
                    helperText={touched.reportID && errors.reportID}
                    sx={{ gridColumn: "span 4" }}
                  />
                 
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    name="title"
                    error={!!touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    sx={{ gridColumn: "span 4" }}
                  />
                  
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              
                  <DatePicker />
                </LocalizationProvider>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="incidentID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.incidentID}
                    name="incidentID"
                    error={!!touched.incidentID && !!errors.incidentID}
                    helperText={touched.incidentID && errors.incidentID}
                    sx={{ gridColumn: "span 4" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="cost"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cost}
                    name="cost"
                    error={!!touched.cost && !!errors.cost}
                    helperText={touched.cost && errors.cost}
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
        
        <Header title="Reports"/>
    
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
            backgroundColor: "#7C7CEA",
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
        
     Create Report
      </Button>
         <DataGrid
          rows={mockDataInvoices}
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

export default Report;

