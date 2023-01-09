import React from 'react'

//styles
import styles from './index.module.css'

const CardTitleLogin: React.FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src='/img/logo.png' alt='logo' width='100px' height='100px'/>   
                <h2 style={{ color: '#ffff', fontSize: '30px', width: '100px', margin: '0' }}>
                    Movies Manager
                </h2>
            </div>
        </div>
    )
}

export default CardTitleLogin