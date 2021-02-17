import styled from 'styled-components';

export const PlacesListStyled = styled.div`
    width: 90%;
    height: 90vh;
    max-width: 400px;
    min-width: 280px;
    margin: 10px auto;
    color: black;
    overflow: auto;
    border-radius: 8px;
`

export const PlaceStyled = styled.div`
    width: 90%;
    margin: 10px auto;
    background-color: silver;
    color: black;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
    & img{
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
`

export const PlacesListTitleStyled = styled.h4`
    color: white;
`

export const PlaceDescriptionStyled = styled.h4`
    width: 100%;
    margin: 3px auto;
`
export const PlaceAddressStyled = styled.span`
    width: 100%;
    margin: 3px auto;
`
export const PlaceButtonsStyled = styled.div`
    border-top: 1px solid black;
    width: 100%;
    margin: 3px auto;
    padding: 5px 0;
`