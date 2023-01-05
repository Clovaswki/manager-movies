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

type Props = {
    children: JSX.Element
}

const ProtectedLayout: React.FC<Props> = ({ children }) => {

    const router = useRouter()
    // const user = useSelector((state: any) => (state.auth))
    const dispatch = useDispatch()

    React.useEffect(() => {

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

    }, [])

    return children
}

export default ProtectedLayout