import { User } from "../store/types_state";

const keyWebStorage = 'user'

export const setUserLocalStorage = (user: User | null ): void => {

    let data: any = user ? JSON.stringify(user) : null 

    localStorage.setItem(keyWebStorage, data)

}

export const getUserLocalStorage = () => {

    let user: any = localStorage.getItem(keyWebStorage)

    let json = JSON.parse(user)

    return json
}