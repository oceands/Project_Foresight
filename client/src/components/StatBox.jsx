import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens;

  return (
    <Box width="100%" m="0 30px" p="12px 0" mt="10px">
      <Box display="flex">
          {icon}

          <Typography 
          
          variant="h7"
          fontWeight="bold" 
          paddingLeft={1}
          sx={{ color: colors.blackAccents[500] }}>
          {subtitle}
          </Typography>
      </Box>

      <Box>
        <Typography
            variant="h3"
            fontWeight="bold"
            p={1}
            sx={{ color: colors.blackAccents[500] }}
        >
            {title}
        </Typography>
      </Box>

      <Box>
        <Typography
            variant="h7"
            p={1}
            sx={{ color: colors.blackAccents[500] }}
        >
            {title} + Incidents
        </Typography>
      </Box>
        

    </Box>
  );
};

export default StatBox;
