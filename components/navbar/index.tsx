import React from 'react'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useSelector } from 'react-redux';

//styles 
import styles from './index.module.css'

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
        label: 'LogOut',
        key: '3',
    },
];

type TypeComponents = {
    label: string,
    component: string
}

const components: TypeComponents[] = [
    { label: 'Home', component: 'home' },
    { label: 'Favoritos', component: 'favorites' }
]


const Navbar: React.FC = () => {
    
    const state = useSelector((state: any) => (state.managerComponents))
    
    const [labelComponent, setLabelComponent] = React.useState<string>()
    
    React.useEffect(() => {
        
        findComponent()
        
    }, [state])
    
    const findComponent = () => {
    
        var choosed_component: any = components.find( c => c.component === state)
    
        setLabelComponent(choosed_component?.label)
    }

    return (
        <div className={styles.navbarApp}>
            <h4 style={{ marginLeft: '50px' }}>{labelComponent}</h4>
            <div style={{ marginRight: '15px' }}>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>

                            <img
                                src="/img/spock.png"
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