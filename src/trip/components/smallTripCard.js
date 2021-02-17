import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../shared/components';
import {
    SmallTripCardStyled,
    SmallTripImageStyled,
    SmallTripInfoStyled,
    SmallTripButtonsStyled,
    SmallTripMainDataStyled,
    SmallTripTitleStyled
} from './tripComponentStyle.scss';

const SmallTripCard = ({ tripId, title, description, totalCost, budget, targetAddress, waypoints, image }) => {

    const { userId } = useParams();
    
    return (
        <SmallTripCardStyled >
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
                        <span>Koszt: </span>{totalCost.amount} {totalCost.currency}
                    </div>
                    <div>
                        <span>Budżet: </span>{budget.amount} {budget.currency}
                    </div>
                    {waypoints.length > 0 && (
                        <div>
                            Dodatkowo do zobaczenia {waypoints.length} { waypoints.length === 1 ? 'miejsce' : waypoints.length < 5 ? 'miejsca' : 'miejsc'}
                        </div>
                    )}
                </SmallTripMainDataStyled>
                <SmallTripButtonsStyled>
                    <Button>Zobacz na mapie</Button>
                    <Button linkTo={`/${userId}/trips/${tripId}`}>Wybierz wycieczkę</Button>
                </SmallTripButtonsStyled>
            </SmallTripInfoStyled>
        </SmallTripCardStyled>
    )
}

export default SmallTripCard;