import { combineReducers } from "redux";

//reducers
import userAuth from "./userAuth";
import theme from "./theme";

export default combineReducers({
    auth: userAuth,
    theme
})