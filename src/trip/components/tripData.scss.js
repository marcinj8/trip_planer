import styled from 'styled-components';

export const TripDataContaierStyled = styled.article`
    padding: 15px;
`

export const TripDataDescriptionStyled = styled.div`

`

export const TripDescriptionCostsStyled = styled.div`
    border-bottom: 1px solid black;
    span {
        margin: 0 3px;
        text-shadow: 0 0 1px black;
        color: ${props => props.error ? 'rgba(241, 130, 141,1)' : 'white'}
    }
`