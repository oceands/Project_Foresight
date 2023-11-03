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
  Badge, // Added import for Badge component
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import FireIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import SmokeIcon from "@mui/icons-material/SmokeFreeOutlined";
import GunAlertOutlinedIcon from "@mui/icons-material/ReportOutlined";

const Topbar = ({ welcomeText }) => {
  const theme = useTheme();
  const colors = tokens;

  const [anchorEl, setAnchorEl] = useState(null);
  const [alertAnchorEl, setAlertAnchorEl] = useState(null);
  const [alertCount, setAlertCount] = useState(0); // Added state for alertCount

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

  const handleLogout = () => {
    handleClose();
    // Add your logout logic here
  };

  /*
  const handleNewAlert = () => {
    // Simulate receiving 1 or 2 alerts randomly
    const randomAlerts = Math.random() < 0.5 ? 1 : 2;

    setAlertCount(alertCount + randomAlerts);
    // Add other logic to handle the new alert
  };
*/
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      borderBottom="2px solid #DCDDDD !important"
      alignItems="center"
    >
      {/* Left Section */}
      <Box display="flex" p={0.2}>
        <Typography variant="h5" color={colors.blueAccents[500]} fontWeight="bold">
          {welcomeText}
        </Typography>
      </Box>
      {/* Right Section */}
      <Box display="flex">
        <Box borderRight="1px solid #DCDDDD !important" p="0px 8px 0px 8px">
          <IconButton onClick={handleAlertClick}>
            <Badge badgeContent={alertCount} color="secondary"> {/* Display alert count */}
              <NotificationsOutlinedIcon />
            </Badge>
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
              },
            }}
          >
            <MenuItem onClick={handleAlertClose}>
              <FireIcon style={{ marginRight: '8px' }}/>
              Fire Alert
            </MenuItem>
            <MenuItem onClick={handleAlertClose}>
              <SmokeIcon style={{ marginRight: '8px' }}/>
              Smoke Alert
            </MenuItem>
            <MenuItem onClick={handleAlertClose}>
              <GunAlertOutlinedIcon style={{ marginRight: '8px' }}/>
              Gun Alert
            </MenuItem>
          </Menu>
        </Box>
        {/* User Icon Button and Username */}
        <Box borderLeft="1px solid #DCDDDD !important" p="0px 8px 0px 8px" display="flex" alignItems="center">
          <IconButton
            sx={{ border: "2px solid #DCDDDD !important", backgroundColor: colors.orangeAccents[300] }}
            onClick={handleClick}
          >
            <PersonIcon/>
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
            <MenuItem onClick={handleClose}>
              <Avatar style={{ marginRight: '8px' }}>
                <PersonIcon />
              </Avatar>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Avatar style={{ marginRight: '8px' }}>
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
