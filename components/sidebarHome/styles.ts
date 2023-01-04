import styled, { StyledComponent } from 'styled-components'

export const Sidebar: StyledComponent<'aside', any, {}, never> = styled.aside`
    height: 100vh;
    background-color: #ffff;
    flex: .25;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .4);
`

export const HeaderSidebar: StyledComponent<'div', any, {}, never>  = styled.div`
    padding: 1rem;
    background-image: url(/img/wallpaper-movies.jpg);
    backdrop-filter: blur(10px);
`

export const CardImg: StyledComponent<'div', any, {}, never>  = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`