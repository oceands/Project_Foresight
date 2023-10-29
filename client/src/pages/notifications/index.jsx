import React from "react";
import { useEffect } from "react";
import { Box, useTheme, Grid, Button ,Toolbar} from "@mui/material";
import { DataGrid,GridToolbarQuickFilter , GridToolbarContainer, GridToolbarFilterButton} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataNotification } from "../../data/mockData";
import {AiFillFire} from 'react-icons/ai';
import {FaGun} from 'react-icons/fa6';
import {VscBellDot} from 'react-icons/vsc'
import {Typography} from "@mui/material";
import { useState } from "react";


import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';



// Custom toolbar for the DataGrid
function CustomToolbar({ setFilterButtonEl }) {
  return (
    <Box sx={{ flexGrow: 1 , borderRadius:"8px"}} backgroundColor={"#fefffe"}>
     
      <Toolbar variant="dense" disableGutters >

      <Box p={2} display={'flex'} alignItems={'center'} >
      <VscBellDot style={{ fontSize: '2rem' }} />
      <Typography variant="h6" p={2} fontWeight={"bold"}>All Notifications</Typography>
      </Box>

        <Box sx={{ flexGrow: 1, }} />
            <GridToolbarContainer sx={{ p: 1, display: 'flex', alignItems: 'center',}}>
              <Box p={2} >
                <GridToolbarQuickFilter variant="outlined" size={"small"}sx={{ padding: '4', borderColor:"#DCDDDD" ,color:"#202020"
                    }} />
              </Box>
              <Box p={2} >
                <GridToolbarFilterButton variant="outlined"  sx={{ padding: '4' , height:"3.125em", borderColor:"#bcbdbd", color:"#202020", '&:hover': {borderColor:"black"}, }} ref={setFilterButtonEl} />
              </Box>
            </GridToolbarContainer>

      </Toolbar>
    </Box>
  );
}



const Notifications = ({ changeWelcomeText }) => {
  useEffect(() => {
    changeWelcomeText("Notifications");
  }, []);
    const theme = useTheme();// Extract theme and colors from the MUI theme
    const colors = tokens;

    const [filterButtonEl, setFilterButtonEl] = useState(null);
    
    
    const columns = [
      // Define the columns for the DataGrid
      { field: "id", 
      headerName: "ID", 
      disableColumnMenu: true,
      cellClassName: "name-column--cell",
      },
      {
        field: "date",
        headerName: "Date/Time",
        flex: 1,
        disableColumnMenu: true,
        cellClassName: "name-column--cell",
      },
      {
        field: "type",
        headerName: "Type",
        type: "number",
        headerAlign: "left",
        align: "left",
        disableColumnMenu: true,
        cellClassName: "name-column--cell",
      },
      
      {
        field: "module",
        headerName: "Module",
        renderCell: (params) => ( 
          // Customize the rendering of the 'Module' column
          <div style={{ display: "flex", alignItems: "center" }}>
            {params.value}
            {params.value === "Fire Detection" && (
              <AiFillFire style={{ marginLeft: "4px", color: "#FFB133" }}>fire</AiFillFire>
            )}
            {params.value === "Weapon Detection" && (
              <FaGun style={{ marginLeft: "4px", color: "#FFB133" }}>fire</FaGun>
            )}
          </div>
        ),
        flex: 1,
        disableColumnMenu: true,
        cellClassName: "name-column--cell",
      },
      {
        field: "camera",
        headerName: "Camera Location",
        flex: 1,
        disableColumnMenu: true,
        cellClassName: "name-column--cell",
      },
      {
        field: "status",
        headerName: "Status",
        renderCell: (params) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                color:
                  params.value === "Active"
                    ? "green"
                    : params.value === "Reviewed"
                    ? "blue"
                    : "inherit", // Use the default color if none of the conditions match
              }}
            >
              {params.value}
            </span>
          </div>
        ),
        flex: 1,
        disableColumnMenu: true,
        cellClassName: "name-column--cell",
      },      
    ];
    return (  
      <Box backgroundColor={colors.primary[500]} p={3} minHeight={"100vh"}>

        {/*GRID FOR THE CCTV FOOTAGE*/}
        <Box p={1}  >
        <Box p={0} >

          {/*GRID CONTAINER 1 */}  
        <Grid container spacing={2}>

         {/*GRID ITEM 1.1 */} 
        <Grid  item xs={12} sm={12} md={8} lg={6} xl={4}>
        <Box
            width="100%"
            backgroundColor={colors.secondary[500]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={'1px solid '}
          >
            {/*Insert the video / RTSP FEED HERE */}
            <img
          src={"../../assets/vid-evidence.jpg"}
          alt="sample"
          style={{ maxWidth: '100%', height: 'auto' }}  // Controlling image dimensions
        />
        </Box>
        </Grid>


         {/*GRID ITEM 1.2 */} 
        <Grid  item xs={12} sm={12} md={8} lg={6} xl={4}>

        <Box 
        backgroundColor={colors.secondary[500]}
        borderRadius="8px" height={"100%"}>
        <Box
            width="100%"
            display="flex"
            alignItems="left"

          >
            <Box p={5} color={colors.blackAccents[200]}>
              <Typography variant="h6">Incident Type:</Typography>
              <Typography variant="h6">Date:</Typography>
              <Typography variant="h6">Room:</Typography>
              <Typography variant="h6">Room:</Typography>
              <Typography variant="h6">ID:</Typography>
            </Box>
            <Box p={5}>  
              <Typography variant="h6">Filler</Typography>
              <Typography variant="h6">Filler</Typography>
              <Typography variant="h6">Filler</Typography>
              <Typography variant="h6">Filler</Typography>
              <Typography variant="h6">Filler</Typography>
            </Box>
        </Box>

         {/*Buttons*/}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"  // To evenly space the buttons
            paddingTop={5}  // Adding padding for spacing
            margin="auto" // Center horizontally and vertically
          >
          <Button 
          variant="contained" 
          endIcon={<CheckIcon/>} 
          sx={{
              backgroundColor: colors.orangeAccents[500],
              color: colors.secondary[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': 
              {
                backgroundColor: colors.orangeAccents[400], // New color on hover
              },
            }}
          >
            Approve
          </Button>

          <Button 
          variant="contained" 
          endIcon={<CloseIcon/>} 
          sx={{
              backgroundColor: colors.orangeAccents[500],
              color: colors.secondary[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': 
              {
                backgroundColor: colors.orangeAccents[400], // New color on hover
              },
            }}
          >
            Deny
          </Button>
          
          <Button 
          variant="contained" 
          endIcon={<NotificationsOffIcon/>} 
          sx={{
              backgroundColor: colors.orangeAccents[500],
              color: colors.secondary[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': 
              {
                backgroundColor: colors.orangeAccents[400], // New color on hover
              },
            }}
          >
            Ignore
          </Button>
        </Box>
      </Box>
      </Grid>
          {/*GRID ITEM 1.3 */} 
        <Grid  item xs={12} sm={12} md={8} lg={6} xl={4} >
        <Box
            width="100%"
            backgroundColor={colors.secondary[500]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={'1px solid '}
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

      </Box>

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
              borderRadius:"8px"
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
            
            rows={mockDataNotification}
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

export default Notifications;