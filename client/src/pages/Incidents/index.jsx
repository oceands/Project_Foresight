import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Icon from '@mui/icons-material/LocalFireDepartmentOutlined';
import CalendarIcon from '@mui/icons-material/DateRangeOutlined';
import Header from "../../components/Header";

const Incidents = () => {
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
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="INCIDENTS"/>
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
            backgroundColor: colors.primary[400],
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

          }}
          
        />
      </Box>
    </Box>
  );
};

export default Incidents;
