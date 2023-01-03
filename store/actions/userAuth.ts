import { TypeUserAuth } from "./types_action"
import { User } from "../types_state"

export const actionUserAuth = (user: User | any): TypeUserAuth => ({
    type: 'USER_AUTH',
    user
})