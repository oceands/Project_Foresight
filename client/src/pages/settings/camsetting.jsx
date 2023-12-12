import React from "react";
import { useEffect } from "react";
import { Box, Button, MenuItem, TextField, Toolbar } from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import axiosInstance from "../../api/axios";

function CustomToolbar({ setFilterButtonEl, fetchCameras }) {
  const colors = tokens;

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    setShowForm(false);
  };

  const [showForm, setShowForm] = React.useState(false);

  const ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  const portRegex = /^([1-9]\d{0,4}|[1-5]\d{4}|[1-6][0-5][0-5][0-3][0-5])$/;

  const handleFormSubmit = (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      axiosInstance
        .post("user/settings/camsettings/add", {
          CameraName: values.name,
          CameraType: values.type,
          IPAddress: values.IP,
          Port: values.Port,
          OwnerName: values.Owner,
          Option: values.Option,
          Description: values.Description,
        })
        .then(function (response) {
          if (response.data.success) {
            // Handle success
            console.log("Camera added successfully:", response.data.message);
            alert("Camera added successfully");
            setStatus({ success: true });
            setSubmitting(false);
            fetchCameras();
            setShowForm(false);
          } else {
            // Handle failure
            console.error("Failed to add camera:", response.data.msg);
            alert(`Failed to add camera: ${response.data.msg}`);
            setStatus({ success: false });
            setErrors({ submit: response.data.msg });
            setSubmitting(false);
          }
        })
        .catch(function (error) {
          // Handle error
          console.error("Error adding camera:", error);
          alert("Error adding camera. Please try again.");
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        });
    } catch (err) {
      // Handle unexpected error
      console.error(err);
      alert("Error adding camera. Please try again.");
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const [selectedType, setselectedType] = useState(""); // State to hold the selected question

  const handleTypeChange = (event) => {
    setselectedType(event.target.value);
  };

  const initialValues = {
    name: "",
    type: selectedType,
    IP: "",
    Port: "",
    Owner: "",
    Option: "",
    Description: "",
  };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
    type: yup.string().required("Required"),
    IP: yup
      .string()
      .matches(ipAddressRegex, "Invalid IP!")
      .required("Required"),
    Port: yup.string().matches(portRegex, "Port is not valid!"),
    Owner: yup.string().required("Required"),
    Option: yup.string(),
    Description: yup.string().required("Required"),
  });

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
  //Adding the Camers Form
  const AddCameraForm = ({
    onClose,
    onSubmit,
    initialValues,
    validationSchema,
    setShowForm,
  }) => {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={handleOverlayClick}
        backgroundColor="rgba(0, 0, 0, 0.65)"
        zIndex={9999}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          backgroundColor={colors.primary[500]}
          borderRadius="8px"
          padding="20px"
          maxWidth="600px"
          height={"700px"}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box p={1} display={"flex"} alignItems={"center"}>
                  <AiOutlineCamera style={{ fontSize: "2rem" }} />
                  <Typography variant="h6" p={2} fontWeight={"bold"}>
                    Camera Details
                  </Typography>
                </Box>
                <Box
                  display="grid"
                  gap="25px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  p={4}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Camera's Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name} // Adjusted from 'values.Name'
                    name="name" // Adjusted from 'values.Name'
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    select
                    variant="filled"
                    type="text"
                    label="Camera's Type"
                    onBlur={handleBlur}
                    onChange={handleTypeChange}
                    value={values.type} // Adjusted from 'values.Type'
                    name="type" // Adjusted from 'values.Type'
                    error={!!touched.type && !!errors.type}
                    helperText={touched.type && errors.type}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    SelectProps={{
                      MenuProps: {
                        style: { zIndex: 9999 },
                      },
                    }}
                    size="small"
                  >
                    <MenuItem value="Indoors">Indoors</MenuItem>
                    <MenuItem value="Outdoors">Outdoors</MenuItem>
                  </TextField>

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text" // Adjusted from 'IP'
                    label="Camera's IP Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.IP}
                    name="IP"
                    error={!!touched.IP && !!errors.IP}
                    helperText={touched.IP && errors.IP}
                    sx={{ gridColumn: "span 2" }}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Camera's Port"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Port}
                    name="Port"
                    error={!!touched.Port && !!errors.Port}
                    helperText={touched.Port && errors.Port}
                    sx={{ gridColumn: "span 2" }}
                    size="small"
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Owner Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Owner}
                    name="Owner"
                    error={!!touched.Owner && !!errors.Owner}
                    helperText={touched.Owner && errors.Owner}
                    sx={{ gridColumn: "span 2" }}
                    size="small"
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Optional"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Option}
                    name="Option"
                    error={!!touched.Option && !!errors.Option}
                    helperText={touched.Option && errors.Option}
                    sx={{ gridColumn: "span 4" }}
                    size="small"
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Description}
                    name="Description"
                    error={!!touched.Description && !!errors.Description}
                    helperText={touched.Description && errors.Description}
                    sx={{
                      gridColumn: "span 4",
                      ".MuiInputBase-input": {
                        height: "8rem",
                      },
                    }}
                  />

                  <Box
                    gridColumn="span 4"
                    maxWidth={"100%"}
                    display="flex"
                    justifyContent="right"
                    gap={"10px"}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      sx={{
                        color: colors.orangeAccents[500],
                        padding: "10px",
                        backgroundColor: colors.primary[500],
                        border: "1px solid" + colors.orangeAccents[500],
                        width: "120px",
                      }}
                    >
                      Help
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      sx={{
                        color: colors.primary[500],
                        padding: "10px",
                        backgroundColor: colors.orangeAccents[500],
                        width: "120px",
                      }}
                    >
                      Add Camera
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{ flexGrow: 1, borderRadius: "8px 8px 0 0" }}
      backgroundColor={"#fefffe"}
    >
      <Toolbar variant="dense" disableGutters>
        <Box p={2} display={"flex"} alignItems={"center"}>
          <Button onClick={() => setShowForm(!showForm)} sx={buttonSx}>
            Setup Camera
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
        {showForm && (
          <AddCameraForm
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          />
        )}
      </Toolbar>
    </Box>
  );
}

