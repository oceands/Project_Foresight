import React from "react";
import { useContext } from "react";
import { Box,Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ColorModeContext, tokens} from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


import { useProSidebar } from "react-pro-sidebar";


const Usermgnt = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const colorMode = useContext(ColorModeContext);

  const { toggleSidebar, broken, rtl } = useProSidebar();
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
      flex: 0.20
      
    },
   
    {
      field: "role",
      headerName: "ROLE",
      flex: 0.20,
      className: 'role-padding-right',
      
      
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
    
    <Box>
      
       <Box display="flex" justifyContent="space-between" //TOPBAR STARTS HERE AND ENDS LINE 144

       
       sx={{ backgroundColor: colors.primary[400], 
        paddingTop: '20px',  // Increase the top padding to 20px
        paddingLeft: '20px', // Increase the left padding to 20px
        paddingRight: '20px', // Increase the right padding to 20px
        paddingBottom: '40px',

      borderBottom: '1px solid #DCDDDD !important',
    
    }}>
      
    <Box display="flex" >
      {broken && !rtl && (
        <IconButton
          sx={{ margin: "0 6 0 2" }}
          onClick={() => toggleSidebar()}
        >
          <MenuOutlinedIcon />
        </IconButton>
        
      )}
   
    </Box>
    <Box display="flex">

      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          
         <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
      <IconButton>
        <NotificationsOutlinedIcon />
      </IconButton>
      <IconButton>
        <PersonOutlinedIcon />
      </IconButton>
      {broken && rtl && (
        <IconButton
          sx={{ margin: "0 6 0 2" }}
          onClick={() => toggleSidebar()}
        >
          <MenuOutlinedIcon />
        </IconButton>
      )}
    </Box>
  </Box>


      <Box 
        m="8px 0 0 0"
        height="80vh"
        sx={{
          marginLeft: "25px",
          marginRight: "30px",
          marginTop: "100px",
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
          "& .MuiDataGrid-cell--withRenderer": {
            paddingRight: "30px",
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
            fontSize: "15px",

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
           '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          "& .MuiDataGrid-cell": {
            
  borderBottom: "1px solid #E0E0E0", 
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            fontSize: "13px",
            padding: "20px 4px 20px"
            
          },
// ...

          
        }}
      >

        <Box display="flex" justifyContent="space-between" width="99%" paddingBottom="30px">
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >  <IconButton type="button">
        <SearchIcon />
      </IconButton>
          <InputBase sx={{ flex: 1 }} placeholder="Search" />
        
        </Box>
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

        <DataGrid rows={mockDataTeam} columns={columns} 
          components={{ Toolbar: GridToolbar }}/>
      </Box>
    </Box>
  );
};

export default Usermgnt;
