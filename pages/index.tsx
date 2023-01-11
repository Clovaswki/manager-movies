import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from '../styles/Signin.module.css'
import { connect } from "react-redux";

//icons
import { GoogleOutlined } from '@ant-design/icons'

//next
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

//components
import CardTitleLogin from '../components/cardTitleLogin';
import SwitchTheme from "../components/switchTheme";

//user services
import User from '../services/User';

type Props = {
  theme: string
}

const Signin: React.FC<Props> = ({theme}) => {

  type User = {
    email: string,
    password: string
  }

  const [form, setForm] = React.useState<User | null>({
    email: '',
    password: ''
  })

  const router = useRouter()

  const [loading, setLoading] = React.useState<boolean>(false)

  const [messageApi, contextHolder] = message.useMessage();

  const errorMessage = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const onFinish = async ({ email, password }: User) => {
    setLoading(true)

    setForm({ email, password })

    var response = await User.authenticate({ email, password })

    setLoading(false)

    if (!response.auth) {

      return errorMessage(response.message)

    }

    router.push('/home')

  };

  const onFinishFailed = (error: any) => {
    var errors: string[] = []

    error.errorFields.forEach((err: object | any) => {
      errors.push(`${err.errors.join(' ')}`)
    })

    errors.length > 1
      ? errors.forEach(err => errorMessage(err))
      : errorMessage(`${errors.join(' ')}`)

  };

  const signinWithGoogle = async () => {

    var response = await User.signInWithGoogle()
    
    if(response.code == 'auth/error' || !response.auth){
      return errorMessage(response.message)
    }

    router.push('/home')

  }

  return (
    <>
    <Head>
      <title>Movies Manager | Login</title>
    </Head>
    <div className={theme === 'dark' ? styles.login_component_dark : styles.login_component}>

      {contextHolder}

      <div className={styles.card_login}>
        <div className={styles.background_login}>
          <CardTitleLogin />
        </div>
        <div className={styles.form_login}>
          <SwitchTheme/>
          <h1 style={{ margin: '1rem 0' }}>Login</h1>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 60 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password style={theme === 'dark' ? {background: '#3B4654'} : {}}/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
                <Checkbox className={styles.checkbox}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit" color="#fff" style={{ width: '100%' }}>
                Entrar
              </Button>
              <div className={styles.card_divider}>
                <span className={styles.__line__}></span>
                <p style={{ margin: '0 10px' }}>ou</p>
                <span className={styles.__line__}></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                  type="primary" 
                  icon={<GoogleOutlined />} 
                  size={'large'} 
                  loading={false} 
                  color='#fff'
                  onClick={() => signinWithGoogle()}
                >
                  Faça login com o google
                </Button>
              </div>
            </Form.Item>
            <Form.Item>

              <div className={styles.link_text}>
                Novo por aqui ? <Link href={'/register'}>registre-se</Link>
              </div>

            </Form.Item>
          </Form>
        </div>
      </div>

    </div>
    </>
  )

}

const mapPropsToState = (state: any) => ({
  theme: state.theme
})

export default connect(mapPropsToState)(Signin)