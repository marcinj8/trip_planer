import styled from 'styled-components';

export const UserStyled = styled.section`
    /* background: rgba(161, 161, 161, .6); */
    margin: 0 auto;
    width: 95%;
    min-height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

export const UserDataSectionStyled = styled.article`
    margin: 0 ;
    border-right: none;
    padding: 10px 15px;
    width: 98%;
    @media(min-width: 860px) {
        width: 450px;
        border-right: 1px solid black;
    }
`

export const UserPlaceSectionStyled = styled.article`
    margin: 0;
    padding: 10px 5px;
    min-width: 350px;
    width:98%;
    @media(min-width: 860px) {
        width: calc(100% - 450px);
    }
    /* width: 75%; */
`