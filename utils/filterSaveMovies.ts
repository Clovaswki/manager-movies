import store from "../store"
import { ISaveMovie } from "../types/saveMovie"

type Params = {
    docs: ISaveMovie[],
    message: string,
    success: boolean
}

//filter save movies by user authenticated
export const filterSaveMovies = (saveMovies: Params): any => {
    let userId = store.getState().auth.id

    saveMovies.docs = saveMovies.docs.filter( movie => movie.userId === userId)

    return saveMovies
}