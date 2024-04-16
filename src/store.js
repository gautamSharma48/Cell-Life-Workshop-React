import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./reducer/gridReducer";
import logger from "redux-logger";

let middleware = [];
const producation = false;

if (producation) {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: { gridData: gridReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
