import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
