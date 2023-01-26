import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useSelector, useDispatch } from "react-redux";

//import movie class
import Movie from "../../services/Movie";

//action 
import { actionDataMovies } from "../../store/actions/dataMovies";

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

//custom hook for posts save
function useSaveMovie(data: any): IState{

    const dataMovies = useSelector((state: any) => (state.dataMovies))
    const [state, setState] = useState<State>(() => {

        let isSave = dataMovies.saveMovies.some((movie: any) => movie.movieId === data.id)

        return {isSave: isSave, success: true, message: ''}

    })
    const dispatch = useDispatch()

    useEffect(() => {

        const saveMovie = async () => {
            let { id, original_title } = data
            let movie = dataMovies.saveMovies.find((movie:any) => movie.movieId === id )
    
            let data_movie: {movieId: string, name: string, id: string}

            if(movie === undefined){
                data_movie = { movieId: id, name: original_title, id: '' }
                dataMovies.saveMovies = [...dataMovies.saveMovies, data_movie]
                dispatch(actionDataMovies(dataMovies))
            }else{
                data_movie = { movieId: id, name: original_title, id: movie.id.toString() }
                dataMovies.saveMovies = dataMovies.saveMovies.filter((movie: any) => movie.movieId !== id)
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

export default useSaveMovie