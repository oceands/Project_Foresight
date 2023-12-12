import React, { useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import { TbReport } from "react-icons/tb";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { MdEdit } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { Formik } from "formik";

function DownloadPopup({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Download Report</DialogTitle>
      <DialogContent>
        <p>Click the button to start the download...</p>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}

function CustomToolbar({ setFilterButtonEl, onAddReportClick }) {
  const colors = tokens;

  const buttonSx = {
    backgroundColor: colors.orangeAccents[500],
    color: colors.primary[500],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px",
    minWidth: "130px",
    "&:hover": {
      backgroundColor: colors.primary[500],
      color: colors.orangeAccents[500],
      boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
    },
  };

  return (
    <Box
      sx={{ flexGrow: 1, borderRadius: "8px 8px 0 0" }}
      backgroundColor={"#fefffe"}
    >
      <Toolbar variant="dense" disableGutters>
        <Box p={2} display={"flex"} alignItems={"center"}>
          <Button sx={buttonSx} onClick={onAddReportClick}>
            Create Reports
          </Button>
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

const Reports = () => {
  const colors = tokens;
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [downloadProgressOpen, setDownloadProgressOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [incidentOptions, setIncidentOptions] = useState([]);

  const [reports, setReports] = useState([]); // State to store reports data

  const userAccount = JSON.parse(sessionStorage.getItem("user-account"));
  const user = JSON.parse(userAccount.user);
  const username = user.username;

  useEffect(() => {
    // Fetch reports data when the component mounts
    const fetchReports = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/auth/api/users/reports",
          {
            headers: {
              username: username, // Pass username in the header
            },
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.success) {
          setReports(
            data.reports.map((report) => ({
              id: report.id,
              title: report.title,
              IncidentID: report.incident_id, // Ensure field names match your column definitions
              createdBy: report.created_by,
              DateCreated: report.date_created,
              // other fields if needed
            }))
          );
        }
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    // Fetch incident IDs when the component mounts
    const fetchIncidents = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/auth/api/users/incidents"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.success) {
          setIncidentOptions(data.incidents);
        }
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchIncidents();
  }, []);

  const handleAddReportClick = () => {
    setShowForm(true);
  };
  const handleFormSubmit = (values, actions) => {
    // Construct form data for the file upload
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("incident_id", values.incident_id);
    formData.append("comments", values.comments);
    if (values.file) {
      formData.append("report_file", values.file);
    }

    // Retrieve the user account information from Session storage

    // Check if userAccount and user field exist
    if (!userAccount || !userAccount.user) {
      console.error("User information is not found in session storage.");
      return;
    }

    // Parse the user field to access the username

    // Define your API endpoint
    const API_ENDPOINT = "http://127.0.0.1:5000/auth/api/users/reports";

    // Perform the POST request
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        username: username, // Pass username in the header
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Perform actions based on response
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const AddReportForm = () => (
    <Dialog
      open={showForm}
      onClose={() => setShowForm(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 2, // Material-UI's shortcut for marginTop
          pt: 2, // Material-UI's shortcut for paddingTop
        }}
      >
        <TbReport style={{ fontSize: "2rem" }} />
        Add Report
      </DialogTitle>

      <Formik
        initialValues={{
          title: "",
          incident_id: "",
          comments: "",
          file: null,
        }}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                name="title"
                label="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                fullWidth
                margin="dense"
                sx={{ marginY: 2 }} // Adjust spacing
              />
              <TextField
                name="incident_id"
                label="Incident ID"
                select
                fullWidth
                margin="dense"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.incident_id}
                sx={{ marginY: 2 }}
              >
                {incidentOptions.map((incident) => (
                  <MenuItem
                    key={incident.incidents_id}
                    value={incident.incidents_id.toString()}
                  >
                    {incident.incidents_id}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="comments"
                label="Comments"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.comments}
                fullWidth
                multiline
                rows={4}
                margin="dense"
                sx={{ marginY: 2 }}
              />
              <input
                accept=".doc,.docx,application/msword,application/pdf"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple={false}
                type="file"
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  sx={{ marginY: 2, textTransform: "none" }}
                >
                  Upload Document
                </Button>
              </label>
              {values.file ? (
                <Box sx={{ my: 2 }}>{values.file.name}</Box>
              ) : null}
            </DialogContent>
            <DialogActions sx={{ justifyContent: "flex-end", padding: 3 }}>
              <Button
                onClick={() => setShowForm(false)}
                sx={{
                  backgroundColor: "white",
                  color: colors.orangeAccents[500],
                  border: "1px solid ${colors.orangeAccents[500]}",
                  "&:hover": {
                    backgroundColor: "#eeeeee",
                  },
                  marginRight: 2,
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                sx={{
                  backgroundColor: colors.orangeAccents[500],
                  color: "white",
                  "&:hover": {
                    backgroundColor:
                      colors.orangeAccents[700] || colors.orangeAccents[500],
                  },
                }}
              >
                Add Report
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );

  const openDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDownloadClick = () => {
    setDownloadProgressOpen(true);
    const downloadInterval = setInterval(() => {
      setDownloadProgress((prevProgress) => {
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

  const handleDeleteConfirmed = () => {
    closeDeleteConfirmation();
    // Additional logic for deletion
  };

  const columns = [
    // Column definitions

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
      field: "action",
      headerName: "Action",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box display="flex">
          <IconButton>
            <MdEdit
              style={{
                color: colors.blueAccents[500],
                width: "15px",
                height: "15px",
              }}
            />
          </IconButton>
          <IconButton onClick={openDeleteConfirmation}>
            <BsTrash3Fill
              style={{
                color: colors.blueAccents[500],
                width: "15px",
                height: "15px",
              }}
            />
          </IconButton>

          <div>
            <IconButton onClick={handleDownloadClick}>
              <HiDownload
                style={{
                  color: colors.blueAccents[500],
                  width: "15px",
                  height: "15px",
                }}
              />
            </IconButton>

            <Dialog
              open={downloadProgressOpen}
              onClose={() => setDownloadProgressOpen(false)}
              BackdropProps={{
                style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
              }}
            >
              <DialogContent>
                <p>Downloading Report...</p>
                <LinearProgress
                  variant="determinate"
                  value={downloadProgress}
                />
                <Button onClick={() => setDownloadProgressOpen(false)}>
                  Close
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteConfirmationOpen}
            onClose={closeDeleteConfirmation}
            BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.1)" } }}
          >
            <DialogTitle>Delete Report Confirmation</DialogTitle>

            <DialogContent>
              <p>Are you sure you want to delete this Report?</p>
            </DialogContent>

            <DialogActions>
              <Button
                onClick={handleDeleteConfirmed}
                variant="contained"
                color="error"
              >
                Yes
              </Button>
              <Button
                onClick={closeDeleteConfirmation}
                variant="contained"
                color="primary"
              >
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
              outline: "none",
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
            color: "${colors.primary[500]} !important",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "${colors.blackAccents[100]} !important",
            fontSize: "14px",
          },
        }}
      >
        <DataGrid
          disableColumnSelector
          disableDensitySelector
          rows={reports}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
              placement: "bottom-end",
            },
            toolbar: {
              setFilterButtonEl,
              onAddReportClick: handleAddReportClick,
            },
          }}
        />
      </Box>
      {showForm && <AddReportForm />}
    </Box>
  );
};

export default Reports;
