import React, { useState } from 'react';
import { Button, Modal } from '../../shared/components';
import { makeCopy } from '../../shared/utils';
import NewPlaceModal from './newPlaceModal';

import Place from './place';
import { PlacesListStyled, PlacesListContainerStyled, PlacesListTitleStyled } from './place.scss';

const PlacesList = ({ userId, places, title, noPlacesMessage, updateUser }) => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowNewPlaceModal, setIsShowNewPlaceModal] = useState(false);
    const [placeToDelete, setPlaceToDelete] = useState(null);

    const addNewPlaceHandler = () => {
        setIsShowNewPlaceModal(true);
    }

    const onDeletePlaceHandler = placeData => {
        setPlaceToDelete(placeData);
        setIsShowModal(true);
    };

    const onConfirmDeletePlaceHandler = () => {
        const placeListUpdated = makeCopy(places);
        const index = placeListUpdated.findIndex(place => place.id === placeToDelete.id);

        placeListUpdated.splice(index, 1);
        updateUser(['toVisit', placeListUpdated]);
        setIsShowModal(false);
        setPlaceToDelete(null);
    }

    let placesList;
    placesList = places.map((place, index) => (
        <Place
            key={place.id}
            placeId={place.id}
            title={place.title}
            targetAddress={place.targetAddress}
            description={place.description}
            location={place.location}
            image={place.image}
            deletePlace={() => onDeletePlaceHandler(place)}
        />
    ));

    return (
        <React.Fragment>
            <PlacesListContainerStyled>
                <PlacesListTitleStyled>{title}</PlacesListTitleStyled>
                <Button
                    clicked={addNewPlaceHandler}
                >nowe miejsce</Button>
                <PlacesListStyled>
                    {placesList.length === 0
                        ? <PlacesListTitleStyled>{noPlacesMessage}</PlacesListTitleStyled>
                        : placesList
                    }
                </PlacesListStyled>
            </PlacesListContainerStyled>
            <Modal
                header='Skasować miejsce?'
                footer={
                    <span>
                        <Button clicked={() => setIsShowModal(false)}>anuluj</Button>
                        <Button
                            buttonStyledConfig={{ bg: 'rgba(226, 106, 106, 1)', hoverBg: 'rgba(241, 169, 160, 1)' }}
                            clicked={onConfirmDeletePlaceHandler}>skasuj</Button>
                    </span>
                }
                show={isShowModal}
                close={() => setIsShowModal(false)}
            >
                {placeToDelete && (
                    <div>
                        <div>
                            {placeToDelete.description}
                        </div>
                        <div>
                            {placeToDelete.targetAddress.address}
                        </div>
                    </div>
                )}
            </Modal>
            <NewPlaceModal
                onAddPlace={updateUser}
                placesList={places}
                userId={userId}
                path='toVisit'
                close={() => setIsShowNewPlaceModal(false)}
                show={isShowNewPlaceModal}
            />
        </React.Fragment>
    )
}

export default PlacesList;