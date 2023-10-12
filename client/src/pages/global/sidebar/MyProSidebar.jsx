import React, { useState } from "react";
import { Menu, Sidebar, MenuItem, SubMenu } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";

// MAIN SIDEBAR ICONS
//MAIN MENUE ICONS
import {FaChartPie} from 'react-icons/fa';
import {MdOutlineNotificationAdd} from 'react-icons/md';
import {FaRegEye} from 'react-icons/fa'
import {LuUsers} from 'react-icons/lu'
import {TbReport} from 'react-icons/tb'
import {BiChip} from 'react-icons/bi'
import {LuSettings} from 'react-icons/lu'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import {FiHeadphones} from 'react-icons/fi'


// SUB SETTINGS ICONS
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined'

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100], position: "relative" }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        /* Add this CSS to your stylesheet or in a separate CSS file */


        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
/* Exclude the "admin-box" from the background color rule */
"& .menu-item:not(.admin-box):hover, & .menu-item:not(.sub-menu).active:not(.admin-box)": {
  backgroundColor: "rgba(255, 87, 34, 0.3) !important",
  //boxShadow: "0 8px 8px -4px !important"
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px !important"
},



        "& .sub-menu-content": {
          backgroundColor: `${colors.primary[450]} !important`,
          
        },
       
        "& .menu-item.active::after": {
          content: '""',
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '5px',
          height: '50px',
          backgroundColor: '#FF5722'
        }

      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu iconshape="square">
          
       
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingTop="40px"
                paddingBottom="40px"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[400],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="124px"
                  height="102px"
                  backgroundColor="white"
                  src={"../../assets/logo5.png"}
                  style={{ cursor: "pointer", padding: "10px" }}
                />
              </Box>
              <Box textAlign="center">
              
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "0"}>
            <Item
              
              title="Dashboard"
              to="/"
              icon={<FaChartPie />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Notifications"
              to="/notifications"
              icon={<MdOutlineNotificationAdd/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Incidents"
              to="/incidents"
              icon={<FaRegEye/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="User Management"
              to="/usermgnt"
              icon={<LuUsers />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Reports"
              to="/reports"
              icon={<TbReport />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="AI Models"
              to="/ai"
              icon={<BiChip />}
              selected={selected}
              setSelected={setSelected}
            />
            </Box>
            
            {/*SUB - MENU */}
            <Box paddingLeft={collapsed ? undefined : "0"} className="sub-menu">
            <SubMenu // Add SubMenu component for the "Settings" menu item
              label="Settings"
              icon={<LuSettings />}
              selected={selected}
              setSelected={setSelected}
              className="sub-menu-header"
            >
              {/*SUB MENU ITEMS */}
              
               <Item
              title="Camera"
              to="/settings/camera"
              icon={<CameraAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />

              <Item
              title="Dispatch"
              to="/settings/dispatch"
              icon={<LocalPoliceOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />

              <Item
              title="Floor Plan"
              to="/settings/floorplan"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />

              <Item
              title="Version Info"
              to="/settings/versioninfo"
              icon={<InfoOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />

              <Item
              title="Security"
              to="/settings/security"
              icon={<LockPersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              />

            </SubMenu> 
            </Box>

            <Box paddingLeft={collapsed ? undefined : "0"}>
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<AiOutlineQuestionCircle />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Contact Us"
              to="/contact"
              icon={<FiHeadphones />}
              selected={selected}
              setSelected={setSelected}
            />   
  
          </Box>
        </Menu>
        <Typography 
               textAlign="center"
               padding="10px" // Add some padding for spacing
               backgroundColor={colors.primary[400]} // Match the sidebar background
               color= "#FF5722 !important" // Text color
               position="absolute"
               bottom="0"
               width="100%"
               fontWeight="bold"
               
        >Version 1.0</Typography>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
