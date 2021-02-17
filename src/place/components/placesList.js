import React from 'react';

import Place from './place';
import { PlacesListStyled, PlacesListTitleStyled } from './place.scss';

const PlacesList = ({ places,title, noPlacesMessage }) => {

    if (places.length === 0) {
        return <PlacesListTitleStyled>{noPlacesMessage}</PlacesListTitleStyled>
    }
    let placesList;
    placesList = places.map((place, index) => (
        <Place
            key={place.placeId}
            placeId={place.placeId}
            targetAddress={place.targetAddress}
            description={place.description}
            location={place.location}
            image={place.image}
        />
    ));

    return (
        <PlacesListStyled>
            <PlacesListTitleStyled>{title}</PlacesListTitleStyled>
            {placesList}
        </PlacesListStyled>
    )
}

export default PlacesList;