import styled from 'styled-components';

const ButtonStyled = styled.button`
    position: relative;
    opacity: ${props => props.animation ? 0 : 1};
    width: ${(props) => !!props.styledConfig && props.styledConfig.width ? props.styledConfig.width : 'auto'};
    min-height: 20px;
    margin: 10px 5px 5px 5px;
    cursor: pointer;
    background: ${(props) => !!props.styledConfig && props.styledConfig.bg ? props.styledConfig.bg : 'transparent'};
    outline: none;
    &:disabled{
        cursor: not-allowed;
        border: 1px solid transparent;
        box-shadow: none;
        color: silver;
        background: rgba(255,255,255, 0.2);
    }
    &:hover{
        background: ${props => props.styledConfig && props.styledConfig.hoverBg ? props.styledConfig.hoverBg : 'rgba(255,255,255, 0.2)'};
    }
`
export const PrimaryButtonStyled = styled(ButtonStyled)`
    border: 1px solid white;
    color: ${props => props.styledConfig && props.styledConfig.color ? props.styledConfig.color : 'white'};
    border-radius: 5px;
    box-shadow: 3px 4px 10px 1px rgba(0,0,0,1);
    padding: 5px;
    min-width: 80px;
    &:hover{
        background: ${props => props.styledConfig && props.styledConfig.hoverBg ? props.styledConfig.hoverBg : 'rgba(255,255,255, 0.2)'};
    }
`


export const InlineButtonStyled = styled(ButtonStyled)`
    border: none;
    color: ${props => props.styledConfig && props.styledConfig.color ? props.styledConfig.color : 'black'};
    border-bottom: 1px solid black;
    min-width: 60px;
    padding-bottom: 5px;
    &:hover{
        font-weight: bold;
    }
`
export const IconButtonStyled = styled.button`
    position: ${props => props.styledConfig && props.styledConfig.position ? props.styledConfig.position : 'static'};
    top: ${props => props.styledConfig && props.styledConfig.top ? props.styledConfig.top : 'auto'};
    left: ${props => props.styledConfig && props.styledConfig.left ? props.styledConfig.left : 'auto'};
    opacity: ${props => props.animation ? 0 : 1};
    height: 30px;
    width: 30px;
    padding: 0;
    margin: 10px;
    color: ${props => props.styledConfig && props.styledConfig.color ? props.styledConfig.color : 'white'};
    cursor: pointer;
    background: ${(props) => !!props.styledConfig && props.styledConfig.bg ? props.styledConfig.bg : 'rgba(232, 236, 241, 1)'};
    outline: none;
    border-radius: 5px;
    overflow: hidden;
    &:disabled{
        cursor: not-allowed;
        box-shadow: none;
        color: silver;
        background: rgba(255,255,255, 0.2);
    }
`
export const ButtonImageStyled = styled.img`
    padding: 1px;
    width: 25px;
    height: 25px;
    &:hover{
        font-weight: bold;
    }
`