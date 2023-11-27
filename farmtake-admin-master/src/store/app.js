import {
  combineReducers,
  configureStore,
  applyMiddleware,
} from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import thunk from "redux-thunk";

/**
 *
 *
 *
 *
 */

const store = configureStore({
  reducer: combineReducers({ user: userSlice }),
  devTools: true,
  middleware: [thunk],
});

/**
 *
 *
 *
 *
 */

export default store;
