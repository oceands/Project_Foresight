import React from "react";

import { Box, useTheme ,Toolbar, IconButton, Button} from "@mui/material";
import { DataGrid, GridToolbarQuickFilter , GridToolbarContainer, GridToolbarFilterButton} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataReports } from "../../data/mockData";
import {MdEdit} from 'react-icons/md';
import {BsTrash3Fill} from 'react-icons/bs';
import {HiDownload} from 'react-icons/hi'
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent,DialogActions,LinearProgress } from "@mui/material";

function DownloadPopup({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Download Report</DialogTitle>
      <DialogContent>
        {/* Add content for the download pop-up here */}
        <p>Click the button to start the download...</p>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}


function CustomToolbar({ setFilterButtonEl }) {
  const colors = tokens;

  const buttonSx = { // Styling for the "Create Reports" button in the toolbar
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
      Create Reports
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

const Reports = () => {

  const theme = useTheme();
  const colors = tokens;

  const [filterButtonEl, setFilterButtonEl] = useState(null);
  //const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);
  const [downloadProgressOpen, setDownloadProgressOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  // Function to open the delete confirmation dialog
  const openDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
  };

  // Function to close the delete confirmation dialog
  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };
  const handleDownloadClick = () => {
    // Open the download progress pop-up
    setDownloadProgressOpen(true);

    // Simulate a download process for demonstration purposes
    const downloadInterval = setInterval(() => {
      setDownloadProgress(prevProgress => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          clearInterval(downloadInterval);
          setDownloadProgressOpen(false);
          return 0;
        }
      });
    }, 1000);
  };
 // const openDownloadPopup = () => {
   // setDownloadPopupOpen(true);
 // };
 // const closeDownloadPopup = () => {
   // setDownloadPopupOpen(false);
 // };

  const handleDeleteConfirmed = () => {
    // Perform the deletion logic here
    // You can remove the item from your data source
    // Example: Delete the item with an API call or update the state
    closeDeleteConfirmation();
 };
  
  const columns = [
    {
      field: "id",
      headerName: "Report ID",
      disableColumnMenu: true,
      cellClassName: "name-column--cell",
      flex: 1, // Space columns equally
    },
    {
      field: "title",
      headerName: "Title",
      disableColumnMenu: true,
      cellClassName: "name-column--cell",
      flex: 1, // Space columns equally
    },
    {
      field: "IncidentID",
      headerName: "Incident ID",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "DateCreated",
      headerName: "Date Created",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
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
          <IconButton onClick={openDeleteConfirmation}>
            <BsTrash3Fill  style={{ color: colors.blueAccents[500], width: "15px", height: "15px" }}/>
          </IconButton>
        
          <div>
      <IconButton onClick={handleDownloadClick}>
        <HiDownload  style={{ color: colors.blueAccents[500], width: "15px", height: "15px" }} />
      </IconButton>

      <Dialog open={downloadProgressOpen} onClose={() => setDownloadProgressOpen(false)}  BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.1)"  } }}  >
        <DialogContent>
          <p>Downloading Report...</p>
          <LinearProgress variant="determinate" value={downloadProgress} />
          <Button onClick={() => setDownloadProgressOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

    </div>

  
          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation}  BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.1)"  } }} >
          
          <DialogTitle>Delete Report Confirmation</DialogTitle>

            <DialogContent>
             <p>Are you sure you want to delete this Report?</p>
            </DialogContent>

          <DialogActions>
             <Button onClick={handleDeleteConfirmed} variant="contained" color="error">
               Yes
            </Button>
              <Button onClick={closeDeleteConfirmation} variant="contained" color="primary">
              Cancel
            </Button>
        </DialogActions>

      </Dialog>
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
      
      rows={mockDataReports}
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

export default Reports;
