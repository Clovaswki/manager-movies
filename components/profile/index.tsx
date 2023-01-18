import React from 'react'
import styles from './index.module.css'

//type User - auth
import { User } from '../../store/types_state'

//redux
import { connect } from 'react-redux'

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
          <span>
            <h4>Usuário</h4>
          </span>
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