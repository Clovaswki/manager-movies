import axios, { Axios, AxiosError } from 'axios'

// const apiKey = 'f660842eceecb64de00e8099998aac51'
const apiKeyReaderToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjYwODQyZWNlZWNiNjRkZTAwZTgwOTk5OThhYWM1MSIsInN1YiI6IjYzYjcxN2Y5ZjA0ZDAxMDA4N2NjNWY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NQoP1Owzzfxmf52k8aag2_UeLcH6FC1ADpCy80S_62E'

const Api: Axios = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

const ApiPictures: Axios = axios.create({
    baseURL: 'https://image.tmdb.org/t/p/original'
})

Api.interceptors.request.use(
    function(config: any){

        config.headers.Authorization = ' Bearer '+apiKeyReaderToken
        return config

    },
    function(err: AxiosError){
        return Promise.reject(err)
    }
)

export {Api, ApiPictures}