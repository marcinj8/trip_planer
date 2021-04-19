import React, { useState } from 'react';
import { Button, Modal } from '../../shared/components';
import GoogleMap from '../../shared/components/maps/googleMap';

import {
    PlaceStyled,
    PlaceDescriptionStyled,
    PlaceAddressStyled,
    PlaceButtonsStyled,
    PlaceImageStyled
} from './place.scss';

const Place = ({ image, title, targetAddress, description, deletePlace }) => {

    const [showMap, setShowMap] = useState(false)

    const showMapHandler = () => {
        setShowMap(true);
    };
    const hideMapHandler = () => {
        setShowMap(false)
    };

    return (
        <React.Fragment>
            <PlaceStyled>
                {
                    image && (
                        <PlaceImageStyled
                            alt={title}
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
                        variant='icon'
                        icon='mapButton'
                        clicked={showMapHandler}
                    >mapa</Button>
                    <Button
                        variant='icon'
                        icon='editButton'
                    >edytuj</Button>
                    <Button
                        icon='deleteButton'
                        variant='icon'
                        clicked={deletePlace}
                        buttonStyledConfig={{ bg: 'red' }}
                    >usuń</Button>
                </PlaceButtonsStyled>
            </PlaceStyled>
            <Modal
                styledChildrenConfig={{ padding: '0px' }}
                styledConfig={{ width: '90%', height: '80vh', titleFontSize: '1.2rem'}}
                header={targetAddress.address}
                footer={<Button clicked={hideMapHandler}>zamknij</Button>}
                show={showMap}
                close={hideMapHandler}
            >
                <GoogleMap
                    position={targetAddress.location}
                    zoom={15}
                />
            </Modal>
        </React.Fragment>
    )
}

export default Place;