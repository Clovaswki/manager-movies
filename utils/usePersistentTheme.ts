import { Dispatch, SetStateAction, useState, useEffect } from "react"
import store from "../store"
import { actionChangeTheme } from "../store/actions/theme"

type state<t> = [
    t,
    Dispatch<SetStateAction<t>>
]

const key = 'theme-app'

function usePersistentTheme<t>(INITIAL_STATE: t): state<t>{

    const [state, setState] = useState<t | any>(() => {

        const storageValue: any = localStorage.getItem(key)
        
        if(storageValue !== 'null'){
            return JSON.parse(storageValue)
        }else{
            return INITIAL_STATE
        }
        
    })
    
    useEffect(() => {
        store.dispatch(actionChangeTheme(state.title))
    }, [])

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])

    return[state, setState]
}

export default usePersistentTheme