import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider, createTheme } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

const theme = createTheme({
  headings: { fontFamily: "Greycliff CF, sans-serif" },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>
);

reportWebVitals();
