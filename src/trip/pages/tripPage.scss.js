import styled from 'styled-components';

export const TripListStyled = styled.ul`
    position: relative; 
    width: 98%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: center;
    @media(min-width: 400px) {
        width: 90%;

    }
`

export const TripStyled = styled.div`
    width: 100%;
    margin: 0 auto;
    justify-content: center;
 
`

export const TripImageStyled = styled.img`
        width: 100%;
        height: 200px;
        object-fit: cover;
`

export const TripTitleStyled = styled.h2`
    position: absolute;
    top: 80px;
    margin: 0 auto;
    text-shadow: 0 0 5px black;
    font-size: 1.6rem;
    left: 50%;
    width: auto;
    transform: translateX(-50%);
    @media(min-width: 400px) {
        top: 120px;
    }
`

export const TripDataStyled = styled.div`
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: center;
    @media(min-width: 400px) {
        width: 90%;

    }
    & div{
        padding: 10px
    }
`

export const TripWayPointsStyled = styled.div`
    width: 95%;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    @media(min-width: 400px) {
        width: 90%;
    }
`
