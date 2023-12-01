import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";
import { tokens } from "../../theme";

const FAQ = () => {
  const colors = tokens;
  return (
    <Box backgroundColor={colors.primary[500]} p={3} minHeight={"100vh"}>
      <Box m="20px">
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<MdExpandMore fontSize={25} />}>
            <Typography color={colors.blackAccents[500]} variant="h5">
              What is Foresight?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Foresight is a innovative surveillance system with quick response time to detect fire, smoke and weapons
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<MdExpandMore fontSize={25} />}>
            <Typography color={colors.blackAccents[500]} variant="h5">
              How can I download reports 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A user can dowload reports by clicking on the download icon button next to the report field
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<MdExpandMore fontSize={25} />}>
            <Typography color={colors.blackAccents[500]} variant="h5">
              How to view multiple live feeds
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
             There will be an option to view live feed on the dashboard if you click on the arrow and you will be redirected to the arrow
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<MdExpandMore fontSize={25} />}>
            <Typography color={colors.blackAccents[500]} variant="h5">
            Can you review an incident again after denying 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, Once an incident has been denied it can be reviewed again
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<MdExpandMore fontSize={25} />}>
            <Typography color={colors.blackAccents[500]} variant="h5">
              What type of fires and weapons does Foresight detect
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
             It can detect multiple type of rifles,handguns,knives and fires of any level 
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default FAQ;