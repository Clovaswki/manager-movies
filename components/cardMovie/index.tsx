import React from 'react'
import { Progress } from 'antd'
import styles from './index.module.css'
import { message } from 'antd'

//home page context
import UseHomePage from '../../contexts/homePage/homePage';

//redux
import { useSelector } from 'react-redux';

//icons
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';

//save hook
import useHandleSaveMovie from '../../customHooks/useHandleSaveMovie';

const CardMovie: React.FC<any> = ({data}) => {
    
    //data context
    const { setOpenComponentMovie } = UseHomePage()

    //redux data
    const dataMovies = useSelector((state:any) => (state.dataMovies))
    
    //states
    const [messageApi, contextHolder] = message.useMessage();
    const [saveMovie, setSaveMovie] = useHandleSaveMovie(data)

    const errorMessage = (message: string, type: any) => {
      messageApi.open({
        type: type,
        content: message,
      });
    };  

    return (
        <>
        {contextHolder}
        <div className={styles.card_movie}>
            <img 
                src={'https://image.tmdb.org/t/p/original/' + data.poster_path} 
                onClick={() => setOpenComponentMovie({open: true, content: data} as any)}
            />
            <div className={styles.info_card}>
                <div className={styles.save_button} onClick={() => setSaveMovie({changeStateSave: true} as any)}>
                    {
                        saveMovie.isSave ?
                            <BookmarksIcon/>
                        :
                            <BookmarksOutlinedIcon/>
                    }
                </div>
                <small>{data.release_date}</small>
                <h5>{data.title}</h5>
            </div>
        </div>
        </>
    )
}

export default CardMovie