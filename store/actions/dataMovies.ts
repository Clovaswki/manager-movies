import { filterSaveMovies } from "../../utils/filterSaveMovies"
import { TypeDataMovies } from "./types_action"

export const actionDataMovies = (data: any): TypeDataMovies => ({
    type: 'FETCH_DATA_MOVIES',
    data: {
        movies: data.movies,
        genres: data.genres,
        saveMovies: filterSaveMovies(data.saveMovies)
    }
})