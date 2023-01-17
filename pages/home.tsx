import React, { useState, useEffect, ReactNode } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Head from 'next/head';
import styles from '../styles/Home.module.css'

//components
import SidebarHome from '../components/sidebarHome'
import HomeApp from '../components/homeApp'
import FavoritesApp from '../components/favoritesApp'
import Navbar from '../components/navbar'
import About from '../components/about'
import Categories from '../components/categories';

//Api
import { Api } from '../services/ApiMovies'
import { actionDataMovies } from '../store/actions/dataMovies'

interface TypeComponents {
  label: string,
  component: ReactNode
}

type Props = {
  component: string,
  dispatch: Dispatch,
  movies: any,
  genres: any
}

export async function getStaticProps(){

  var movies = await fetchMovies()
  var genres = await fetchGenres()

  return{
    props:{
      movies: movies.results,
      genres: genres
    }
  }

}

const fetchMovies = async () => {

  var response = await Api.get('/movie/popular?language=en-US&page=1')

  return response.data
}

const fetchGenres = async () => {

  var response = await Api.get('genre/movie/list?language=en-US')

  return response.data.genres

}

const Home: React.FC<Props> = ({component, dispatch, movies, genres }) => {

  const [componentChoosed, setComponentChoosed] = useState<ReactNode>()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [collapsedSearch, setCollapsedSearch] = useState<boolean>(true)

  useEffect(() => {

    managerComponents()
    
  }, [component])
  
  useEffect(() => {
    dispatch(actionDataMovies({movies, genres}))
  }, [])

  const managerComponents = () => {

    const components: TypeComponents[] = [
      {label: 'home', component: <HomeApp/>},
      {label: 'favorites', component: <FavoritesApp/>},
      {label: 'about', component: <About/>},
      {label: 'categories', component: <Categories/>}
    ]

    var choice_component: TypeComponents | undefined = components.find( c => c.label === component)

    setComponentChoosed(choice_component?.component)
    
  }

  return (
    <>
    <Head>
      <title>Movies Manager | Home</title>
    </Head>
    <div style={{display: 'flex', width: '100%', height: '100vh'}} className={styles.home_app}>
      <SidebarHome 
        collapsed={collapsed} 
        setCollapsedSearch={setCollapsedSearch}
      />
      <div style={{
        flex: 1, 
        background: '#F5F9FC', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column'
        }}
      >
        
        <Navbar 
          setCollapsed={setCollapsed} 
          collapsed={collapsed}
          collapsedSearch={collapsedSearch}
        />

        {componentChoosed}

      </div>
    </div>
    </>
  )
}

const mapPropsToState = (state: any) => ({
  component: state.managerComponents
})

export default connect(mapPropsToState)(Home)
