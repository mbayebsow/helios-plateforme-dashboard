import "./styles/index.css";
import "@arco-design/web-react/dist/css/arco.css";
import React from "react";
import ReactDOM from "react-dom/client";
import frFR from "@arco-design/web-react/es/locale/fr-FR";
import { ConfigProvider } from "@arco-design/web-react";
import { BrowserRouter } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/fr";
import App from "./App";

Moment.globalLocale = "fr";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={frFR}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
