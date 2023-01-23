import React, { SetStateAction, Dispatch } from 'react'
import styles from './index.module.css'

//icons
import CloseIcon from '@mui/icons-material/Close';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

//Api
import { Api } from '../../services/ApiMovies';

type State = { content: any, open: boolean }

type Props = {
    setOpenComponentMovie: SetStateAction<Dispatch<State>> | any,
    openComponentMovie: State
}

const ComponentMovie: React.FC<Props> = ({ setOpenComponentMovie, openComponentMovie }) => {

    const [content, setContent] = React.useState<any>(openComponentMovie.content)
    const [video, setVideo] = React.useState<any>(null)
    const [credits, setCredits] = React.useState<any>(null)

    React.useEffect(() => {
        setContent(openComponentMovie.content)
    }, [openComponentMovie])

    React.useEffect(() => {

        const fetchVideo = async () => {

            try {
                
                var response = await Api.get(`/movie/${content.id}/videos?language=en-US`)

                setVideo(response.data.results[0])

            } catch (error) {
                console.log(error)
            }

        }

        const fetchCredits = async () => {
           
            try {
                
                var response = await Api.get(`/movie/${content.id}/credits?language=en-US`)

                setCredits(response.data)
                
            } catch (error) {
                console.log(error)
            }

        }

        fetchCredits()
        fetchVideo()

    }, [])
    
    React.useEffect(() => {
        console.log(credits)
    }, [credits])

    return (
        <div className={styles.movie_component}>
            <div
                className={styles.moviePicture_card}
                style={{ background: `url(https://image.tmdb.org/t/p/original${content.poster_path})`}}
            >
                <div className={styles.close_button} onClick={() => setOpenComponentMovie({open: false})}>
                    <CloseIcon/>
                </div>
            </div>
            <div className={styles.infoMovie_section}>
                <div className={styles.primary_info}>
                    <div className={styles.left}>
                        <div className={styles.infoMovie_card}>
                            <span>
                                <h4>{content.title}</h4>
                                <p>{content.release_date}</p>
                            </span>
                        </div>
                        <div className={styles.sinopse}>
                            <p>
                                {content.overview}
                            </p>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.title_cardVideo}>
                            <span>
                                <LocalMoviesIcon style={{fontSize: '50px'}}/>
                                <h4>{video?.name}</h4>
                                <ArrowCircleDownIcon style={{fontSize: '50px'}}/>
                            </span>
                            <iframe 
                                src={'https://www.youtube.com/embed/'+video?.key} 
                                allowFullScreen
                            >

                            </iframe> 
                        </div>
                    </div>             
                </div>
                <div className={styles.secondary_info}>
                
                    <div className={styles.credits}>

                        {
                            credits?.cast.map((item:any, index:number) => (
                                <span>
                                    <img 
                                        referrerPolicy='no-referrer' 
                                        src={"https://image.tmdb.org/t/p/original/"+item.profile_path}
                                    />
                                    <h4>{item.original_name}</h4>
                                </span>
                            ))
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ComponentMovie