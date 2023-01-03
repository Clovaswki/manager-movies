import { CollectionReference, DocumentData } from "firebase/firestore"

export interface RegisterUser {
    email: string,
    password: string,
    name: string,
    picture: string
}

export interface LoginUser {
    email: string, 
    password: string
}

export interface IUser {
    collection: CollectionReference<DocumentData> | any,
    getAllUsers: () => Promise<any>,
    createUser: (prop: RegisterUser) => Promise<any>,
    authenticate: (prop: LoginUser) => void,
}

export interface IUserDocConverting {
    success: boolean,
    user : {
        email: string,
        name: string,
        uid: string,
        picture: string, 
        id: string
    } 
}