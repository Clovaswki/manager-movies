import React from 'react'

import { getUserLocalStorage } from '../../utils/userLocalStorage'

//actions
import { actionUserAuth } from '../../store/actions/userAuth'

//firebase
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../services/firebase'
//redux
import { useSelector, useDispatch } from 'react-redux'
//next
import { useRouter } from 'next/router'

//User class
import User from '../../services/User'

import usePersistentTheme from '../../customHooks/usePersistentTheme'
import { actionChangeTheme } from '../../store/actions/theme'

type Props = {
    children: JSX.Element,
    changeRoute: any
}

const ProtectedLayout: React.FC<Props> = ({ children, changeRoute }) => {

    const router = useRouter()
    // const user = useSelector((state: any) => (state.auth))
    const dispatch = useDispatch()
    const themeSelected = useSelector((state: any) => (state.theme))
    const [theme, setTheme] = usePersistentTheme<string>(themeSelected)

    React.useEffect(() => {
     
        const managerAuth = () => {

            if (auth) {
        
                let userData = getUserLocalStorage()
    
                if (userData) {
                    router.push('/home')
                    return dispatch(actionUserAuth(userData as any))
                } else {
                    User.signOut()
                    router.route !== '/register' && router.push('/')
                }
                
            } else {
    
                User.signOut()
                router.route !== '/register' && router.push('/')
        
            }
        }

        // managerAuth()

        /*onAuthStateChanged(auth, userAuth => {
            
            if (userAuth) {
    
                let userData = getUserLocalStorage()
    
                if (userData) {
                    router.push('/home')
                    return dispatch(actionUserAuth(userData as any))
                } else {
                    User.signOut()
                    router.route !== '/register' && router.push('/')
                }
                
            } else {
    
                User.signOut()
                router.route !== '/register' && router.push('/')
        
            }

        })*/
       
    }, [auth, changeRoute])
    
    React.useEffect(() => {
        dispatch(actionChangeTheme(theme))
    }, [])

    React.useEffect(() => {

        setTheme(themeSelected)

    }, [themeSelected])

    return children
}

export default ProtectedLayout