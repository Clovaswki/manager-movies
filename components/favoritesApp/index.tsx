import React from 'react'
import styles from './index.module.css'

//icons
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { IconButton } from '@mui/material';

//components
import CardMovie from '../cardMovie';

//redux
import { connect } from 'react-redux';

type Props = {
  theme: string,
  dataMovies: any
}

//list movies save type
type ISaveMovies = {
  id: string,
  movieId: string,
  name: string
}

const FavoritesApp: React.FC<Props> = ({theme, dataMovies}) => {

  const [saveMovies, setSaveMovies] = React.useState<ISaveMovies[] | []>([])

  React.useEffect(() => {

    const filter_saveMovies = () => {

      let movies_save = dataMovies.movies.docs.filter((movie: any) => 
        dataMovies.saveMovies.docs.some( (m:any) => m.movieId === movie.id)
      )

      setSaveMovies(movies_save)

    }

    filter_saveMovies()

  }, [])

  return (
    <div className={styles.favorites_component}>
      
      <div className={styles.favorites_card}>
        <div className={styles.search_card}>
          <span>
            <BookmarksIcon style={{color: '#ffff', fontSize: '40px'}}/>
            <h4>Salvos</h4>
          </span>
          <div>
            <IconButton>
              <ManageSearchIcon style={{color: '#fff', fontSize:'30px'}}/>
            </IconButton>
          </div>
        </div>
        <div className={styles.favorites_content}>
          <div className={styles.movies_numberInfo}>
            <h4>{saveMovies.length} itens salvos</h4>
          </div>
          <div className={styles.movies_list}>
            {
              saveMovies.map((item: any, index:number) => (
                <span key={index}>
                  <CardMovie data={item}/>
                </span>
              ))
            }
          </div>

        </div>
      </div>

    </div>
  )
}

const mapPropsToState = (state: any) => ({
  theme: state.theme,
  dataMovies: state.dataMovies
})

export default connect(mapPropsToState)(FavoritesApp)