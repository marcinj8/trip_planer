import React, { useState } from 'react';
import { Button, Modal } from '../../shared/components';
import GoogleMap from '../../shared/components/maps/googleMap';
import { TripDataContaierStyled, TripDataDescriptionStyled, TripDescriptionCostsStyled } from './tripData.scss';
import TripSharedUsers from './tripSharedUsers';

const TripData = ({
    id, description, totalCost = 0, totalCostCurrency, tripCosts, budget, shared, friends, editMode, targetAddress,
    showTripEditor, updateTrip
}) => {

    const [showMap, setShowMap] = useState(false)

    const showMapHandler = () => {
        setShowMap(true);
    };
    const hideMapHandler = () => {
        setShowMap(false)
    };

    return (
        <React.Fragment>
            <TripDataContaierStyled>
                <TripDataDescriptionStyled>
                    <h4>{description}</h4>
                    <Button
                        show={editMode}
                        clicked={() => showTripEditor([['description', description]], 'opis', id)}
                    >edytuj</Button>
                </TripDataDescriptionStyled>
                <TripDescriptionCostsStyled>
                    <span>Częściowy koszt:</span>
                    <span>{tripCosts ? tripCosts.amount : 0}</span>
                    <span>{tripCosts ? tripCosts.currency : 0}</span>
                </TripDescriptionCostsStyled>
                <TripDescriptionCostsStyled>
                    <span>Całkowity koszt:</span>
                    <span>{totalCost}</span>
                    <span>{totalCostCurrency ? totalCostCurrency : 'PLN'}</span>
                </TripDescriptionCostsStyled>
                <TripDescriptionCostsStyled>
                    <span>Założony budzet:</span>
                    <span>{budget.amount}</span>
                    <span>{budget.currency}</span>
                    <Button
                        show={editMode}
                        clicked={() => showTripEditor([['budget.amount', budget.amount], ['budget.currency', budget.currency]], 'budżet', id)}
                    >edytuj</Button>
                </TripDescriptionCostsStyled>
                <TripDescriptionCostsStyled error={budget.amount - totalCost < 0}>
                    Różnica:
                <span>{budget.amount - totalCost}</span>
                    <span>{budget.currency}</span>
                </TripDescriptionCostsStyled>
                <Button>utwórz trasę</Button>
                <Button>pokaż trasę</Button>
                <Button clicked={() => showMapHandler(true)}>Mapa</Button>
                <TripSharedUsers
                    id={id}
                    updateTrip={updateTrip}
                    friends={friends}
                    sharedUsers={shared}
                    editMode={editMode}
                />
            </TripDataContaierStyled>
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

export default TripData;