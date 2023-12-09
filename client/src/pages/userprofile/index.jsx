import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import { tokens } from "../../theme";

const UserProfile = () => {
  const initialFormData = {
    firstName: "John",
    username: "Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    password: "",
    recentChanges: "Changed profile picture",
    profilePicture: "../profilePicSample.jpg",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePicture: URL.createObjectURL(file),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const colors = tokens;

  // const handleOverlayClick = (e) => {
  //   e.stopPropagation();
  //   setShowForm(false);
  // };

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

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        padding: 5,
        width: "100%",
        backgroundColor: colors.primary[500],
      }}
    >
      <Box
        sx={{
          backgroundColor: "white", // White background covering both fields and profile pic
          padding: 2,
          borderRadius: 8,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {editMode ? (
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
            />
          ) : (
            <Avatar
              alt="Profile Picture"
              src={formData.profilePicture}
              onClick={handleEditClick}
              sx={{
                width: 80,
                height: 80,
                marginBottom: 2,
                marginLeft: "auto",
                marginRight: "auto",
                cursor: "pointer",
              }}
            />
          )}
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            paddingBottom={2}
          >
            Edit Profile
          </Typography>
        </Box>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                sx={{ backgroundColor: "#F5F5F5" }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                label="Last Name"
                name="Last Name"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                sx={{ backgroundColor: "#F5F5F5" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{ backgroundColor: "#F5F5F5" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                sx={{ backgroundColor: "#F5F5F5" }}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="small"
              sx={buttonSx}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UserProfile;
