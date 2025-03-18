import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Layout from "./Layout";
import { ThemeProvider } from "@/components/theme-provider";
import GlobalProvider from "./components/globalprovider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
         <Layout>
            <GlobalProvider>
               <App />
            </GlobalProvider>
         </Layout>
      </ThemeProvider>
   </React.StrictMode>
);
