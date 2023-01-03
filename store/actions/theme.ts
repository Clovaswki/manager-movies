import { TypeTheme } from "./types_action";

//action: change theme - light or dark
export const actionChangeTheme = (theme: string): TypeTheme => ({
    type: 'CHANGE_THEME',
    theme
})