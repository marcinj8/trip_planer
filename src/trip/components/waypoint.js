import React, { useEffect } from 'react';
import { Button } from '../../shared/components';
import CostList from './costsList';

import {
    WaypointStyled,
    WaypointContentStyled,
    WaypointImageStyled,
    WaypointTitleStyled,
    WaypointDescriptionStyled
} from './tripComponentStyle.scss';

const Waypoint = ({
    id, title, targetAddress, costs, description, image, order, tripCosts,
    calculatePartialCosts, editMode, showTripEditor, deleteCost
}) => {

    useEffect(() => {
        calculatePartialCosts(costs, id);
    }, [costs, calculatePartialCosts, id])

    return (
        <WaypointStyled>
            <WaypointTitleStyled>{title}</WaypointTitleStyled>
            <Button
                show={editMode}
                clicked={() => showTripEditor([title], 'tytuł', [id, 'title'])}
            >edytuj</Button>
            <WaypointDescriptionStyled>
                <div>
                    <div>
                        {description}
                    </div>
                    <Button
                        clicked={() => showTripEditor([description], 'opis', [id, 'description'])}
                        show={editMode}
                    >edytuj</Button>
                </div>
                <div>
                    Adres <span>{targetAddress.address}</span>
                </div>
                {
                    tripCosts && (
                        tripCosts.amount
                            ? (<div>
                                Koszt przystanku:
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
                <Button>Mapa</Button>
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

        </WaypointStyled>
    )
}

export default Waypoint;