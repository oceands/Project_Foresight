import React from "react";
import { Box,Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


const Usermgnt = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "name",
      headerName: "NAME",
      flex: 0.3,
      cellClassName: 'name-padding-left',
      headerClassName: 'name-header-padding-left'
      
     
    },
    { field: "email", headerName: "EMAIL ADDRESS", flex: 0.3,},
    { field: "location", headerName: "LOCATION", flex: 0.25},
    {
      field: "dateJoined",
      headerName: "JOINING DATE",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.25
      
    },
   
    {
      field: "role",
      headerName: "ROLE",
      flex: 0.20,
      
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.pinkAccents[800]
                : colors.pinkAccents[600]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon className="admin-icon"/>}
            {role === "manager" && <SecurityOutlinedIcon className="security-icon"/>}
            {role === "user" && <LockOpenOutlinedIcon className="lock-icon"/>}
            <Typography color={colors.primary[400]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    
    
  ];
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header  title="USER MANAGEMENT" />
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "15px",
            "& .MuiDataGrid-cell:focus": {
              outline: "none", // Remove the focus outline
            },
          },
         
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#8cd2c6",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[400],
            borderBottom: "none",
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            color: "#808080"
            
           
          },
          "& .MuiDataGrid-columnHeaderTitle": {
           
            fontSize: "15px"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: `${colors.primary[400]} !important`,
            
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[400],
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            fontSize: "15px"
          },
          "& .MuiCheckbox-root": {
            color: `${colors.pinkAccents[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
            fontSize: "14px",
          },
          "& .name-padding-left": {
            paddingLeft: "50px",
          },
          "& .name-header-padding-left": {
            paddingLeft: "50px",
          },
          "& .MuiTablePagination-root": {
            marginRight: "auto",
            paddingLeft: "24px",

            fontSize: "15px"
            
          },
          "& .MuiTablePagination-selectLabel": {
         
            fontSize: "15px"
          },
         "& .MuiTablePagination-displayedRows": {
            marginLeft: "9cm",
            marginRight: "40px",
            fontSize: "15px"

          },
          "& .MuiTablePagination-actions": {
            marginLeft: "11cm",
            fontSize: "15px"

          },
          "& .admin-icon": {
           color: colors.primary[400]
          },
          "& .security-icon": {
            color: colors.primary[400]
           },
           "& .lock-icon": {
            color: colors.primary[400]
           },
           '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          "& .MuiDataGrid-cell": {
            
  borderBottom: "1px solid #E0E0E0", 
          },
// ...

          
        }}
      >
        <Box display="flex" justifyContent="flex-end" width="99%" paddingBottom="30px">
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
           <IconButton type="button">
             <SearchIcon />
           </IconButton>
    <Button
     
     type="addcamera"
     color="secondary" 
     variant="contained" 
     
     sx={{ color: 'white',  
     backgroundColor: colors.pinkAccents[800],
     padding: '6px 12px', 
     fontSize: '12px',
     minWidth: '120px',
     '&:hover': {
      backgroundColor: '#ffccc4'  // setting the background color on hover
  } }}   >
         
       + ADD USER
    </Button>
</Box>

        <DataGrid rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Usermgnt;
