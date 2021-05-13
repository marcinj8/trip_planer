import React, { useEffect, useState } from 'react';
import { Button, Modal } from '../../shared/components';
import GoogleMap from '../../shared/components/maps/googleMap';
import CostList from './costsList';

import {
    WaypointStyled,
    WaypointContentStyled,
    WaypointImageStyled,
    WaypointTitleStyled,
    WaypointDescriptionStyled,
    WaypointDataStyled
} from './waypoint.scss';

const Waypoint = ({
    id, title, targetAddress, costs, description, image, order, tripCosts,
    calculatePartialCosts, editMode, showTripEditor, deleteCost, deleteWaypointHandler
}) => {

    const [showMap, setShowMap] = useState(false)

    const showMapHandler = () => {
        setShowMap(true);
    };
    const hideMapHandler = () => {
        setShowMap(false)
    };

    useEffect(() => {
        calculatePartialCosts(costs, id);
    }, [costs, calculatePartialCosts, id])

    return (
        <React.Fragment>
            <WaypointStyled>
                <WaypointTitleStyled>{title}</WaypointTitleStyled>
                <Button
                    variant='primary'
                    show={editMode}
                    clicked={() => showTripEditor([['title', title]], 'tytuł', id)}
                >edytuj</Button>

                <Button
                    variant='primary'
                    clicked={() => showMapHandler(true)}
                >mapa</Button>
                <Button
                    show={editMode}
                    variant='icon'
                    icon='deleteButton'
                    buttonStyledConfig={{ bg: 'red' }}
                    style={{ position: 'absolute', right: '10px' }}
                    clicked={deleteWaypointHandler}
                >usuń</Button>
                <WaypointDescriptionStyled>
                    <WaypointDataStyled>
                        <div>
                            <h4>
                                {description}
                            </h4>
                            <Button
                                clicked={() => showTripEditor([['description', description]], 'opis', id)}
                                show={editMode}
                            >edytuj</Button>
                        </div>
                        <div>
                            <h4> Adres: </h4> <span>{targetAddress.address}</span>
                        </div>
                        {
                            tripCosts && (
                                tripCosts.amount
                                    ? (<div>
                                        <h4> Koszt przystanku: </h4>
                                        <span>
                                            {tripCosts.amount}
                                        </span>
                                        <span>
                                            {tripCosts.currency}
                                        </span>
                                    </div>)
                                    : (
                                        <h3>
                                            Nie dodano kosztów
                                        </h3>
                                    )
                            )
                        }
                    </WaypointDataStyled>

                </WaypointDescriptionStyled>
                <WaypointContentStyled>
                    <WaypointImageStyled
                        src={image}
                        alt={title}
                    />
                    <CostList
                        editMode={editMode}
                        costListConfigStyled={{ maxHeight: '300' }}
                        showTripEditor={showTripEditor}
                        id={id}
                        costs={costs}
                        deleteCost={deleteCost}
                    />
                </WaypointContentStyled>

            </WaypointStyled >
            <Modal
                styledChildrenConfig={{ padding: '0px' }}
                styledConfig={{ width: '90%', height: '80vh', titleFontSize: '1rem' }}
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

export default Waypoint;