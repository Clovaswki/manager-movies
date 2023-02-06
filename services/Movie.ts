
//cloud firestore
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    query,
    where,
    updateDoc
} from "firebase/firestore";

import { database } from "./firebase";

//Api
import { Api } from "./ApiMovies"

//store
import store from "../store";

type IMovie = {
    id: string ,
    movieId: string 
    name: string
}

//operations with movies collection - database
class MovieClass{

    private collection = collection(database, "saves")//collection reference
    private movieReference = (id: string) => doc(this.collection, id) //doc reference function

    private dataListConverting(data: Object | any) {
        return data.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    }//converting data snapshot for object array

    //create or delete movie on the database
    public async saveMovie(movieData: IMovie, save:boolean){

        try {
            if(!save){

                var data = await this.getSaveMovie('movieId', movieData.movieId)

                if(!data.success) 
                    return { response: null, success: false, message: 'Erro interno!' }
                    
            }

            var response = save
            ? await addDoc(this.collection, {movieId: movieData.movieId, name: movieData.name})
            : await deleteDoc(this.movieReference(data.movie.id))
            
            return { response: response, success: true, message: '' }

        } catch (error) {

            console.log(error)

            return { response: error, success: false, message: 'Erro interno!'}

        }

    }

    //get all docs of collection
    public async getSaveMovies(){

        try {
            
            var response = await getDocs(this.collection)

            var list = this.dataListConverting(response)
            
            return this.convertObject({ docs: list, success: true, message: '' })

        } catch (error) {
            
            console.log(error)

            return this.convertObject({ docs: [], success: false, message: 'Erro interno!' })

        }

    }

    //get save movie
    public async getSaveMovie(param: string, value: string) {

        let querySaveMovie: any = query(this.collection, where(param, "==", value))

        try {

            let movie = await getDocs(querySaveMovie);
    
            let data: any = { success: true, movie: this.dataListConverting(movie)[0] }
            
            return data
        } catch (error) {
            console.log(error)
            return { success: false, movie: {id: ''} }
        }

    }

    //fetch all movies of themovie api
    public async fetchMovies(){

        try {
            let response = await Api.get('/movie/popular?language=en-US&page=1')
            
            return this.convertObject({ docs: response.data.results, success: true })
        } catch (error) {
            console.log(error)
            
            return this.convertObject({ docs: [], success: false })
        }
        
        
    }
    
    //fetch all movie genres of themovie api
    public async fetchGenres(){

        try {
            let response = await Api.get('genre/movie/list?language=en-US')
            
            return this.convertObject({ docs: response.data.genres, success: true})
        } catch (error) {
            console.log(error)

            return this.convertObject({ docs: [], success: false})
        }

    }

    private convertObject(object: Object){

        let convert_one = JSON.stringify(object)

        let convert_two = JSON.parse(convert_one)

        return convert_two

    }

}

const Movie = new MovieClass()

export default Movie