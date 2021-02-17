import React from 'react';
import { Button } from '../../shared/components';
import { TripDataContaierStyled, TripDataDescriptionStyled, TripDescriptionCostsStyled } from './tripData.scss';
import TripSharedUsers from './tripSharedUsers';

const TripData = ({
    id, description, totalCost = 0, totalCostCurrency, tripCosts, budget, shared, friends, editMode,
    showTripEditor, updateTrip
}) => {

    return (
        <TripDataContaierStyled>
            <TripDataDescriptionStyled>
                <h4>{description}</h4>
                <Button
                    show={editMode}
                    clicked={() => showTripEditor([description], 'opis', [id, 'description'])}
                    // clicked={() => showTripEditor([{ path: 'description', value: description }], 'opis', id)}
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
                    clicked={() => showTripEditor([budget.amount, budget.currency], 'budżet', [id, 'budget.amount', 'budget.currency'])}
                    // clicked={() => showTripEditor([{ path: 'budget.amount', value: budget.amount }, { path: 'budget.currency', value: budget.currency }], 'budżet', id)}
                >edytuj</Button>
            </TripDescriptionCostsStyled>
            <TripDescriptionCostsStyled error={budget.amount - totalCost < 0}>
                Różnica:
                <span>{budget.amount - totalCost}</span>
                <span>{budget.currency}</span>
            </TripDescriptionCostsStyled>
            <TripSharedUsers
                id={id}
                updateTrip={updateTrip}
                friends={friends}
                sharedUsers={shared}
            />
            <Button>utwórz trasę</Button>
            <Button>pokaż trasę</Button>
            <Button>Mapa</Button>
        </TripDataContaierStyled>
    )
}

export default TripData;