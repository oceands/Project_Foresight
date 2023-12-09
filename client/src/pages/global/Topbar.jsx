import React, { useState } from "react";
import { tokens } from "../../theme";
import {
  useTheme,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import PersonIcon from "@mui/icons-material/Person";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import FireIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import SmokeIcon from "@mui/icons-material/SmokeFreeOutlined";
import GunAlertOutlinedIcon from "@mui/icons-material/ReportOutlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "./../../store/actions";
import { useDispatch } from "react-redux";

import axiosInstance from "../../api/axios";

const Topbar = () => {
  const dispatcher = useDispatch();
  const theme = useTheme();
  const colors = tokens;
  const currentRoute = window.location.pathname;
  const user = useSelector((state) => state.account.user);
  const refresh_token = useSelector((state) => state.account.Refresh_token);
  const username = JSON.stringify(user.username);
  let firstName = username.replace(/['"]+/g, "").split(".")[0];
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  const routeTextMap = {
    "/dashboard": "Welcome Back, " + firstName,
    "/view_feed": "View Live Feed",
    "/notifications": "Notifications",
    "/incidents": "Incidents",
    "/usermgnt": "User Management",
    "/reports": "Reports",
    "/ai": "Artificial Intelligence",
    "/contact": "Contact Us",
    "/faq": "FAQ",
    "/settings/camsetting": "Camera Settings",
    "/settings/dispatchsettings": "Dispatch Settings",
    "/settings/floorplan": "Floor Plan",
    "/settings/versioninfo": "Version Info",
    "/settings/security": "Security",
  };

  const welcomeText = routeTextMap[currentRoute];

  const [anchorEl, setAnchorEl] = useState(null);
  const [alertAnchorEl, setAlertAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const notifications = [
    { type: "fire", message: "Fire alert message", unread: true },
    { type: "smoke", message: "Smoke alert message", unread: false },
    { type: "gun", message: "Gun alert message", unread: true },
    { type: "fire", message: "Another fire alert message", unread: false },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlertClick = (event) => {
    setAlertAnchorEl(event.currentTarget);
  };

  const handleAlertClose = () => {
    setAlertAnchorEl(null);
  };

  // const handleLogout = () => {
  //   handleClose();
  //   // Add your logout logic here
  // };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };
  /*
  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      unread: false,
    }));
    // Update the state with the new notifications array
    // You can use a state management library like Redux, MobX, or React Context for this.
  };
*/
  const filteredNotifications = notifications.filter((notification) => {
    if (selectedFilter === "all") return true;
    return notification.type === selectedFilter;
  });

  // const handleLogout = () => {
  //   // Assuming Refresh_token is accessible in this scope

  //   axiosInstance
  //     .post("auth/api/users/logout")
  //     .then(function (logoutResponse) {
  //       if (logoutResponse.data.success) {
  //         // Logout was successful, proceed to revoke_refresh

  //         // Send a request to revoke_refresh
  //         return axios.post(
  //           config.API_SERVER + "auth/api/users/revoke_refresh",
  //           {},
  //           {
  //             headers: { Authorization: `Bearer ${refresh_token}` },
  //           }
  //         );
  //       } else {
  //         // Logout was unsuccessful
  //         console.log("Logout unsuccessful: ", logoutResponse.data.msg);
  //         return;
  //       }
  //     })
  //     .then(function (revokeResponse) {
  //       // Handle the response after revoking the refresh token
  //       console.log("Refresh token revoked: ", revokeResponse.data);
  //       dispatcher({ type: LOGOUT });
  //     })
  //     .catch(function (error) {
  //       // Handle errors for both the logout and revoke_refresh requests
  //       console.log("Error: ", error);
  //     });
  // };
  const handleLogout = () => {
    axiosInstance
      .post("auth/api/users/logout", refresh_token)
      .then(function (response) {
        if (response.data.success) {
          dispatcher({ type: LOGOUT });
        } else {
          console.log("response - ", response.data.msg);
        }
      })
      .catch(function (error) {
        console.log("error - ", error);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      borderBottom="2px solid #DCDDDD !important"
      alignItems="center"
    >
      <Box display="flex" alignItems="center" p={0.2}>
        <Typography
          variant="h5"
          color={colors.blueAccents[500]}
          fontWeight="bold"
        >
          {welcomeText}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box borderRight="1px solid #DCDDDD !important" p="0px 8px 0px 8px">
          <IconButton onClick={handleAlertClick}>
            <NotificationsOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={alertAnchorEl}
            open={Boolean(alertAnchorEl)}
            onClose={handleAlertClose}
            PaperProps={{
              style: {
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
                borderRadius: "8px",
                width: "300px",
                maxHeight: "400px",
                overflowY: "auto",
              },
            }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              p={2}
            >
              <Grid item>
                <Typography variant="subtitle1" fontWeight="bold" color="black">
                  Notifications
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  //  onClick={handleMarkAllAsRead}
                >
                  Mark All as Read
                </Button>
              </Grid>
            </Grid>
            <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={selectedFilter}
                onChange={handleFilterChange}
                label="Filter"
              >
                <MenuItem value="all">All Notifications</MenuItem>
                <MenuItem value="unread">Unread</MenuItem>
                <MenuItem value="fire">Fire</MenuItem>
                <MenuItem value="smoke">Smoke</MenuItem>
                <MenuItem value="gun">Gun</MenuItem>
                <MenuItem value="weapon">Weapon</MenuItem>
              </Select>
            </FormControl>
            {filteredNotifications.map((notification, index) => (
              <MenuItem key={index} onClick={handleAlertClose}>
                {notification.type === "fire" && <FireIcon />}
                {notification.type === "smoke" && <SmokeIcon />}
                {notification.type === "gun" && <GunAlertOutlinedIcon />}
                <div>
                  <Typography variant="subtitle1">
                    {notification.type.charAt(0).toUpperCase() +
                      notification.type.slice(1)}{" "}
                    Alert
                  </Typography>
                  <Typography variant="body2">
                    {notification.message}
                  </Typography>
                  {notification.unread ? (
                    <span style={{ color: "red" }}>Unread</span>
                  ) : null}
                </div>
              </MenuItem>
            ))}
            <MenuItem onClick={handleAlertClose}>
              <div style={{ textAlign: "center", width: "100%" }}>
                <Button variant="outlined" color="primary">
                  View All
                </Button>
              </div>
            </MenuItem>
          </Menu>
        </Box>
        <Box
          borderLeft="1px solid #DCDDDD !important"
          p="0px 8px 0px 8px"
          display="flex"
          alignItems="center"
        >
          <IconButton
            sx={{
              border: "2px solid #DCDDDD !important",
              backgroundColor: colors.orangeAccents[300],
            }}
            onClick={handleClick}
          >
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
                borderRadius: "8px",
              },
            }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/myprofile">
              <Avatar>
                <PersonIcon />
              </Avatar>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Avatar>
                <ExitToAppOutlinedIcon />
              </Avatar>
              Logout
            </MenuItem>
          </Menu>
          <Box ml={1}>
            <Typography fontWeight="normal">Username</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
