import { createContext, SetStateAction, Dispatch } from "react";

export interface IHomePage {
    openComponentMovie: {open: boolean, content: any},
    setOpenComponentMovie: SetStateAction<Dispatch<{open: boolean, content: any}>>
}

export const HomePage: IHomePage | any = createContext({} as IHomePage) 