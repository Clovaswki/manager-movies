import React, { useState, useEffect, ReactNode } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

//components
import SidebarHome from '../components/sidebarHome'
import HomeApp from '../components/homeApp'
import FavoritesApp from '../components/favoritesApp'
import Navbar from '../components/navbar'
import Head from 'next/head';
import { Api } from '../services/ApiMovies'
import { actionDataMovies } from '../store/actions/dataMovies'

interface TypeComponents {
  label: string,
  component: ReactNode
}

type Props = {
  component: string,
  dispatch: Dispatch,
  movies: any
}

export async function getStaticProps(){

  var movies = await fetchMovies()

  return{
    props:{
      movies: movies.results
    }
  }

}

const fetchMovies = async () => {

  var response = await Api.get('/movie/popular?language=en-US&page=1')

  return response.data
}

const Home: React.FC<Props> = ({component, dispatch, movies }) => {

  const [componentChoosed, setComponentChoosed] = useState<ReactNode>()
  const [collapsed, setCollapsed] = useState<boolean>(true)

  useEffect(() => {

    managerComponents()
    
  }, [component])
  
  useEffect(() => {
    dispatch(actionDataMovies(movies))
  }, [])

  const managerComponents = () => {

    const components: TypeComponents[] = [
      {label: 'home', component: <HomeApp/>},
      {label: 'favorites', component: <FavoritesApp/>}
    ]

    var choice_component: TypeComponents | undefined = components.find( c => c.label === component)

    setComponentChoosed(choice_component?.component)
    
  }

  return (
    <>
    <Head>
      <title>Movies Manager | Home</title>
    </Head>
    <div style={{display: 'flex', width: '100%', height: '100vh'}}>
      <SidebarHome collapsed={collapsed} />
      <div style={{flex: 1, background: '#F5F9FC'}}>
        
        <Navbar setCollapsed={setCollapsed} collapsed={collapsed}/>

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
