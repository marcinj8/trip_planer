import styled from 'styled-components';

export const PlacesListContainerStyled = styled.div`
    width: 100%;
    height: 90vh;
    min-width: 280px;
    overflow-y: auto;
    margin: 10px auto;
    color: black;
`

export const PlacesListStyled = styled.ul`
    width: 100%;
    margin: 10px auto;
    color: black;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 8px;
`

export const PlaceStyled = styled.li`
    width: 90%;
    max-width: 350px;
    margin: 10px 10px;
    background-color: silver;
    color: black;
    overflow: hidden;
    list-style: none;
    border-radius: 8px;
    transform: translateY(-100px);
    opacity: 0;
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
`

export const PlaceImageStyled = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
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
    margin: 2px auto;
    padding: 1px 0;
`