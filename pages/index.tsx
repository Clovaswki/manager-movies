import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

import styles from '../styles/Signin.module.css'

import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from 'antd';

//icons
import { GoogleOutlined } from '@ant-design/icons'
import Link from 'next/link';

//components
import CardTitleLogin from '../components/cardTitleLogin';

const Signin = () => {


  return (
    <div className={styles.login_component}>

      {/* {contextHolder} */}

      <div className={styles.card_login}>
        <div className={styles.background_login}>
          <CardTitleLogin/>
        </div>
        <div className={styles.form_login}>
          {/* <SwitchTheme/> */}
          <h1 style={{margin: '1rem 0'}}>Login</h1>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 60 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
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
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" color="#fff" style={{ width: '100%' }}>
                Entrar
              </Button>
              <div className={styles.card_divider}>
                <span className={styles.__line__}></span>
                <p style={{ margin: '0 10px' }}>ou</p>
                <span className={styles.__line__}></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" icon={<GoogleOutlined />} size={'large'} loading={false} color='#fff'>
                  Faça login com o google
                </Button>
              </div>
            </Form.Item>
            <Form.Item>
              
                Novo por aqui ? <Link href={'/register'}>registre-se</Link>
             
            </Form.Item>
          </Form>
        </div>
      </div>

    </div>
  )

}

export default Signin