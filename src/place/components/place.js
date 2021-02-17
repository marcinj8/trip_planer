import React from 'react';
import { Button } from '../../shared/components';

import {
    PlaceStyled,
    PlaceDescriptionStyled,
    PlaceAddressStyled,
    PlaceButtonsStyled
} from './place.scss';

const Place = ({ image, targetAddress, description, placeId}) => {


    return (
        <PlaceStyled>
            {
                image && (
                    <img
                        alt={description}
                        src={image}
                    />
                )
            }
            <PlaceDescriptionStyled>
                {description}
            </PlaceDescriptionStyled>
            <PlaceAddressStyled>
                {targetAddress.address}
            </PlaceAddressStyled>
            <PlaceButtonsStyled >
                <Button
                    variant='inline'
                >edytuj</Button>
                <Button
                    variant='inline'
                >mapa</Button>
                <Button
                    clicked={()=>console.log(placeId)}
                    buttonStyledConfig={{ color: 'red' }}
                    variant='inline'
                >usuń</Button>
            </PlaceButtonsStyled>
        </PlaceStyled>
    )
}

export default Place;