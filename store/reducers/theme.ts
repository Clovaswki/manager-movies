import { TypeTheme } from "../actions/types_action"

var INITIAL_STATE = 'light'

const theme = (state = INITIAL_STATE, action: TypeTheme) => {

    if(action.type === 'CHANGE_THEME'){
        state = action.theme
    }

    return state

}

export default theme