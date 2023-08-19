import { createContext, useState, useMemo } from "react";

import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414"
        },
        primary: {//changeed
          100: "#cdcdd4",
          200: "#9b9ca9",
          300: "#696a7f",
          400: "#373954",
          500: "#050729",
          600: "#040621",
          700: "#030419",
          800: "#020310",
          900: "#010108"
        },
        pinkAccents: {
          100: "#f7e9f2",
          200: "#efd3e4",
          300: "#e7bdd7",
          400: "#dfa7c9",
          500: "#d791bc",
          600: "#ac7496",
          700: "#815771",
          800: "#563a4b",
          900: "#2b1d26"
        },
        yellowAccent: {
          100: "#fff5db",
          200: "#ffebb7",
          300: "#ffe094",
          400: "#ffd670",
          500: "#ffcc4c",
          600: "#cca33d",
          700: "#997a2e",
          800: "#66521e",
          900: "#33290f"
        },
        purpleAccent: {
          100: "#e7e6fb",
          200: "#cfcef7",
          300: "#b8b5f4",
          400: "#a09df0",
          500: "#8884ec",
          600: "#6d6abd",
          700: "#524f8e",
          800: "#36355e",
          900: "#1b1a2f"
      }
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0"
        },
        primary: {
          100: "#010108",
          200: "#020310",
          300: "#030419",
          400: "#f2f0f0", // manually changed
          500: "#050729",
          600: "#373954",
          700: "#696a7f",
          800: "#9b9ca9",
          900: "#cdcdd4"
        },
        pinkAccents: {
          100: "#2b1d26",
          200: "#563a4b",
          300: "#815771",
          400: "#ac7496",
          500: "#d791bc",
          600: "#dfa7c9",
          700: "#e7bdd7",
          800: "#efd3e4",
          900: "#f7e9f2"
        },
        yellowAccent: {
          100: "#33290f",
          200: "#66521e",
          300: "#997a2e",
          400: "#cca33d",
          500: "#ffcc4c",
          600: "#ffd670",
          700: "#ffe094",
          800: "#ffebb7",
          900: "#fff5db"
        },
        purpleAccent: {
          100: "#1b1a2f",
          200: "#36355e",
          300: "#524f8e",
          400: "#6d6abd",
          500: "#8884ec",
          600: "#a09df0",
          700: "#b8b5f4",
          800: "#cfcef7",
          900: "#e7e6fb"
        }        
      })
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500]
            },
            secondary: {
              main: colors.pinkAccents[500]
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100]
            },
            background: {
              default: colors.primary[500]
            }
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100]
            },
            secondary: {
              main: colors.pinkAccents[500]
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100]
            },
            background: {
              default: "#fcfcfc"
            }
          })
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14
      }
    }
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {}
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"))
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
