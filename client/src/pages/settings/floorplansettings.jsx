import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";

import Header from "../../components/Header";
import { useEffect } from "react";

const FloorplanSettings = ({ changeWelcomeText }) => {

    useEffect(() => {
      changeWelcomeText("Settings / Floor Plan");
    }, []);
};

export default FloorplanSettings;