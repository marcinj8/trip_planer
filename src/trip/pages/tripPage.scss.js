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

export const NewTripStyled = styled.article`
    width: 95%;
    margin: 30px auto 0 auto;
    padding: 25px 5px;
    max-width: 600px;
    background: rgba(34, 49, 63, 0.6);
    background: rgba(58, 83, 155, 1);
    border-radius: 5px;
    border: 1px solid white;
    box-shadow: 5px 5px 15px 5px #000000;
    color: white;
    @media(min-width: 600px) {
        width: 50%;
    }
`

export const NewTripHeaderStyled = styled.h2`
    margin: 10px auto;
    @media(min-width: 600px) {
        margin: 20px auto;
    }
`

export const TipListHeaderStyled = styled.h2`
    margin: 25px auto 20px auto;
`