// src/components/MuiWrapper.tsx

"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009a6c", // Customize primary color
    },
    secondary: {
      main: "#000", // Customize secondary color
    },
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "##009a6c", // Default thumb color (unselected)
        },
        track: {
          backgroundColor: "#ccc", // Track color (unselected)
          ".Mui-checked.Mui-checked + &": {
            backgroundColor: "#026749", // Track color when checked
          },
        },
        thumb: {
          backgroundColor: "#fff", // Thumb color (can be customized)
        },
      },
    },
  },
});

export function MuiWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
