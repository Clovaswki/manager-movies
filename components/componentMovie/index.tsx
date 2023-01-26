import React from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux';

//icons
import CloseIcon from '@mui/icons-material/Close';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';

//Api
import { Api } from '../../services/ApiMovies';

//home page context
import UseHomePage from '../../contexts/homePage/homePage';

//movie save hook
import useSaveMovie from '../../customHooks/saveMovie';

type Props = {
    theme: string
}

const ComponentMovie: React.FC<Props> = ({theme}) => {

    const { setOpenComponentMovie, openComponentMovie } = UseHomePage()
    
    const [content, setContent] = React.useState<any>(openComponentMovie.content)
    const [video, setVideo] = React.useState<any>(null)
    const [credits, setCredits] = React.useState<any>(null)
    const [movieSave, setMovieSave] = useSaveMovie(content)

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
        <div 
            className={(theme === 'dark' && styles.movie_component_dark)+" "+styles.movie_component}
        >
            <div
                className={styles.moviePicture_card}
                style={{ background: `url(https://image.tmdb.org/t/p/original${content.poster_path})`}}
            >
                <div className={styles.buttons}>
                    <div className={styles.close_button} onClick={() => setOpenComponentMovie({open: false} as any)}>
                        <CloseIcon/>
                    </div>
                    <div className={styles.save_button} onClick={() => setMovieSave({changeStateSave: true} as any)}>
                        {
                            movieSave.isSave ?
                                <BookmarksIcon/>
                            :
                                <BookmarksOutlinedIcon/>
                        }
                    </div>
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
                                <span key={index}>
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

const mapPropsToState = (state: any) => ({
    theme: state.theme
})

export default connect(mapPropsToState)(ComponentMovie)