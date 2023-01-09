import { Action } from "redux";
import { User } from "../types_state";

//actions: managerComponents
    export interface TypeComponentChoosed extends Action{
        type: 'CHANGE_COMPONENT',
        component: string
    }

//actions: user auth
    export interface TypeUserAuth extends Action{
        type: 'USER_AUTH',
        user: User
    }

//actions: theme global
    export interface TypeTheme extends Action{
        type: 'CHANGE_THEME',
        theme: string
    }

//actions: data movies
    export interface TypeDataMovies extends Action{
        type: 'FETCH_DATA_MOVIES',
        data: any[]
    }