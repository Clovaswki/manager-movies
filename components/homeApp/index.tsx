import React from 'react'
import { Progress, Rate } from 'antd'
import { connect } from 'react-redux'

//styles
import styles from './index.module.css'

//components
import CardMovie from '../cardMovie'
import ComponentMovie from '../componentMovie'

//home page context
import UseHomePage from '../../contexts/homePage/homePage'

const HomeApp: React.FC<any> = ({dataMovies, theme}) => {

  const [data, setData] = React.useState(dataMovies.movies.docs)
  const { setOpenComponentMovie, openComponentMovie } = UseHomePage()

  React.useEffect(() => { 
    setData(dataMovies.movies.docs)
  }, [dataMovies])

  return (
    <div className={theme === 'dark'? styles.homeApp_dark :styles.homeApp}>
      <div className={styles.title_homeApp}>
        <h3 style={{margin: 0, padding: '1rem'}}>Populares</h3>
      </div>
      <div className={styles.movies}>
        {
          data.map((movie: any, index: number) => (

            <span key={index}>
              <CardMovie data={movie}/>
            </span>

          ))
        }
      </div> 
    </div>
  )
}

const mapPropsToState = (state: any) => ({
  dataMovies: state.dataMovies,
  theme: state.theme
})

export default connect(mapPropsToState)(HomeApp)