import React from "react";
import { Box,Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";


const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 
  const columns = [
    { field: "id", headerName: "Report ID" },
    {
      field: "name",
      headerName: "Title",
      width: 200,
      cellClassName: "name-column--cell",
      flex: 0.5
    },
    { field: "email", headerName: "Date Created", width: 200 },
    { field: "phone", headerName: "Incident ID", width: 100 },

    {
      field: "cost",
      headerName: "Created By",
      width: 100,
      renderCell: ({ row: { cost } }) => {
        return <Typography color={colors.pinkAccents[500]}>${cost}</Typography>;
      },
    },
    { field: "date", headerName: "Status", width: 100 },
    {field: "action", headerName: "Action", width: 100,},
  ];
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="REPORTS" subtitle="welcome to your Reports" />
      <Button
            sx={{
              backgroundColor: colors.purpleAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
            }}
          >
             
            Create Report
          </Button>

      </Box>
      <Box
        m="8px 0 0 0"
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
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />

      </Box>
    </Box>
  );
};

export default Reports;