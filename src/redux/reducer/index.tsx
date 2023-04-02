import { combineReducers } from "redux";
import RootReducer from "./RootReducer";

const AppReducer = combineReducers(
    {
        root: RootReducer
    }
)

export default AppReducer