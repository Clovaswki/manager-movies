import React, { useState, useEffect, ReactNode } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Head from 'next/head';
import styles from '../styles/Home.module.css'

//components
import SidebarHome from '../components/sidebarHome'
import HomeApp from '../components/homeApp'
import FavoritesApp from '../components/favoritesApp'
import Profile from '../components/profile';
import Navbar from '../components/navbar'
import Categories from '../components/categories';
import ComponentMovie from '../components/componentMovie';

//Api class
import Movie from '../services/Movie';
import { actionDataMovies } from '../store/actions/dataMovies'

//home page context
import { HomePage } from '../contexts/homePage/HomePageContext';

//utils
import { filterSaveMovies } from '../utils/filterSaveMovies';

interface TypeComponents {
  label: string,
  component: ReactNode
}

type Props = {
  component: string,
  dispatch: Dispatch,
  movies: any,
  genres: any,
  saveMovies: any
}

export async function getStaticProps(){

  let movies = await Movie.fetchMovies()
  let genres = await Movie.fetchGenres()
  let saveMovies = await Movie.getSaveMovies()

  return{
    props:{
      movies,
      genres,
      saveMovies
    }
  }

}

const Home: React.FC<Props> = ({component, dispatch, movies, genres, saveMovies }) => {

  const [componentChoosed, setComponentChoosed] = useState<ReactNode>()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [collapsedSearch, setCollapsedSearch] = useState<boolean>(true)

  const [openComponentMovie, setOpenComponentMovie] = React.useState<{open: boolean, content: null | any}>({
    open: false,
    content: null
  })


  useEffect(() => {

    managerComponents()

    setOpenComponentMovie({open: false, content: null} as {open: boolean, content: any})
    
  }, [component])
  
  useEffect(() => {
    dispatch(actionDataMovies({movies, genres, saveMovies}))
  }, [])

  const managerComponents = () => {

    const components: TypeComponents[] = [
      {label: 'home', component: <HomeApp/>},
      {label: 'favorites', component: <FavoritesApp/>},
      {label: 'categories', component: <Categories/>},
      {label: 'profile', component: <Profile/>}
    ]

    var choice_component: TypeComponents | undefined = components.find( c => c.label === component)

    setComponentChoosed(choice_component?.component)
    
  }

  return (
    <>
    <Head>
      <title>Movies Manager | Home</title>
    </Head>
    <HomePage.Provider value={{openComponentMovie, setOpenComponentMovie}}>
      <div style={{display: 'flex', width: '100%', height: '100vh'}} className={styles.home_app}>
        <SidebarHome 
          collapsed={collapsed} 
          setCollapsedSearch={setCollapsedSearch}
        />
        <div className={styles.App_content}>
          
          <Navbar 
            setCollapsed={setCollapsed} 
            collapsed={collapsed}
            collapsedSearch={collapsedSearch}
          />

          {
            openComponentMovie.open &&
            <ComponentMovie/>
          }

          {componentChoosed}

        </div>
      </div>
    </HomePage.Provider>
    </>
  )
}

const mapPropsToState = (state: any) => ({
  component: state.managerComponents
})

export default connect(mapPropsToState)(Home)