const CameraSettings = () => {
  const [Camera, setCamera] = useState([]);

  const handleDelete = async (id) => {
    try {
      // Make a request to your backend to delete the camera
      const response = await axiosInstance.delete(
        `/user/settings/camsettings/delete/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Camera deleted successfully:", response.data.message);
        alert("Camera deleted successfully");
        fetchCameras();
      } else {
        // Handle error scenario
        console.error("Failed to delete camera:", response.data.message);
      }
    } catch (error) {
      // Handle unexpected error
      console.error("Error deleting camera:", error.message);
    }
  };

  const fetchCameras = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/user/settings/camsettings"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      if (result.success && Array.isArray(result.camera)) {
        setCamera(result.camera);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (error) {
      console.error("There was an error fetching camera:", error);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []); // Dependencies array

  const colors = tokens;
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
    },
    {
      field: "CameraName",
      headerName: "Name",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
    },
    {
      field: "CameraType",
      headerName: "Type",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
    },
    {
      field: "IPAddress",
      headerName: "IP",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
    },
    {
      field: "Port",
      headerName: "Port",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
    },
    {
      field: "OwnerName",
      headerName: "Owner",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
    },
    {
      field: "Option",
      headerName: "Option",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
    },
    {
      field: "Description",
      headerName: "Description",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
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
          <IconButton>
            <BsTrash3Fill
              onClick={() => handleDelete(params.row.id)}
              style={{
                color: colors.blueAccents[500],
                width: "15px",
                height: "15px",
              }}
            />
          </IconButton>
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
          rows={Camera}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
              placement: "bottom-end",
            },
            toolbar: {
              setFilterButtonEl,
              fetchCameras,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CameraSettings;
