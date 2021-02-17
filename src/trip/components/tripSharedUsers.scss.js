import styled from 'styled-components';

export const SharedUsersContainerStyled = styled.div`
    padding: ${props => props.show ? '10px' : '0px'};
    position: relative;
    cursor: pointer;
`

export const SharedUsersListStyled = styled.ul`
    position: absolute;
    background-color: gray;
    width: 100%;
    display: none;
    overflow: hidden;
    box-shadow: 5px 4px 12px black;
    border: 1px solid black;
    border-radius: 8px;
    padding: 5px 5px 10px 5px;
    z-index: 100;
    li {
        list-style: none;
        padding: 5px 10px;
        display: flex;
        border-bottom: 1px solid white;
        justify-content: space-between;
        align-items: center;
    }
`