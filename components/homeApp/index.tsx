import React from 'react'
import { Progress, Rate } from 'antd'

//styles
import styles from './index.module.css'

import { Api, ApiPictures } from '../../services/ApiMovies'

export async function getStaticProps() {

  var movies = await fetchMovies()

  console.log(movies)

  return {
    props: {
      movies
    }
  }
}

const fetchMovies = async () => {

  var response = await Api.get('/movie/popular?language=en-US&page=1')

  return response.data
}

const HomeApp: React.FC<any> = ({movies}) => {

  const [data, setData] = React.useState([])

  React.useEffect(() => {

    async function fetchData() {

      try {

        var results = movies

        console.log(results)

        results.forEach((result: any) => {

          result.release_date = result.release_date.split('-')[0]

        })

        setData(results)

      } catch (error) {
        console.log(error)
      }

    }

   

  }, [])

  return (
    <div className={styles.homeApp}>

      {/* <div className={styles.movies}>
        {
          data.map((movie: any, index: number) => (

            <div key={index} className={styles.card_movie}>
              <img src={'https://image.tmdb.org/t/p/original/' + movie.poster_path} />
              <div>
                <Progress
                  type='circle'
                  percent={Number(movie.popularity.toString().slice(0, 2))}
                  strokeColor={{ '10%': '#108ee9', '100%': '#87d068' }}
                  width={80}
                  trailColor='#fff'
                  style={{
                    zIndex: '20',
                    position: 'absolute',
                    color: '#fff',
                    top: '-50px',
                    right: '-150px'
                  }}
                />
                <small>{movie.release_date}</small>
                <h5>{movie.title}</h5>
              </div>
            </div>

          ))
        }
      </div> */}

    </div>
  )
}

export default HomeApp  