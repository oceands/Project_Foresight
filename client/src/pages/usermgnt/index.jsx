import React from "react";
import { useEffect } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Typography } from "@mui/material";
import { mockUserManagement } from "../../data/mockData";
import { MdEdit } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { FiUsers } from "react-icons/fi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axiosInstance from "../../api/axios";

function CustomToolbar({ setFilterButtonEl, fetchUsers, setShowEditForm, setEditFormData, showEditForm, editFormData  }) {
  const colors = tokens;


  
  const [showForm, setShowForm] = React.useState(false);


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

  function getRandomChar(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  function generateStrongPassword(length) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*";
    const allChars = lowercaseChars + uppercaseChars + numbers + specialChars;

    let password = "";

    // Ensure at least one character from each category
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(numbers);
    password += getRandomChar(specialChars);

    // Generate the remaining characters
    for (let i = password.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }

    return password;
  }

  const handleFormSubmit = (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    const [fname, lname] = values.name.split(" ");
    const pass = generateStrongPassword(8);

    try {
      axiosInstance
        .post("auth/api/users/register", {
          Fname: fname,
          Lname: lname,
          email: values.email,
          role: values.role.toLowerCase(),
          password: pass,
        })
        .then(function (response) {
          if (response.data.success) {
            // Handle success
            console.log("User added successfully:", response.data.message);
            alert("User added successfully temp* password is " + pass);
            setStatus({ success: true });
            setSubmitting(false);
            fetchUsers();
            setShowForm(false);
          } else {
            // Handle failure
            console.error("Failed to add user:", response.data.msg);
            alert(`Failed to add user: ${response.data.msg}`);
            setStatus({ success: false });
            setErrors({ submit: response.data.msg });
            setSubmitting(false);
          }
        })
        .catch(function (error) {
          // Handle error
          console.error("Error adding user:", error);
          alert("Error adding user. Please try again.");
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        });
    } catch (err) {
      // Handle unexpected error
      console.error(err);
      alert("Error adding user. Please try again.");
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    setShowForm(false);
  };

  const [selectedRole, setselectedRole] = useState(""); // State to hold the selected question

  const handleRoleChange = (event) => {
    console.log("launched");
    setselectedRole(event.target.value);
  };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Invalid email format").required("Required"),
    joiningdate: yup.date().required("Required"),
    role: yup.string().required("Required"),
  });
  const initialValues = {
    name: "",
    email: "",
    joiningdate: dayjs(), // You can set a default Joining Date if needed
    role: selectedRole,
  };

  //Adding the Users Form
  const AddUserForm = ({
    onClose,
    onSubmit,
    initialValues,
    validationSchema,
    setShowForm,
    showDatePicker = true,

  isEditMode = false, // Add this line
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
          height={"500px"}
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box p={1} display={"flex"} alignItems={"center"}>
                  <FiUsers style={{ fontSize: "2rem" }} />
                  <Typography variant="h6" p={2} fontWeight={"bold"}>
                    User Details
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
                    label="Name"
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
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email} // Adjusted from 'values.email'
                    name="email" // Adjusted from 'values.email'
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                    size="small"
                  />
                  {showDatePicker && ( // Conditionally render date picker
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{
                        gridColumn: "span 2",
                        "& .MuiInputBase-root": {
                          height: "48px",
                        },
                      }}
                      onChange={(value) =>
                        setFieldValue("joiningdate", dayjs(value), true)
                      }
                      label="Date"
                      value={values.joiningdate}
                      slotProps={{
                        popper: { sx: { zIndex: 9999 } },
                      }}
                    />
                  </LocalizationProvider>
                  )}

                  <TextField
                    fullWidth
                    select
                    variant="filled"
                    label="Role"
                    onChange={handleRoleChange}
                    value={values.role}
                    name="role"
                    error={!!touched.role && !!errors.role}
                    helperText={touched.role && errors.role}
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
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </TextField>

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
                        width: "150px",
                      }}
                    >
                      {isEditMode ? "Edit User" : "Add User"} {/* Change this line */}
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
            Add User
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
          <AddUserForm
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            isEditMode={false}
          />
        )}

{showEditForm && (
      <AddUserForm
        // ... [existing AddUserForm props]

        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        validationSchema={checkoutSchema}
        showDatePicker={false} // Pass false to hide date picker
        initialValues={editFormData || initialValues} // Pass edit form data or default initialValues
        isEditMode={true}
      />
    )}
      </Toolbar>
    </Box>
  );
}

const Usermgnt = () => {
  const colors = tokens;

  const [filterButtonEl, setFilterButtonEl] = useState(null);

  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState(null);


  const [Users, setUsers] = useState([]);



  const handleEditClick = (userData) => {
    setShowEditForm(true);
    setEditFormData(userData);
  };

  const handleDelete = async (userId) => {
    try {
      // Call the delete endpoint with the user ID
      const response = await axiosInstance.delete(`auth/api/users/delete/${userId}`);
  
      if (response.status === 200) {
        console.log("User deleted successfully:", response.data.message);
        alert("User deleted successfully");
        fetchUsers(); // Refresh the list of users
      } else {
        // Handle error scenario
        console.error("Failed to delete user:", response.data.message);
        alert(`Failed to delete user: ${response.data.message}`);
      }
    } catch (error) {
      // Handle unexpected error
      console.error("Error deleting user:", error.message);
      alert("Error deleting user. Please try again.");
    }
  };
  

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/user/usermgnt/get_users"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      if (result.success && Array.isArray(result.users)) {
        // Handle the fetched users data
        setUsers(result.users);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (error) {
      console.error("There was an error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Dependencies array

  const columns = [
    {
      field: "id",
      headerName: "ID",
      disableColumnMenu: true,
      cellClassName: "name-column--cell",
      flex: 1, // Space columns equally
    },
    {
      field: "username",
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
      field: "date_joined",
      headerName: "Joining Date",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "roles",
      headerName: "Role",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1, // Space columns equally
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box display="flex">
          <IconButton onClick={() => handleEditClick(params.row)}>
            <MdEdit
              style={{
                color: colors.blueAccents[500],
                width: "15px",
                height: "15px",
              }}
            />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
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
          rows={Users}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
              placement: "bottom-end",
            },
            toolbar: {
              setFilterButtonEl,
              fetchUsers, 
              setShowEditForm, // Pass the state setters as props
              setEditFormData,
              showEditForm, // Pass the state itself as props
              editFormData,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Usermgnt;
