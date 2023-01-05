import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/reset.css';

//redux
import store from '../store'
import { Provider } from 'react-redux'

//protected layout
import ProtectedLayout from '../components/protectedLayout';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <ProtectedLayout>
        <Component {...pageProps} />
      </ProtectedLayout>
    </Provider>
  )
}
