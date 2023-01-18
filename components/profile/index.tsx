import React from 'react'
import styles from './index.module.css'

//type User - auth
import { User } from '../../store/types_state'

//redux
import { connect } from 'react-redux'

//icons
import BorderColorIcon from '@mui/icons-material/BorderColor';

type Props = {
  user: User,
  theme: string
}

const Profile: React.FC<Props> = ({user, theme}) => {

  return (
    <div className={styles.profile_component}>
      <div className={styles.card_profileOrEdit}>
        <span></span>
        <h3 style={{margin: '0'}}>Meu perfil</h3>
      </div>
      <div className={styles.profile_info}>
        <div className={styles.div_userPicture}>
          <div className={styles.element_picture}>
            <img src={user.picture} className={styles.background_img}/>
            <img src={user.picture ? user.picture : '/img/spock.png'} alt={user.name} />
          </div>
          <div className={styles.element_info_user}>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.header_info}>
            <h4>Usuário</h4>
            <span className={styles.points}>
              <span style={{background: '#D9D9D9'}}></span>
              <span style={{background: '#B1A9A9'}}></span>
              <span style={{background: '#6F6969'}}></span>
            </span>
          </div>
          <div className={styles.body_info}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '.6rem'}}>
              <div className={styles.info_card}>
                <p>Nome</p>
                <h5>{user.name}</h5>
              </div>
              <div className={styles.info_card}>
                <p>E-mail</p>
                <h5>{user.email}</h5>
              </div>
            </div>
            <div className={styles.edit_button}>
              <BorderColorIcon/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapPropsToState = (state: any) => ({
  user: state.auth,
  theme: state.theme
})

export default connect(mapPropsToState)(Profile)