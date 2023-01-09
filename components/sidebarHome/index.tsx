import React, { ReactNode, useEffect } from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

//actions
import { actionChangeComponent } from '../../store/actions/managerComponents';

//icons
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

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

const SidebarHome: React.FC<Props> = ({ component, dispatch, collapsed }) => {

    const navs: Navs[] = [
        { label: 'Home', icon: <HomeOutlinedIcon />, component: 'home' },
        // { label: 'Controle', icon: <WidgetsOutlinedIcon />, component: 'controls' },
        { label: 'Favoritos', icon: <BookmarksOutlinedIcon />, component: 'favorites' },
    ]

    useEffect(() => {

    }, [collapsed])

    return (
        <aside className={collapsed ? styles.sidebar : styles.show_sidebar}>
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