import React, { useState, useEffect, ReactNode } from 'react'
import { connect } from 'react-redux'

//components
import SidebarHome from '../components/sidebarHome'
import HomeApp from '../components/homeApp'
import FavoritesApp from '../components/favoritesApp'
import Navbar from '../components/navbar'

import Head from 'next/head';

interface TypeComponents {
  label: string,
  component: ReactNode
}

type Props = {
  component: string,
  dispatch: any
}

const Home: React.FC<Props> = ({component, dispatch}) => {

  const [componentChoosed, setComponentChoosed] = useState<ReactNode>()

  useEffect(() => {

    managerComponents()
    
  }, [component])
  
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
      <title>Página principal</title>
    </Head>
    <div style={{display: 'flex', width: '100%', height: '100vh'}}>
      <SidebarHome />
      <div style={{flex: 1, background: '#F5F9FC'}}>
        
        <Navbar/>

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
