import React from 'react'
import styles from './index.module.css'

//redux
import { connect } from 'react-redux'

//components
import CardMovie from '../cardMovie'

type Props = {
  dataMovies: any,
  theme: string
}

type CategoryMovies = {
  genre: string,
  movies: any[]
}

const Categories: React.FC<Props> = ({ dataMovies, theme }) => {

  const [genres, setGenres] = React.useState<any[]>(dataMovies.genres.genres)
  const [moviesByCategory, setMoviesByCategory] = React.useState<CategoryMovies[] | []>([])

  const scrollMove = (event: any, pos: string) => {

    let element: HTMLElement | any = event.target

    element.hasAttribute('alt')
      ? element = element.parentNode?.parentNode as HTMLElement | any
      : element = element.parentNode as HTMLElement | any

    let carrossel: HTMLElement = element.getElementsByClassName('carrossel')[0]

    let maxMove = 200

    if (pos === 'left') {
      carrossel.scrollTo({
        top: 0,
        left: carrossel.scrollLeft - maxMove,
        behavior: 'smooth'
      })
    } else {
      carrossel.scrollTo({
        top: 0,
        left: carrossel.scrollLeft + maxMove,
        behavior: 'smooth'
      })
    }
  }

  React.useEffect(() => {

    const filterGenres = () => {
      var data: any[] = []
  
      genres.forEach(genre => {
  
        let movies_by_category: any[] = []
  
        dataMovies.movies.forEach((movie: any) => {
  
          if (movie.genre_ids.includes(genre.id)) {
            movies_by_category.push(movie)
          }
  
        })

        movies_by_category.length != 0 && 
        data.push({ genre: genre.name, movies: movies_by_category })
  
        movies_by_category = []
  
      })
  
      setMoviesByCategory(data)
    }

    filterGenres()

  }, [dataMovies.genres])

  return (
    <div className={
      (theme === 'dark' && styles.categories_component_dark) + " " +
      styles.categories_component
    }
    >
      {
        moviesByCategory.map((item: CategoryMovies, index: number) => (
          <div className={styles.category_card} key={index}>

            <span className={styles.header_slider}>
              <h3>{item.genre}</h3>
            </span>

            <div className={styles.carrossel + " " + "carrossel"}>

              {
                item.movies.map((movie: any, index: number) => (
                  <span key={index}>
                    <CardMovie data={movie} />
                  </span>
                ))
              }

            </div>

            <span
              className={styles.slider_button + " " + styles.switch_left}
              onClick={event => scrollMove(event, 'left')}
            >
              <img src="/img/arrow.png" alt="arrow-left" style={{ transform: 'rotate(90deg)' }} />
            </span>
            <span
              className={styles.slider_button + " " + styles.switch_right}
              onClick={event => scrollMove(event, 'right')}
            >
              <img src="/img/arrow.png" alt="arrow-right" style={{ transform: 'rotate(-90deg)' }} />
            </span>

          </div>
        ))
      }

    </div>
  )
}

const mapPropsToState = (state: any) => ({
  theme: state.theme,
  dataMovies: state.dataMovies
})

export default connect(mapPropsToState)(Categories)