import React from "react";
import Title from "antd/es/typography/Title";
import { CodeOutlined, GoogleOutlined } from '@ant-design/icons'
import { connect } from "react-redux";
import styles from '../styles/Signup.module.css'

import Link from "next/link";

import type { UploadFile } from 'antd/es/upload/interface';

//components
import UploadPicture from '../components/uploadPicture'

import {
    Button,
    Form,
    Input,
    message
} from 'antd';

//user service
// import User from '../../services/User'
// import SwitchTheme from "../switchTheme";

type TypeCreateUser = {
    pictureFile?: string | any,
    name: string,
    password: string,
    email: string,
    confirmPass: string
}

const Signup: React.FC<any> = ({ dispatch }: { dispatch: any }) => {

    const [picture, setPicture] = React.useState<UploadFile>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loadingGoogle, setLoadingGoogle] = React.useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [form, setForm] = React.useState<TypeCreateUser>({
        name: '',
        password: '',
        email: '',
        confirmPass: ''
    });

    return (
        <div className={styles.register_component}>

            <div className={styles.title_register}>
                <div className="article_icon">
                    <span className={styles.icon_cardRegister}>
                        <CodeOutlined style={{ fontSize: '150px', color: '#fff' }} />
                    </span>
                    <span className={styles.btnLogin_cardRegister} style={{display: 'flex', justifyContent: 'center'}}>    
                        <Link href={'/'}>
                            <Button
                                style={{ background: 'transparent', color: '#fff' }}   
                            >
                                Login
                            </Button>
                        </Link>
                    </span>
                </div>
            </div>

            <div className={styles.card_register}>
                {contextHolder}
                <div className={styles.card_register_child} style={{position: 'relative'}}>

                    <div style={{ margin: '2rem 0' }}>
                        <Title level={3}>crie sua conta como cliente</Title>
                    </div>
                    <div style={{position: 'absolute', right: '3%', top: '3%'}}>
                        {/* <SwitchTheme/> */}
                    </div>

                    <div>
                        <Button 
                            type="primary" 
                            icon={<GoogleOutlined />} 
                            size={'large'} 
                            loading={loadingGoogle}
                            // onClick={() => registerWithGoogle()}
                        >
                            Faça login com o google
                        </Button>
                    </div>

                    <div style={{ width: '60%' }}>
                        <Form
                            name="register"
                            scrollToFirstError
                            labelCol={{ span: 32 }}
                            wrapperCol={{ span: 64 }}
                            style={{ flex: 1 }}
                            layout="vertical"
                            // onFinish={handleSubmit}
                            onFinishFailed={() => setLoading(false)} 
                        >

                            <Form.Item
                                name="name"
                                label="Insira o seu nome"
                                tooltip="Qual nome você deseja inserir ?"
                                rules={[{ required: true, message: 'Por favor, insira o seu nome!', whitespace: true }]}
                            >
                                <Input 
                                    placeholder="Insira o seu nome" 
                                    onChange={(event: any) => setForm((prev) => ({...prev, name: event.target.value}))}
                                    defaultValue={form.name}
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Coloque o seu e-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Esse e-mail não é válido!',
                                    },
                                    {
                                        required: true,
                                        message: 'Por favor, insira o seu e-mail!',
                                    },
                                ]}
                            >
                                <Input 
                                    placeholder="Insira o seu e-mail" 
                                    onChange={(event: any) => setForm((prev) => ({...prev, email: event.target.value}))}
                                    defaultValue={form.email}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Coloque a sua senha"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, insira a sua senha!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password 
                                    placeholder="Insira a sua senha" 
                                    onChange={(event: any) => setForm((prev) => ({...prev, password: event.target.value}))}
                                    defaultValue={form.password}
                                />
                            </Form.Item>

                            <Form.Item
                                name="confirmPass"
                                label="Repita a senha"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, confirme a sua senha!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('As senhas são diferentes!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password 
                                    placeholder="Repita a sua senha" 
                                    onChange={(event: any) => setForm((prev) => ({...prev, confirmPass: event.target.value}))}
                                    defaultValue={form.confirmPass}
                                />
                            </Form.Item>

                            <Form.Item>
                                <UploadPicture setPicture={setPicture} />
                            </Form.Item>

                            <Form.Item>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    onClick={() => setLoading(true)}
                                    style={{marginTop: '-40px'}}
                                >
                                    Cadastrar
                                </Button>

                                <Link href={'/'}>
                                    <h5 style={{margin: '0'}}>    
                                        Já faz parte do nosso time ? logue-se
                                    </h5>
                                </Link>
                            </Form.Item>

                        </Form>
                    </div>

                </div>
            </div>

        </div>
    )

}

export default Signup