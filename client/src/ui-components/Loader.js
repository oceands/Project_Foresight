import React from "react";

// material-ui
import { makeStyles } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";

// style constant
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1301,
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

//-----------------------|| Loader ||-----------------------//

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color="primary" />
    </div>
  );
};

export default Loader;
