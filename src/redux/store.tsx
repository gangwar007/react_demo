
import RootReducer from "./reducer";

import { configureStore } from "@reduxjs/toolkit";

// Redux: Store
const store = configureStore({
  reducer: RootReducer,

});


export { store };