import React, { SetStateAction, Dispatch } from 'react'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useSelector } from 'react-redux';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from '@mui/material/IconButton'

//styles 
import styles from './index.module.css'

import User from '../../services/User';

const items: MenuProps['items'] = [
    {
        label: (
            <a target="_blank">
                Perfil
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a target="_blank">
                Info
            </a>
        ),
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: (
            <a onClick={() => User.signOut()}>
                Logout
            </a>
        ),
        key: '3',
    },
];

type TypeComponents = {
    label: string,
    component: string
}

type Props = {
    setCollapsed: SetStateAction<Dispatch<boolean>> | any,
    collapsed: boolean
}

const components: TypeComponents[] = [
    { label: 'Home', component: 'home' },
    { label: 'Favoritos', component: 'favorites' },
    { label: 'Sobre', component: 'about'},
    { label: 'Categorias', component: 'categories'}
]


const Navbar: React.FC<Props> = ({setCollapsed, collapsed}) => {

    const { managerComponents, auth } = useSelector((state: any) => state)

    const [labelComponent, setLabelComponent] = React.useState<string>()

    React.useEffect(() => {

        findComponent()

    }, [managerComponents])

    const findComponent = () => {

        var choosed_component: any = components.find(c => c.component === managerComponents)

        setLabelComponent(choosed_component?.label)
    }

    return (
        <div className={styles.navbarApp}>
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', gap: '10px'}}>
                <span className={styles.btn_sidebar_hide}>
                    <IconButton 
                        onClick={() => setCollapsed((prev:boolean) => !prev)}
                        style={{display: 'flex', alignItems: 'center'}} 
                    >
                        <MenuOpenIcon style={collapsed ? {transform: 'rotate(180deg)'} : {}}/>
                    </IconButton>
                </span>
                <h4>{labelComponent}</h4>
            </div>
            <div className={styles.logo_navbar}>
                <img src="/img/logo.png" alt="logo" width={'50px'} height={'50px'} />
                <h4>Movie manager</h4>
            </div>
            <div style={{ marginRight: '15px' }}>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>

                            <img
                                className={styles.img_user}
                                src={auth.picture ? auth.picture : "/img/spock.png"}
                                width={'40px'}
                                height='40px'
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />

                        </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    )
}

export default Navbar