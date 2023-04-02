
import RootReducer from "./reducer";

import { configureStore } from "@reduxjs/toolkit";

let store;


// Redux: Store
store = configureStore({
  reducer: RootReducer,

});


export { store };