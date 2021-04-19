import styled from 'styled-components';

export const WaypointStyled = styled.li`
    position: relative;
    list-style: none;
    margin: 20px auto;
`

export const WaypointTitleStyled = styled.h3`
    margin: 10px auto;
    padding: 25px 0 0 0 ;
    border-top: 1px solid white;
`

export const WaypointDataStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 25px auto;
    padding: 10px;
    & div {
        width: 30%;
        min-width: 250px;
    }
`

export const WaypointDescriptionStyled = styled.div`
    margin: 10px auto;
`

export const WaypointContentStyled = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
`

export const WaypointImageStyled = styled.img`
    width: 100%;
    min-width: 250px;
    max-height: 300px;
    object-fit: cover;
    @media(min-width: 700px ) {
        width: 50%;
        max-width: 400px;
    };
`
