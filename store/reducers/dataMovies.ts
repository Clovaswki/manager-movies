import { TypeDataMovies } from "../actions/types_action"

var INITIAL_STATE: any = []

function dataMovies(state = INITIAL_STATE, action: TypeDataMovies){

    if(action.type === "FETCH_DATA_MOVIES"){
        state = action.data
    }

    return state
}

export default dataMovies