import React, {useEffect, useState} from "react";
import { tokens } from "../../theme";
import { useTheme, Box, IconButton, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import axios from "axios";
import configData from "../../config";
import { useSelector } from "react-redux";



const Topbar = () => {

  const colors = tokens;
  const currentRoute = window.location.pathname;
  const user = useSelector (state => state.account.user)
  const username = JSON.stringify(user.username)
  let firstName = username.replace(/['"]+/g, '').split('.')[0]
  firstName  = firstName.charAt(0).toUpperCase() + firstName.slice(1);


  
const routeTextMap = {
  '/dashboard': "Welcome Back, " + firstName,
  '/notifications': "Notifications",
  '/incidents': "Incidents",
  '/usermgnt': "User Management",
  '/reports': "Reports",
  '/ai': "Artificial Intelligence",
  '/contact': "Contact",
  '/faq': "FAQ",
  '/settings/camsetting': "Camera Settings",
  '/settings/dispatchsettings': "Dispatch Settings",
  '/settings/floorplan': "Floor Plan",
  '/settings/versioninfo': "Version Info",
  '/settings/security': "Security",
};


const welcomeText = routeTextMap[currentRoute];



  return (

    <Box display="flex" justifyContent="space-between" p={2} borderBottom="2px solid #DCDDDD !important" alignItems="center">
      {/* Left Section */}
      <Box display="flex" p={0.2}>
        <Typography variant="h5" color={colors.blueAccents[500]} fontWeight="bold">
          {welcomeText}
        </Typography>
      </Box>
      
      {/* Right Section */}
      <Box display="flex">
        <Box borderRight="1px solid #DCDDDD !important" p="0px 8px 0px 8px">
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
        </Box>
        {/* User Icon Button and Username */}
        <Box borderLeft="1px solid #DCDDDD !important" p="0px 8px 0px 8px" display="flex" alignItems="center">
          <IconButton sx={{ border: "2px solid #DCDDDD !important" , backgroundColor: colors.orangeAccents[300]}} >
            <PersonOutlinedIcon/>
          </IconButton>
          <Box ml={1}> {/* Add margin-left to create space */}
          <Typography fontWeight="normal">Username</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
    
  );
};

export default Topbar;

