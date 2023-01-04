import { TypeComponentChoosed } from "../actions/types_action"

var INITIAL_STATE = 'home'

const managerComponents = (state = INITIAL_STATE, action: TypeComponentChoosed) => {

    if(action.type == 'CHANGE_COMPONENT'){
        state = action.component
    }

    return state

}

export default managerComponents