import React from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material";
import { AppRoutes } from "./routes/AppRoutes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f73378",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <AppRoutes />
      </ThemeProvider>
    </React.StrictMode>
  );
}
