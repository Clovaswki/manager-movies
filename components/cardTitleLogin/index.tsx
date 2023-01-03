import React from 'react'
import { CodeOutlined } from '@ant-design/icons'

//styles
import styles from './index.module.css'

const CardTitleLogin: React.FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <CodeOutlined style={{ fontSize: '120px', color: '#fff' }} />
                <h2 style={{ color: '#ffff', fontSize: '30px' }}>
                    Movies Manager
                </h2>
            </div>
        </div>
    )
}

export default CardTitleLogin