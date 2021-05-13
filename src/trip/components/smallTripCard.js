import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from '../../shared/components';
import GoogleMap from '../../shared/components/maps/googleMap';
import { formatedCurrency } from '../../shared/utils';
import { showItem } from '../animations';

import {
    SmallTripCardStyled,
    SmallTripImageStyled,
    SmallTripInfoStyled,
    SmallTripButtonsStyled,
    SmallTripMainDataStyled,
    SmallTripTitleStyled
} from './tripComponentStyle.scss';

const SmallTripCard = (props) => {
    const { tripId, title, description, totalCost, budget, targetAddress, waypoints, image, animationDelay, deleteTrip } = props;
    const { userId } = useParams();

    const smallTripRef = useRef(null);

    const [showMap, setShowMap] = useState(false)
    const [isHover, setIsHover] = useState(false)

    const showMapHandler = () => {
        setShowMap(true);
    };
    const hideMapHandler = () => {
        setShowMap(false)
    };

    const showDeleButton = () => {
        setIsHover(true);
    };
    const hideDeleButton = () => {
        setIsHover(false)
    };

    useEffect(() => {
        showItem(smallTripRef, animationDelay);
    }, [animationDelay])

    return (
        <React.Fragment>
            <SmallTripCardStyled
                ref={smallTripRef}
                onMouseEnter={showDeleButton}
                onMouseLeave={hideDeleButton}
            >
                <SmallTripImageStyled>
                    <img
                        src={image}
                        alt={targetAddress.address}
                    />
                </SmallTripImageStyled>
                <SmallTripInfoStyled>
                    <SmallTripMainDataStyled>
                        <SmallTripTitleStyled>{title}</SmallTripTitleStyled>
                        <div>
                            {description}
                        </div>
                        <div>
                            {targetAddress.address}
                        </div>
                        <div>
                            <span>Koszt: </span>{formatedCurrency(totalCost.amount)}
                            {/* {totalCost.currency} */}
                        </div>
                        <div>
                            <span>Budżet: </span>{formatedCurrency(budget.amount)}
                            {/* {budget.currency} */}
                        </div>
                        {waypoints.length > 0 && (
                            <div>
                                Dodatkowo do zobaczenia {waypoints.length} { waypoints.length === 1 ? 'miejsce' : waypoints.length < 5 ? 'miejsca' : 'miejsc'}
                            </div>
                        )}
                    </SmallTripMainDataStyled>
                    <SmallTripButtonsStyled>
                        <Button clicked={showMapHandler}>Zobacz na mapie</Button>
                        <Button
                            animation
                            show={isHover}
                            clicked={() => deleteTrip(tripId)}
                            variant='icon'
                            icon='deleteButton'
                            buttonStyledConfig={{ position: 'absolute', left: '2%', top: '2%' }}
                        >Zobacz na mapie</Button>
                        <Button linkTo={`/${userId}/trips/${tripId}`}>Wybierz wycieczkę</Button>
                    </SmallTripButtonsStyled>
                </SmallTripInfoStyled>
            </SmallTripCardStyled>
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

export default SmallTripCard;