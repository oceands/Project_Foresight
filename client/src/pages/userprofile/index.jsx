import React, { useState } from "react";
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: "John Doe",
    role: "Admin",
    email: "john@example.com",
    phone: "123-456-7890",
    password: "",
    recentChanges: "Changed profile picture",
    profilePicture: "../profilePicSample.jpg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code here to handle submission (e.g., send data to server)
  };

  const handleLogout = () => {
    // Add code here to handle logout
    alert("User logged out");
  };

  return (
    <Box>
      <Avatar
        alt="Profile Picture"
        backgroundImage="url('../profilePicSample.jpg')"
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h5" fontWeight="bold" gutterBottom paddingBottom={3}>
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Recent Changes"
          name="recentChanges"
          value={formData.recentChanges}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
      <Button onClick={handleLogout} variant="contained" color="secondary">
        Logout
      </Button>
    </Box>
  );
};

export default UserProfile;
