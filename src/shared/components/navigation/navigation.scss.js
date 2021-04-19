import styled from 'styled-components';

export const NavigationDesktopStyled = styled.span`
    display: none;
    @media(min-width: 850px) {
        display: block;
    }
`
export const NavigationMobileStyled = styled.span`
    display: block;
    @media(min-width: 850px) {
        display: none;
    }
`

export const NavigationStyled = styled.nav`
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    box-shadow: 3px 0 5px black;
    background: rgba(58, 83, 155, 1);
`

export const SideBarStyled = styled.nav`
    position: fixed;
    padding: 10% auto 0 auto;
    top: 0;
    left: 0;
    z-index: 100;
    width: 70%;
    min-width: 200px;
    max-width: 300px;
    height: 100%;
    background: rgba(58, 83, 155, 1);
    transform: translateX(-100%);
    opacity: 0;
`

export const SideBarToggleButtonStyled = styled.button`
    height: 100%;
    padding: 10px;
    background: transparent;
    outline: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    display: block;
    cursor: pointer;
    &:hover{
        color: gold
    }
`

export const NavigationListStyled = styled.ul`
    height: 100%;
    display: flex;
    justify-content: ${props => (props.styledConfig && props.styledConfig.justifyContent) ? props.styledConfig.justifyContent : 'flex-end'};
    flex-direction: ${props => (props.styledConfig && props.styledConfig.flexDirection) ? props.styledConfig.flexDirection : 'row'};
`

export const BorderLineStyled = styled.span`
    width:100%;
    border-top: 1px solid black;
    margin: 10% 0;
`

export const NavigationItemStyled = styled.li`
    margin: 0;
    height: 100%;
    max-height: 60px;
    list-style: none;
    cursor: pointer;
    color: white;
    &:hover {
            color: white;  
            background-color: rgba(140, 20, 252, 1);
            background-color: red;
            box-shadow: inset 0px 0px 16px 9px rgba(0,0,0,0.69);
        };
    & a {
        display: block;
        height: 100%;
        padding: 16px;
        color: white;
        text-decoration: none;
        &:visited {
            color: white;
        };
        &:active {
            color: yellow;
        };
        &.active {
            color: yellow;
            text-decoration: underline;
        };
        &:hover {
            color: white;  
            background-color: rgba(140, 20, 252, 1);
            box-shadow: inset 0px 0px 16px 3px rgba(0,0,0,0.69);
        };
    }
`