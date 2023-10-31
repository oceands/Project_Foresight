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
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import FireIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import SmokeIcon from "@mui/icons-material/SmokeFreeOutlined";
import GunAlertOutlinedIcon from "@mui/icons-material/ReportOutlined";

const Topbar = ({ welcomeText }) => {
  const theme = useTheme();
  const colors = tokens;

  const [anchorEl, setAnchorEl] = useState(null);
  const [alertAnchorEl, setAlertAnchorEl] = useState(null);

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
              },
            }}
          >
            <MenuItem onClick={handleAlertClose}>
              <FireIcon />
              Fire Alert
            </MenuItem>
            <MenuItem onClick={handleAlertClose}>
              <SmokeIcon />
              Smoke Alert
            </MenuItem>
            <MenuItem onClick={handleAlertClose}>
              <GunAlertOutlinedIcon />
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
