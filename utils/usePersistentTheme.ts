import { Dispatch, SetStateAction, useState, useEffect } from "react"

type state<t> = [
    t,
    Dispatch<SetStateAction<t>>
]

const key = 'theme-app'

function usePersistentTheme<t>(INITIAL_STATE: t): state<t>{

    const [state, setState] = useState<t | any>(() => {

        var storageValue: any = 'null'

        if(typeof window !== 'undefined'){
            storageValue = localStorage.getItem(key)
        }
        
        if(storageValue !== 'null'){
            return JSON.parse(storageValue)
        }else{
            return INITIAL_STATE
        }
        
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])


    return[state, setState]
}

export default usePersistentTheme