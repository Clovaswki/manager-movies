import React, { ChangeEvent } from 'react'
import styles from './index.module.css'

//icons
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { IconButton } from '@mui/material';

//list movies save type
import { IMovie } from '../../types/Movie';

//components
import CardMovie from '../cardMovie';

//redux
import { connect } from 'react-redux';

type Props = {
  theme: string,
  dataMovies: any
}

//favorites movies - component
const FavoritesApp: React.FC<Props> = ({ theme, dataMovies }) => {

  const [saveMovies, setSaveMovies] = React.useState<IMovie[] | []>([])

  //backup save movies
  const [backupSaveMovies, setBackupSaveMovies] = React.useState<IMovie[] | []>([])

  //state show search input
  const [showSearchInput, setShowSearchInput] = React.useState<boolean>(false)

  //search input
  const [searchInput, setSearchInput] = React.useState<string>("")

  React.useEffect(() => {

    //filter only save movies
    const filter_saveMovies = () => {

      let movies_save = dataMovies.movies.docs.filter((movie: any) =>
        dataMovies.saveMovies.docs.some((m: any) => m.movieId === movie.id)
      )

      setSaveMovies(movies_save)
      setBackupSaveMovies(movies_save)

    }

    filter_saveMovies()

  }, [])

  //if input disabled - input is empty
  React.useEffect(() => {

    if(!showSearchInput){
      setSearchInput("")
    }

  }, [showSearchInput])

  //search filter
  const searchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value

    if (value) {

      let filter: IMovie[] = backupSaveMovies.filter(movie =>
        movie?.original_title.toLowerCase().includes(value.toLowerCase())
        ||
        movie?.overview.toLowerCase().includes(value.toLowerCase())
      )

      setSaveMovies(filter)

    } else {
      setSaveMovies(backupSaveMovies)
    }

  }

  return (
    <div className={(theme === "dark" && styles.favorites_component_dark)
      + " " +
      styles.favorites_component}
    >

      <div className={styles.favorites_card}>
        <div className={styles.search_card}>
          <span>
            <BookmarksIcon style={{ color: '#ffff', fontSize: '40px' }} />
            <h4>Salvos</h4>
          </span>
          <div className={styles.search_div}>
            <div className={(showSearchInput && styles.search_element) + " " + styles.search_element_hide}>
              <input 
                type="text" 
                placeholder='Procure aqui...' 
                onChange={
                  (event: ChangeEvent<HTMLInputElement>) => 
                  [searchFilter(event), setSearchInput(event.target.value)]
                } 
                value={searchInput}
              />
            </div>
            <IconButton onClick={() => setShowSearchInput(!showSearchInput)}>
              <ManageSearchIcon style={{ color: '#fff', fontSize: '30px' }} />
            </IconButton>
          </div>
        </div>
        <div className={styles.favorites_content}>

          <div className={styles.movies_numberInfo}>
            <h4>{saveMovies.length} itens salvos</h4>
          </div>
          <div className={styles.movies_list}>
            {
              saveMovies.map((item: any, index: number) => (
                <span key={index}>
                  <CardMovie data={item} />
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