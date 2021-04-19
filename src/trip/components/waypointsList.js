import React from 'react';

import Waypoint from './waypoint';
import { WaypoinsListStyled } from './tripComponentStyle.scss';

const WaypointsList = ({
    waypointsList, tripCosts,
    calculatePartialCosts, editMode, showTripEditor, deleteCost, deleteWaypointHandler
}) => {

    if (waypointsList.length === 0) {
        return (
            <div>
                <h2> brak dodatkowych miejsc</h2>
                <div>dodaj miejsce</div>
            </div>
        )
    };

    const sortWaypoints = (obj, obj2) => obj.order - obj2.order
    const sortedList = waypointsList.sort(sortWaypoints);

    let list;
    list = sortedList.map(waypoint => (
        <Waypoint
            key={waypoint.id}
            id={waypoint.id}
            title={waypoint.title}
            targetAddress={waypoint.targetAddress}
            costs={waypoint.costs}
            description={waypoint.description}
            editMode={editMode}
            image={waypoint.image}
            tripCosts={tripCosts[waypoint.id]}
            calculatePartialCosts={calculatePartialCosts}
            showTripEditor={showTripEditor}
            deleteCost={deleteCost}
            deleteWaypointHandler={() => deleteWaypointHandler(true, waypoint)}
        />
    ))

    return (
        <WaypoinsListStyled>
            {list}
        </WaypoinsListStyled>
    )
}

export default WaypointsList;