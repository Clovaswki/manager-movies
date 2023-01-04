import { TypeComponentChoosed } from "./types_action";

export const actionChangeComponent = (component: string): TypeComponentChoosed => ({
    type: 'CHANGE_COMPONENT',
    component
})