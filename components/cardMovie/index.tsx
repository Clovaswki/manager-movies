import React from 'react'
import { Progress } from 'antd'
import styles from './index.module.css'

const CardMovie: React.FC<any> = ({data}) => {
    return (
        <div className={styles.card_movie}>
            <img src={'https://image.tmdb.org/t/p/original/' + data.poster_path} />
            <div>
                <Progress
                    type='circle'
                    percent={Number(data.popularity.toString().slice(0, 2))}
                    strokeColor={{ '10%': '#108ee9', '100%': '#87d068' }}
                    width={80}
                    trailColor='#fff'
                    style={{
                        zIndex: '20',
                        position: 'absolute',
                        color: '#fff',
                        top: '-50px',
                        right: '-150px'
                    }}
                />
                <small>{data.release_date}</small>
                <h5>{data.title}</h5>
            </div>
        </div>
    )
}

export default CardMovie