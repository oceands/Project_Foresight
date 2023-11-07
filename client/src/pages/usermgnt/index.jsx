import React from "react";
import { useEffect } from "react";
import { Box, useTheme ,Toolbar, IconButton, Button} from "@mui/material";
import { DataGrid, GridToolbarQuickFilter , GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilterButton} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockUserManagement } from "../../data/mockData";
import {MdEdit} from 'react-icons/md';
import {BsTrash3Fill} from 'react-icons/bs';
import {LuUsers} from 'react-icons/lu'
import {Typography} from "@mui/material";
import { useState } from "react";

function CustomToolbar({ setFilterButtonEl }) {
  const colors = tokens;

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

  return (

    
    <Box sx={{ flexGrow: 1, borderRadius: '8px 8px 0 0' }} backgroundColor={"#fefffe"}>
     
      <Toolbar variant="dense" disableGutters >

      <Box p={2} display={'flex'} alignItems={'center'} >
      <Button
        sx={buttonSx}
      >
      Add User
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

      </Toolbar>
    </Box>
  );
}

const Usermgnt = () => {

  const theme = useTheme();
  const colors = tokens;

  const [filterButtonEl, setFilterButtonEl] = useState(null);
  
  
  const columns = [
    {
      field: "id",
      headerName: "ID",
      disableColumnMenu: true,
      cellClassName: "name-column--cell",
      flex: 1, // Space columns equally
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email Address",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "joiningDate",
      headerName: "Joining Date",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "roleAccess",
      headerName: "Role",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "access",
      headerName: "Access",
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
    },
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
      
      rows={mockUserManagement}
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

export default Usermgnt;
