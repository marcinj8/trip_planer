import React, { useMemo, useCallback } from 'react';
import { Button, Modal } from '../../shared/components';
import { makeCopy } from '../../shared/utils';

const ChooseWaypoint = ({
    show, waypointsList, placesToVisit, userId, path,
    onAddPlace, close
}) => {

    const onAddNewPlaceHandler = useCallback((place) => {
        const placeListUpdated = makeCopy(waypointsList);
        placeListUpdated.push(place)
        onAddPlace([path, placeListUpdated])
    }, [waypointsList, onAddPlace, path]);

    const placesToAdd = useMemo(() => {
        const placesArr = [];

        placesToVisit.forEach((place, i) => {
            const index = waypointsList.findIndex(element => element.id === place.id);

            if (index >= 0) {
                return
            };

            placesArr.push(place)
        });

        return placesArr;
    }, [waypointsList, placesToVisit]);

    const content = useMemo(() => {
        const contentArr = [];
        if (placesToAdd.length < 1) {
            return <h3>brak miejsc</h3>
        }
        placesToAdd.forEach(place => {
            contentArr.push(
                <li key={place.id}>
                    <span>
                        <h4>{place.title}</h4>
                        <div>{place.description}</div>
                        <div>{place.targetAddress.address}</div>
                    </span>
                    <Button clicked={() => onAddNewPlaceHandler(place)}>dodaj</Button>
                </li>
            )
        })
        return contentArr;
    }, [placesToAdd, onAddNewPlaceHandler])

    return (
        <Modal
            header='Wybierz miejsce'
            show={show}
            close={close}
            footer={
                <Button
                    buttonStyledConfig={{ bg: 'rgba(207, 0, 15, 1)', hoverBg: 'rgba(236, 100, 75, 1)' }}
                    clicked={close}
                >zamknij</Button>}
        >
            <ul>
                {placesToAdd && content}
            </ul>
        </Modal>
    )
}

export default ChooseWaypoint;