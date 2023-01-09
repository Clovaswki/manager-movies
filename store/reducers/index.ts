import { combineReducers } from "redux";

//reducers
import userAuth from "./userAuth";
import theme from "./theme";
import managerComponents from "./managerComponentsHome";
import dataMovies from "./dataMovies";

export default combineReducers({
    auth: userAuth,
    theme,
    managerComponents: managerComponents,
    dataMovies
})