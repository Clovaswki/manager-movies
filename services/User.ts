
//firebase
//firestore
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    query,
    where,
    updateDoc
} from "firebase/firestore";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    UserCredential,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    updateEmail
} from "firebase/auth";

import { database, auth } from "./firebase";

//store
import store from "../store";

//types
import { LoginUser, RegisterUser, IUser, IUserDocConverting } from "./types";

//others
import { getUserLocalStorage, setUserLocalStorage } from "../utils/userLocalStorage";
import { actionUserAuth } from "../store/actions/userAuth";

class User {

    private collection = collection(database, 'users')
    private userReference = (id: string) => doc(database, "users", id)

    private dataListConverting(data: Object | any) {
        return data.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    }

    //get all user from database
    public async getAllUsers() {

        try {
            var users = await getDocs(this.collection)

            var docs = this.dataListConverting(users)

            return docs
        } catch (error) {
            console.log(error)
            return error
        }

    }

    //create a user by password and username
    public async createUser(registerData: RegisterUser) {

        try {
            var {
                password,
                email,
                picture,
                name,
            } = registerData

            var response = await this.getUser('email', email)

            if (response.user) {
                return { success: false, message: 'O usuário já existe' }
            }

            var newUser = await addDoc(this.collection, {
                uid: '',
                name,
                email,
                picture
            })

            var user: UserCredential = await createUserWithEmailAndPassword(auth, email, password)

            return user ? { success: true, ...newUser } : { success: false, message: 'Erro interno!' }

        } catch (error: Object | any) {
            console.log(error)
            return { success: false, ...error, message: 'Erro interno!' }
        }

    }

    //create a user by google
    public async createUserWithGoogle() {

        let response = await this.signInWithGoogle()

        try {

            if (response.code === 'auth/dont-exists') {

                let { email, displayName, photoURL, uid } = response as any

                var newUser = await addDoc(this.collection, {
                    uid,
                    name: displayName,
                    email,
                    picture: photoURL
                })

                return user ? { success: true, ...newUser } : { success: false, message: 'Erro interno!' }

            } else {
                return { success: false, message: response.message }
            }
        } catch (error) {
            return { success: false, message: 'Erro interno!', error }
        }

    }

    public async signInWithGoogle() {

        let provider = new GoogleAuthProvider()

        try {

            let result = await signInWithPopup(auth, provider)

            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential?.accessToken

            const user = result.user

            let userIsCreated = await this.getUser('uid', user.uid)

            if (userIsCreated.user) {

                var sessionData = {
                    ...userIsCreated.user as any,
                    auth: true
                }

                setUserLocalStorage(sessionData)

                delete sessionData.id

                store.dispatch(actionUserAuth(sessionData))

                return { auth: true, ...user, token, code: 'auth/exists' }
            }

            return { ...user, auth: false, code: 'auth/dont-exists', message: 'Este usuário não existe!' }

        } catch (error: any) {

            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.log(credential)

            return { auth: false, code: 'auth/error', message: errorMessage }
        }
    }

    //login user
    public async authenticate(loginData: LoginUser) {

        var { email, password } = loginData

        try {
            var user_credential: UserCredential = await signInWithEmailAndPassword(auth, email, password)

            if (user_credential) {

                // let { user } = user_credential

                var dataUser: IUserDocConverting = await this.getUser('email', email)

                var { email, name, uid, picture, id } = dataUser.user

                var dataSession = {
                    auth: true,
                    id: id,
                    email: email,
                    name: name,
                    picture: picture,
                    uid: uid
                }

                setUserLocalStorage(dataSession)

                //dispatch action to store data from user
                store.dispatch(actionUserAuth(dataSession))

                return { auth: true, message: 'logado' }

            } else {
                return { auth: false, message: 'Erro interno!' }
            }
        } catch (error: any) {
            console.log(error)
            return this.handleError(error.code)
        }

    }

    //delete user
    public async deleteUser(userId: string) {

        try {

            var user = doc(database, 'users', userId)

            await deleteDoc(user)

            return { success: true }

        } catch (error) {
            return { success: false, error: error }
        }

    }

    //getUser
    public async getUser(param: string, value: string) {

        let queryUser: any = query(this.collection, where(param, "==", value))

        let user = await getDocs(queryUser);

        let data: IUserDocConverting = { success: true, user: this.dataListConverting(user)[0] }

        return data
    }

    public signOut() {
        signOut(auth)
        setUserLocalStorage(null)
        store.dispatch(actionUserAuth({ auth: false } as any))
    }

    //error handling: firebase authentication 
    public handleError(error: string) {

        type TypeHandleError = { auth: boolean, message?: string }
        let objectError: TypeHandleError = { auth: false }
        let message: string = ''

        switch (error) {
            case 'auth/user-not-found':
                message = 'Usuário não encontrado'
                break
            case 'auth/wrong-password':
                message = 'Senha incorreta!'
                break
            default:
                message = 'Erro no login!'

        }

        return { ...objectError, message: message }
    }

    //check user is authenticated
    public checkIsAuthenticated() {

    }

    public async changeUserData(data: any) {

        let userData = getUserLocalStorage()

        let filter_userData = Object.entries(userData).filter(array => {
            return Object.keys(data).some(key => array[0] === key)
        })

        if (filter_userData.every(arr => data[arr[0]] === arr[1])) {

            return { message: "Nenhuma alteração!", success: false }

        }

        if (data.email !== userData.email) {
            try {
                await updateEmail(auth.currentUser as any, data.email)
            } catch (error) {
                return { message: "Erro interno", success: false }
            }
        }

        for (var item of Object.keys(data)) {
            userData[item] = data[item]
        }

        setUserLocalStorage(userData)

        store.dispatch(actionUserAuth(userData))

        delete userData.auth

        await updateDoc(this.userReference(userData.id), userData)

        return { message: "Alterado com sucesso", success: true, userData }

    }

}

var user = new User()

export default user