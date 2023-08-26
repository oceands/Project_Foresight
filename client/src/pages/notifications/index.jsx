import React from "react";
import { Box, useTheme, Grid, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Icon from '@mui/icons-material/LocalFireDepartmentOutlined';
import CalendarIcon from '@mui/icons-material/DateRangeOutlined';
import Header from "../../components/Header";


import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

const Notifications = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const columns = [
      
      { field: "incidentID", headerName: "ID", disableColumnMenu: true,},
      {
        field: "incidentDateTime",
        headerName: "Date/Time",
        renderCell: (params) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <CalendarIcon style={{ marginRight: "4px" }}>your_icon_name_here</CalendarIcon>
            {params.value}
          </div>
        ),
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "incidentType",
        headerName: "Type",
        type: "number",
        headerAlign: "left",
        align: "left",
        disableColumnMenu: true,
      },
      
      {
        field: "incidentModule",
        headerName: "Module",
        renderCell: (params) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {params.value}
            {params.value === "Fire" && (
              <Icon style={{ marginLeft: "4px", color: "#FFB133" }}>fire</Icon>
            )}
            {/* Add more conditions for other icons */}
          </div>
        ),
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "incidentCamera",
        headerName: "Camera Location",
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "incidentStatus",
        headerName: "Status",
        flex: 1,
        cellClassName: "name-column--cell",
        disableColumnMenu: true,
  
      },
      
    ];
    return (  
      <Box m="20px" >
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="NOTIFICATIONS"/>
        </Box>  

        {/*GRID FOR THE CCTV FOOTAGE*/}

        <Box p={2} backgroundColor= {colors.primary[400]} >
        <Box p={1} >

        <Grid container spacing={2}>
        <Grid  item xs={12} sm={12} md={8} lg={6} xl={4} >
        <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/*Insert the video / RTSP FEED HERE */}
            <img
          src={"../../assets/vid-evidence.jpg"}
          alt="sample"
          style={{ maxWidth: '100%', height: 'auto' }}  // Controlling image dimensions
        />
        </Box>
        </Grid>
        <Grid  item xs={12} sm={12} md={8} lg={6} xl={4} >
        <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/*Insert the video / RTSP FEED HERE */}
            <img
          src={"../../assets/vid-evidence.jpg"}
          alt="sample"
          style={{ maxWidth: '100%', height: 'auto' }}  // Controlling image dimensions
        />
        </Box>
        </Grid>
        <Grid  item xs={12} sm={12} md={8} lg={6} xl={4} >
        <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/*Insert the video / RTSP FEED HERE */}
            <img
          src={"../../assets/vid-evidence.jpg"}
          alt="sample"
          style={{ maxWidth: '100%', height: 'auto' }}  // Controlling image dimensions
        />
        </Box>
        </Grid>
      </Grid>
      </Box>

      {/*Buttons*/}
      <Box
        width="50%"
        display="flex"
        alignItems="center"
        justifyContent="space-around"  // To evenly space the buttons
        padding={2}  // Adding padding for spacing
        margin="auto" // Center horizontally and vertically
      >
        <Button 
        variant="contained" 
        endIcon={<CheckIcon sx={{ color:"green" }}/>} 
        sx={{
            backgroundColor: colors.pinkAccents[500],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            '&:hover': 
            {
              backgroundColor: colors.pinkAccents[600], // New color on hover
            },
          }}
        >
          Approve
        </Button>

        <Button 
        variant="contained" 
        endIcon={<CloseIcon sx={{ color:"red" }}/>} 
        sx={{
            backgroundColor: colors.pinkAccents[500],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            '&:hover': 
            {
              backgroundColor: colors.pinkAccents[600], // New color on hover
            },
          }}
        >
          Deny
        </Button>
        
        <Button 
        variant="contained" 
        endIcon={<NotificationsOffIcon sx={{ color:"yellow" }}/>} 
        sx={{
            backgroundColor: colors.pinkAccents[500],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            '&:hover': 
            {
              backgroundColor: colors.pinkAccents[600], // New color on hover
            },
          }}
        >
          Ignore
        </Button>
      </Box>
      </Box>

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
            },
          }}
        >
           <DataGrid
            rows={mockDataContacts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            onRowClick={(params) => {
              // Handle row click here
              console.log("Row clicked:", params.row);
  
            }}/>

        </Box>
      </Box>
    );
};

export default Notifications;