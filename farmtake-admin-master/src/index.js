import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import Routers from "./routes";
import PerfectScrollbar from "react-perfect-scrollbar";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Loader from "./hooks/useLoader";
import { ToastContainer } from "react-toastify";
import store from "./store/app";
import { Provider } from "react-redux";

const queryClient = new QueryClient();
const Root = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={"/"}>
          <Loader>
            <PerfectScrollbar>
              <Routers />
            </PerfectScrollbar>
          </Loader>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            progressStyle={{
              color: "#F48521",
              backgroundColor: "#F48521",
            }}
            icon={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
        <ReactQueryDevtools position={"bottom-right"} />
      </QueryClientProvider>
    </Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Root />);
