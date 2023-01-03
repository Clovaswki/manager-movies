import { TypeUserAuth } from "../actions/types_action"
import { User } from "../types_state"

var INITIAL_STATE: User | {} = {} 

const userAuth = (state = INITIAL_STATE, action: TypeUserAuth) => {

    if(action.type === "USER_AUTH"){

        var { user } = action

        user?.auth
        ? state = user
        : state = {auth: false}

    }

    return state

}

export default userAuth