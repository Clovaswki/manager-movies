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

  const [changeRoute, setChangeRoute] = React.useState<null | any>(null)

  React.useEffect(() => {
    setChangeRoute(Component)
  }, [Component])

  return (
    <Provider store={store}>
      <ProtectedLayout changeRoute={changeRoute}>
        <Component {...pageProps} />
      </ProtectedLayout>
    </Provider>
  )
}
