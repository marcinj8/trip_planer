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
    background: rgb(131,58,180);
    background: linear-gradient(180deg, rgba(131,58,180,0.7287289915966386) 0%, rgba(253,29,29,0.7147233893557423) 50%, rgba(252,176,69,0.711922268907563) 100%);
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
    background: rgb(131,58,180);
    background: linear-gradient(180deg, rgba(131,58,180,0.9287289915966386) 0%, rgba(253,29,29,0.9147233893557423) 50%, rgba(252,176,69,0.911922268907563) 100%);
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
            color: gold;   
        };
    & a {
        display: block;
        padding: 15px   ;
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
            color: gold;   
        };
    }
`