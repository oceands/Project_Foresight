import React from "react";
import { tokens } from "../../theme";
import { useTheme, Box, IconButton, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = ({ welcomeText }) => {
  const theme = useTheme();
  const colors = tokens;


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

