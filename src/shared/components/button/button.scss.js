import styled from 'styled-components';

const ButtonStyled = styled.button`
    width: ${(props) => !!props.styleConfig && props.styleConfig.width ? props.styleConfig.width : 'auto'};
    margin: 5px;
    cursor: pointer;
    background: transparent;
    outline: none;
    color: ${props => props.styledConfig && props.styledConfig.color ? props.styledConfig.color : 'black'};
    &:disabled{
        cursor: not-allowed;
        border: 1px solid transparent;
        box-shadow: none;
        color: silver;
        background: rgba(255,255,255, 0.2);
    }
`
export const PrimaryButtonStyled = styled(ButtonStyled)`
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    box-shadow: 3px 4px 10px 1px rgba(0,0,0,1);
    padding: 5px;
    min-width: 80px;
    &:hover{
        background: rgba(255,255,255, 0.2);
    }
`


export const InlineButtonStyled = styled(ButtonStyled)`
    border: none;
    border-bottom: 1px solid black;
    min-width: 60px;
    padding-bottom: 5px;
    &:hover{
        font-weight: bold;
    }
`