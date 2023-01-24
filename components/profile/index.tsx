import React from 'react'
import styles from './index.module.css'
import TextField from '@mui/material/TextField';

//type User - auth
import { User as IUser } from '../../store/types_state'

//redux
import { connect } from 'react-redux'

//icons
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SaveAsIcon from '@mui/icons-material/SaveAs';

//components
import UploadPicture from '../uploadPicture';
import { Spin, message } from 'antd';

//User
import User from '../../services/User';

type Props = {
  user: IUser,
  theme: string
}

const EditProfile: React.FC<any> = ({ user, setEditMode }) => {

  interface IData {
    email: string,
    name: string,
    picture: string
  }

  const [picture, setPicture] = React.useState<any>()
  const [loading, setLoading] = React.useState<boolean>(false)

  const [messageApi, contextHolder] = message.useMessage();
  
  const [data, setData] = React.useState<IData>({
    email: user.email,
    name: user.name,
    picture: user.picture 
  } as IData)
  
  const errorMessage = (message: string, type: string | any) => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  const changeData = async () => {

    setLoading(true)

    try {
      
      var { message, success, userData } = await User.changeUserData(data)

      setLoading(false)
      
      if(success){
        errorMessage(message, 'success')
      }else{
        errorMessage(message, 'error')
      }

    } catch (error) {
      setLoading(false)
      console.log(error)
      errorMessage('Erro interno!', 'error')
    }

  }

  return (
    <>
    {contextHolder}
      <div className={styles.profile_info} style={{position: 'relative'}}>
        {
          loading && 
            <div 
              style={{
                  position: 'absolute', 
                  zIndex: '1000', 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: '0',
                  left: '0',
                  background: 'rgba(255, 255, 255, .6)'
              }}
            >
              <Spin style={{opacity: '100%'}} size='large'/>
            </div>
        }
        <div className={styles.div_userPicture}>
          <div className={styles.element_picture}>
            <img src={picture ? data.picture : user.picture} className={styles.background_img} />
            <img src={picture ? data.picture : user.picture} alt={user.name} about='user_img' />
          </div>
          <div
            className={styles.element_info_user}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
          >
            <div>
              <UploadPicture setPicture={setPicture} />
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.header_info}>
            <h4>Usuário</h4>
            <span className={styles.points}>
              <span style={{ background: '#D9D9D9' }}></span>
              <span style={{ background: '#B1A9A9' }}></span>
              <span style={{ background: '#6F6969' }}></span>
            </span>
          </div>
          <div className={styles.body_info}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              <div className={styles.info_card}>
                <p>Nome</p>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={data.name}
                  onChange={(event:any) => setData({name: event.target.value} as any)}
                  style={{ width: '100%' }}
                />
              </div>
              <div className={styles.info_card}>
                <p>E-mail</p>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={data.email}
                  onChange={(event:any) => setData({email: event.target.value} as any)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className={styles.edit_button} onClick={() => setEditMode(false)}>
                <BorderColorIcon />
                <p style={{ opacity: '100%', color: 'black' }}>Voltar</p>
              </div>
              <div className={styles.edit_button} onClick={() => changeData()}>
                <SaveAsIcon />
                <p style={{ opacity: '100%', color: 'black' }}>Salvar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Profile: React.FC<Props> = ({ user, theme }) => {

  const [editMode, setEditMode] = React.useState<boolean>(false)

  return (
    <div
      className={(theme === 'dark' && styles.profile_component_dark)
        + " " +
        styles.profile_component}
    >
      <div className={styles.card_profileOrEdit}>
        <span></span>
        <h3 style={{ margin: '0' }}>{editMode ? 'Editar perfil' : 'Meu perfil'}</h3>
      </div>
      {
        editMode ?
          <EditProfile user={user} setEditMode={setEditMode} />
          :
          <div className={styles.profile_info}>
            <div className={styles.div_userPicture}>
              <div className={styles.element_picture}>
                <img src={user.picture} className={styles.background_img} />
                <img src={user.picture ? user.picture : '/img/spock.png'} alt={user.name} about='user_img' />
              </div>
              <div className={styles.element_info_user}>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.header_info}>
                <h4>Usuário</h4>
                <span className={styles.points}>
                  <span style={{ background: '#D9D9D9' }}></span>
                  <span style={{ background: '#B1A9A9' }}></span>
                  <span style={{ background: '#6F6969' }}></span>
                </span>
              </div>

              <div className={styles.body_info}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                  <div className={styles.info_card}>
                    <p>Nome</p>
                    <h5>{user.name}</h5>
                  </div>
                  <div className={styles.info_card}>
                    <p>E-mail</p>
                    <h5>{user.email}</h5>
                  </div>
                </div>
                <div className={styles.edit_button} onClick={() => setEditMode(!editMode)}>
                  <BorderColorIcon />
                </div>
              </div>

            </div>
          </div>
      }
    </div>
  )
}

const mapPropsToState = (state: any) => ({
  user: state.auth,
  theme: state.theme
})

export default connect(mapPropsToState)(Profile)