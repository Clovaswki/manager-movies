import { combineReducers } from "redux";

//reducers
import userAuth from "./userAuth";
import theme from "./theme";
import managerComponents from "./managerComponentsHome";

export default combineReducers({
    auth: userAuth,
    theme,
    managerComponents: managerComponents
})