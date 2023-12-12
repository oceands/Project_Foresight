import React from "react";
import { Box, Button, TextField, Typography, Toolbar } from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import { BiUserVoice } from "react-icons/bi";
import axiosInstance from "../../api/axios";
import { useEffect } from "react";

function CustomToolbar({ setFilterButtonEl, fetchDispatch }) {
  const colors = tokens;

  //This function helps to close the form when the overlay is clicked
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    setShowForm(false);
  };

  //State for showing/ hiding the form
  const [showForm, setShowForm] = React.useState(false);

  const phoneRegExp = /^\d{3,5}$/;

  //Event in case the form is submitted
  const handleFormSubmit = (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      axiosInstance
        .post("user/settings/dispatchsettings/add", {
          Name: values.name,
          Type: values.type,
          Number: values.number,
          Location: values.location,
          Description: values.description,
        })
        .then(function (response) {
          if (response.data.success) {
            // Handle success
            console.log("Dispatch added successfully:", response.data.message);
            alert("Dispatch added successfully");
            setStatus({ success: true });
            setSubmitting(false);
            fetchDispatch();
            setShowForm(false);
          } else {
            // Handle failure
            console.error("Failed to add dispatch:", response.data.msg);
            alert(`Failed to add dispatch: ${response.data.msg}`);
            setStatus({ success: false });
            setErrors({ submit: response.data.msg });
            setSubmitting(false);
          }
        })
        .catch(function (error) {
          // Handle error
          console.error("Error adding Dispatch:", error);
          alert("Error adding dispatch. Please try again.");
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        });
    } catch (err) {
      // Handle unexpected error
      console.error(err);
      alert("Error adding dispatch. Please try again.");
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const initialValues = {
    name: "",
    type: "",
    number: "",
    location: "",
    description: "",
  };
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
    type: yup.string().required("Required"),
    number: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid!")
      .required("Required"),
    location: yup.string().required("Required"),
    description: yup.string().required("Required"),
  });

  const buttonSx = {
    backgroundColor: colors.orangeAccents[500],
    color: colors.primary[500],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px", // Remove horizontal padding
    minWidth: "130px", // Set a fixed width for all buttons
    "&:hover": {
      backgroundColor: colors.primary[500], // New color on hover
      color: colors.orangeAccents[500],
      boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
    },
  };

  //Adding the Dispatch Form
  const AddDispatchForm = ({
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
          backgroundColor={colors.primary[400]}
          borderRadius="8px"
          padding="20px"
          width="100%"
          maxWidth="600px"
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
                  <BiUserVoice style={{ fontSize: "2rem" }} />
                  <Typography variant="h6" p={2} fontWeight={"bold"}>
                    Dispatch Details
                  </Typography>
                </Box>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Dispatch Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.type}
                    name="type"
                    error={!!touched.type && !!errors.type}
                    helperText={touched.type && errors.type}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="IP"
                    label="Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.number}
                    name="number"
                    error={!!touched.number && !!errors.number}
                    helperText={touched.number && errors.number}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={!!touched.location && !!errors.location}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: "span 4" }}
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
                      Add Dispatch
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
            Setup Dispatch
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
          <AddDispatchForm
            onClose={() => setShowForm(false)} // Close the form
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          />
        )}
      </Toolbar>
    </Box>
  );
}

const DispatchSettings = () => {
  const [Dispatch, setDispatch] = useState([]);

  const handleDelete = async (id) => {
    try {
      // Make a request to your backend to delete the despatch
      const response = await axiosInstance.delete(
        `/user/settings/dispatchsettings/delete/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Dispatch deleted successfully:", response.data.message);
        alert("Dispatch deleted successfully");
        fetchDispatch();
      } else {
        // Handle error scenario
        console.error("Failed to delete dispatch:", response.data.message);
      }
    } catch (error) {
      // Handle unexpected error
      console.error("Error deleting dispatch:", error.message);
    }
  };

  const fetchDispatch = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/user/settings/dispatchsettings"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result.success);
      console.log(result);
      console.log(result.success && Array.isArray(result.dispatch));
      if (result.success && Array.isArray(result.dispatch)) {
        setDispatch(result.dispatch);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (error) {
      console.error("There was an error fetching dispatch:", error);
    }
  };

  useEffect(() => {
    fetchDispatch();
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
      field: "Name",
      headerName: "Name",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
    },
    {
      field: "Type",
      headerName: "Type",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
    },
    {
      field: "Number",
      headerName: "Number",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
    },
    {
      field: "Location",
      headerName: "Location",
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
      field: "autoDispatch",
      headerName: "Auto Dispatch",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      renderCell: () => true, // Always render as true
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
          rows={Dispatch}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
              placement: "bottom-end",
            },
            toolbar: {
              setFilterButtonEl,
              fetchDispatch,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default DispatchSettings;
