import React from "react";
import { Typography, Box } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const colors = tokens;

  return (
    <Box
      mb="30px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Typography
        variant="h4"
        color={colors.blueAccents[500]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.blackAccents[500]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
