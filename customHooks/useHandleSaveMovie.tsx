import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useDispatch } from "react-redux";

//import movie class
import Movie from "../services/Movie";

//action 
import { actionDataMovies } from "../store/actions/dataMovies";

//redux store
import store from "../store";

type State = {
    isSave: boolean,
    success: boolean,
    message: string,
    changeStateSave?: false
}

type IState = [
    state: State,
    setState: SetStateAction<Dispatch<State>>
]

//helpers functions
function useDataMovies() {
    const dataMovies = store.getState().dataMovies
    return dataMovies;
}

function useIsMovieSaved(data: any) {
    const dataMovies = useDataMovies();
    const isSave = dataMovies.saveMovies.docs.some(
      (movie: any) => movie.movieId === data.id
    );
    return isSave;
}

//custom hook for posts save
function useHandleSaveMovie(data: any): IState{

    const dataMovies = useDataMovies()
    const dispatch = useDispatch()
    const [state, setState] = useState<State>({isSave: useIsMovieSaved(data), success: true, message: ''})

    //check if movie is saved when global state is updated
    useEffect(() => {
        
        setState({isSave: useIsMovieSaved(data), success: true, message: ''})

    }, [dataMovies])

    //save or remove movie which set a prop "changeStateSave" as true
    useEffect(() => {

        const saveMovie = async () => {
            let { id, original_title } = data
            let movie = dataMovies.saveMovies.docs.find((movie:any) => movie.movieId === id )
    
            let data_movie: {movieId: string, name: string, id: string}

            if(movie === undefined){//check if movie is save or not
                data_movie = { movieId: id, name: original_title, id: '' }
                dataMovies.saveMovies.docs = [...dataMovies.saveMovies.docs, data_movie]
                dispatch(actionDataMovies(dataMovies))
            }else{
                data_movie = { movieId: id, name: original_title, id: movie.id.toString() }
                dataMovies.saveMovies.docs = dataMovies.saveMovies.docs.filter((movie: any) => movie.movieId !== id)
                dispatch(actionDataMovies(dataMovies))
            }
            
            setState({ success: true, message: '', isSave: movie === undefined })
            
            var response = await Movie.saveMovie(data_movie, movie === undefined)
    
            if(!response.success){
                setState({success: false, message: 'Erro ao salvar!', isSave: state.isSave} as State)
            }
    
        }

        if(state.changeStateSave) saveMovie()

    }, [state])

    return [state, setState]

}

export default useHandleSaveMovie