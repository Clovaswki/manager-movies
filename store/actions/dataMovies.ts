import { TypeDataMovies } from "./types_action"

export const actionDataMovies = (data: any): TypeDataMovies => ({
    type: 'FETCH_DATA_MOVIES',
    data: data
})