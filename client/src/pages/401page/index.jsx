import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { tokens } from "../../theme";

export default function NotFoundPage() {
  const colors = tokens;
  const buttonSx = {
    backgroundColor: colors.orangeAccents[500],
    color: colors.primary[500],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px",
    minWidth: "130px",
    "&:hover": {
      backgroundColor: colors.primary[500],
      color: colors.orangeAccents[500],
      boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
    },
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      color="text.primary"
    >
      <Box
        component="img"
        sx={{
          height: 150,
          width: 170,
          marginBottom: 4,
        }}
        alt="Foresight logo"
        src="../../assets/logoNew.png"
      />
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        p="4"
        gutterBottom
      >
        401 - User Not Authorised
      </Typography>
      <Typography variant="body" p="4" textAlign={"center"} gutterBottom>
        You do not have the necessary permissions to view this page. If you
        believe this is an error, please contact support or your administrator
        for assistance. <br /> If you have a different account with authorized
        access, you may try signing in with that account.
      </Typography>
      <Button sx={buttonSx} onClick={() => (window.location.href = "/")}>
        Back to Home
      </Button>
    </Box>
  );
}
