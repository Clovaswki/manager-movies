import React, { ReactNode, useEffect, CSSProperties, SetStateAction, Dispatch as dispatch } from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Popover } from 'antd';

//actions
import { actionChangeComponent } from '../../store/actions/managerComponents';

//icons
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

//styles
// import { Sidebar, HeaderSidebar, CardImg } from './styles'
import styles from './index.module.css'

type Props = {
    component: string,
    dispatch: Dispatch,
    collapsed: boolean,
    theme: string,
    setCollapsedSearch: SetStateAction<dispatch<boolean | any>>,
    user: any
}

type Navs = {
    label: string,
    icon: ReactNode,
    component: string
}


const SidebarHome: React.FC<Props> = ({ component, dispatch, collapsed, theme, setCollapsedSearch, user }) => {
    
    const navs: Navs[] = [
        { label: 'Home', icon: <HomeOutlinedIcon />, component: 'home' },
        { label: 'Categorias', icon: <WidgetsOutlinedIcon />, component: 'categories' },
        { label: 'Favoritos', icon: <BookmarksOutlinedIcon />, component: 'favorites' },
        { label: 'Meu perfil', icon: null, component: 'profile' }
    ]

    const stylesSidebar: CSSProperties = {
        boxShadow: '1px 1px 10px rgba(0, 0, 0, .2)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        fontFamily: 'Arial, Helvetica, sans-serif',
        transition: '500ms',
        // background: theme === 'dark' ? '#e78c8c' : '#fff'
    }

    return (
        <aside
            className={
                (theme === 'dark' && styles.sidebar_dark)+' '+
                (collapsed ? styles.sidebar : styles.show_sidebar)
            }
            style={stylesSidebar}
        >
            <div className={styles.header_sidebar}>
                <div className={styles.card_img}>
                    <img
                        src="/img/logo.png"
                        alt="logo"
                        width={'60px'}
                        height={'60px'}
                        style={{ transition: '500ms' }}
                    />
                    {
                        !collapsed && <h4>Movie manager</h4>
                    }
                </div>
            </div>
            <div className={styles.body_sidebar}>
                <ul>
                    {
                        navs.map((nav, index) => (
                            <Popover key={index} placement="right" content={<h4 style={{margin:0}}>{nav.label}</h4>}>
                                <li
                                    onClick={() => dispatch(actionChangeComponent(nav.component))}
                                    className={component === nav.component ? styles.active_nav : ''}
                                    about={nav.component}
                                >
                                    <span>
                                        {
                                            nav.component === 'profile'
                                            ? 
                                            (user.picture &&
                                                <img 
                                                    src={user.picture} 
                                                    style={{width: '30px', height: '30px', borderRadius: '40%'}}
                                                />
                                            )
                                            :
                                            nav.icon
                                        }
                                        {
                                            !collapsed && <p>{nav.label}</p>
                                        }
                                    </span>
                                </li>
                            </Popover>
                        ))
                    }
                </ul>
                <span className={styles.btn_search_mobile} onClick={() => setCollapsedSearch(prev => !prev)}>
                    <SearchTwoToneIcon style={{opacity: '50%'}}/>
                </span>
            </div>
        </aside>
    )
}

const mapPropsToState = (state: any) => ({
    component: state.managerComponents,
    theme: state.theme,
    user: state.auth
})

export default connect(mapPropsToState)(SidebarHome)