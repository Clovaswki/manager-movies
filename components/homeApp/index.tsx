import React from 'react'
import { Progress, Rate } from 'antd'
import { connect } from 'react-redux'

//styles
import styles from './index.module.css'

//components
import CardMovie from '../cardMovie'
import ModalShowInfoMovie from '../modalShowInfoMovie'

const HomeApp: React.FC<any> = ({movies, theme}) => {

  const [data, setData] = React.useState(movies)
  const [openModalMovie, setOpenModalMovie] = React.useState<{open: boolean, content: null | any}>({
    open: false,
    content: null
  })

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
    <>
    <ModalShowInfoMovie modalOpen={openModalMovie}/>
    <div className={theme === 'dark'? styles.homeApp_dark :styles.homeApp}>
      <div className={styles.title_homeApp}>
        <h3 style={{margin: 0, padding: '1rem'}}>Populares</h3>
      </div>
      <div className={styles.movies}>
        {
          data.map((movie: any, index: number) => (

            <span key={index} onClick={() => setOpenModalMovie({open: true, content: movie})}>
              <CardMovie data={movie}/>
            </span>

          ))
        }
      </div> 

    </div>
    </>
  )
}

const mapPropsToState = (state: any) => ({
  movies: state.dataMovies,
  theme: state.theme
})

export default connect(mapPropsToState)(HomeApp)