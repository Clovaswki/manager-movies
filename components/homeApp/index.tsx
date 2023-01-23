import React from 'react'
import { Progress, Rate } from 'antd'
import { connect } from 'react-redux'

//styles
import styles from './index.module.css'

//components
import CardMovie from '../cardMovie'
import ComponentMovie from '../componentMovie'

const HomeApp: React.FC<any> = ({dataMovies, theme}) => {

  const [data, setData] = React.useState(dataMovies.movies)
  const [openComponentMovie, setOpenComponentMovie] = React.useState<{open: boolean, content: null | any}>({
    open: false,
    content: null
  })

  React.useEffect(() => {

    async function fetchData() {

      try {

        var results = dataMovies.movies

        console.log(results)

        results.forEach((result: any) => {

          result.release_date = result.release_date.split('-')[0]

        })

        setData(results)

      } catch (error) {
        console.log(error)
      }

    }
    console.log(dataMovies.movies)

  }, [])

  return (
    <>
    {
      openComponentMovie.open &&
      <ComponentMovie 
        setOpenComponentMovie={setOpenComponentMovie}
        openComponentMovie={openComponentMovie}
      />
    }
    <div className={theme === 'dark'? styles.homeApp_dark :styles.homeApp}>
      <div className={styles.title_homeApp}>
        <h3 style={{margin: 0, padding: '1rem'}}>Populares</h3>
      </div>
      <div className={styles.movies}>
        {
          data.map((movie: any, index: number) => (

            <span key={index} onClick={() => setOpenComponentMovie({open: true, content: movie})}>
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
  dataMovies: state.dataMovies,
  theme: state.theme
})

export default connect(mapPropsToState)(HomeApp)