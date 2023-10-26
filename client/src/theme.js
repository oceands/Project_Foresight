import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color tokens for the Interface 
export const tokens ={
    primary: {//background
        100: "#fdfdfd",
        200: "#fbfbfb",
        300: "#f8f8f9",
        400: "#f6f6f7",
        500: "#f4f4f5",
        600: "#c3c3c4",
        700: "#929293",
        800: "#626262",
        900: "#313131"
    },
    secondary: { // objects & containers
        100: "#ffffff",
        200: "#ffffff",
        300: "#fefffe",
        400: "#fefffe",
        500: "#fefffe",
        600: "#cbcccb",
        700: "#989998",
        800: "#666666",
        900: "#333333"
    },
    orangeAccents: {
        100: "#ffddd3",
        200: "#ffbca7",
        300: "#ff9a7a",
        400: "#ff794e",
        500: "#ff5722",
        600: "#cc461b",
        700: "#993414",
        800: "#66230e",
        900: "#331107"
    },
    blueAccents: {
        100: "#d9dcf0",
        200: "#b2b9e1",
        300: "#8c97d3",
        400: "#6574c4",
        500: "#3f51b5",
        600: "#324191",
        700: "#26316d",
        800: "#192048",
        900: "#0d1024"
    },
    blackAccents: {
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#000000",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000"
    }
};


//This Will be setting the entire theme function based on the tokens, fonts and more.
export const themeSettings = (mode) => {
  const colors = tokens
  return {
    palette: {
      mode: "light",

        // palette values for light mode
        primary: {
        main: colors.primary[500],
        },
        secondary: {
        main: colors.secondary[500],
        },
        neutral: {
        dark: colors.primary[700],
        main: colors.primary[500],
        light: colors.primary[100],
        },
        background: {
        default: colors.primary[500],
        },
          
    },
    //This Will be setting the Typography of the page by default
    typography: {
      fontFamily: ["Raleway", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {},
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings), []);

  return [theme, colorMode];
};
