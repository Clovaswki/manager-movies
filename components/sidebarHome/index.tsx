import React, { ReactNode, useEffect, CSSProperties } from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

//actions
import { actionChangeComponent } from '../../store/actions/managerComponents';

//icons
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

//styles
// import { Sidebar, HeaderSidebar, CardImg } from './styles'
import styles from './index.module.css'

type Props = {
    component: string,
    dispatch: Dispatch,
    collapsed: boolean
}

type Navs = {
    label: string,
    icon: ReactNode,
    component: string
}

const stylesSidebar: CSSProperties = {
    boxShadow: '1px 1px 10px rgba(0, 0, 0, .2)',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    fontFamily: 'Arial, Helvetica, sans-serif',
    transition: '500ms'
}

const SidebarHome: React.FC<Props> = ({ component, dispatch, collapsed }) => {

    const navs: Navs[] = [
        { label: 'Home', icon: <HomeOutlinedIcon />, component: 'home' },
        { label: 'Categorias', icon: <WidgetsOutlinedIcon />, component: 'categories' },
        { label: 'Favoritos', icon: <BookmarksOutlinedIcon />, component: 'favorites' },
        { label: 'Sobre', icon: <InfoOutlinedIcon />, component: 'about' },
    ]

    return (
        <aside 
            className={collapsed ? styles.sidebar : styles.show_sidebar}
            style={stylesSidebar}
        >
            <div className={styles.header_sidebar}>
                <div className={styles.card_img}>
                    <img 
                        src="/img/logo.png" 
                        alt="logo" 
                        width={'60px'} 
                        height={'60px'} 
                        style={{transition: '500ms'}}
                    />
                    <h4>Movie manager</h4>
                </div>
            </div>
            <div className={styles.body_sidebar}>
                <ul>
                    {
                        navs.map((nav, index) => (
                            <li 
                                key={index} 
                                onClick={() => dispatch(actionChangeComponent(nav.component))}
                                className={component === nav.component ? styles.active_nav : ''}
                            >
                                <span>
                                    {nav.icon}
                                    <p>{nav.label}</p>
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}

const mapPropsToState = (state: any) => ({
    component: state.managerComponents
})

export default connect(mapPropsToState)(SidebarHome)