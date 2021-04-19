import styled from 'styled-components';

const InputSytled = styled.input`
    width: 80%;
    outline: none;
    margin: 10px auto;
    padding: 5px 10px;
    font-size: 1.1em;
    &:focus{
        background: transparent
    }
    &:active{
        background: transparent
    }
`

export const PrimaryInputSytled = styled(InputSytled)`
    border-radius: 5px;
    color: ${props => props.danger ? 'red' : 'white'};
    background: ${props => props.danger ? 'rgba(229, 154, 154, 0.86)' : 'transparent'};
`

export const SecondaryInputSytled = styled(InputSytled)`
    border: none;
    border-bottom: ${props => props.danger ? ' 1px solid red' : ' 1px solid black'};
    border-radius: 5px 5px 1px 1px;
    color: ${props => props.danger ? 'red' : 'white'};
    background: ${props => props.danger ? 'rgba(229, 154, 154, 0.86)' : 'transparent'};
    &::placeholder{
        color: ${props => props.styledConfig && props.styledConfig.color ? props.styledConfig.color : 'white'}
    }
`
export const TextareaSytled = styled.textarea`
    width: 150px;
    margin: 5px;
    padding: 2px 8px;
    border-radius: 5px;
`

export const InputContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center
`