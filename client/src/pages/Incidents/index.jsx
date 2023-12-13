import React from "react";
import { useEffect } from "react";
import { Box, useTheme, Toolbar } from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataIncidents } from "../../data/mockData";
import { AiFillFire } from "react-icons/ai";
import { FaGun } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

// Custom toolbar for the data grid
function CustomToolbar({ setFilterButtonEl }) {
  return (
    <Box
      sx={{ flexGrow: 1, borderRadius: "8px 8px 0 0" }}
      backgroundColor={"#fefffe"}
    >
      <Toolbar variant="dense" disableGutters>
        <Box p={2} display={"flex"} alignItems={"center"}>
          <FaRegEye style={{ fontSize: "2rem" }} />
          <Typography variant="h6" p={2} fontWeight={"bold"}>
            All Incidents
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarContainer
          sx={{ p: 1, display: "flex", alignItems: "center" }}
        >
          <Box p={2}>
            <GridToolbarQuickFilter
              variant="outlined"
              size={"small"}
              sx={{ padding: "4", borderColor: "#DCDDDD", color: "#202020" }}
            />
          </Box>
          <Box p={2}>
            <GridToolbarFilterButton
              variant="outlined"
              sx={{
                padding: "4",
                height: "3.125em",
                borderColor: "#bcbdbd",
                color: "#202020",
                "&:hover": { borderColor: "black" },
              }}
              ref={setFilterButtonEl}
            />
          </Box>
        </GridToolbarContainer>
      </Toolbar>
    </Box>
  );
}

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user/incidents");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          const incidentsWithId = data.incidents.map((incident) => ({
            ...incident,
            id: incident.incidents_id,
          }));
          setIncidents(incidentsWithId);
        } else {
          throw new Error("Fetching incidents failed");
        }
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);
  const theme = useTheme(); // Access theme and colors from Material-UI
  const colors = tokens;

  // const approvedIncidents = useSelector(
  //   (state) => state.incidents.approvedIncidents
  // );

  const [filterButtonEl, setFilterButtonEl] = useState(null); // State to track the filter button element
  // Combine mock data with the approved incidents from the Redux store
  // const allIncidents = [...mockDataIncidents, ...approvedIncidents];

  // Columns configuration for the data grid
  const columns = [
    {
      field: "id",
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
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value}
          {params.value === "Fire Detection" && (
            <AiFillFire style={{ marginLeft: "4px", color: "#FFB133" }}>
              fire
            </AiFillFire>
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
      <Box
        p={1}
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
            color: colors.blackAccents[300],
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "15px",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.secondary[500],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.secondary[500],
            borderRadius: "0 0 8px 8px",
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
          rows={incidents}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
              placement: "bottom-end",
            },
            toolbar: {
              setFilterButtonEl,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Incidents;
