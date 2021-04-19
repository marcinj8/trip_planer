import React from 'react';
import { CostList, TripData } from '.';

import { Button } from '../../shared/components';
import WaypointsList from './waypointsList';

import {
    TripContainerStyled,
    TripTitleStyled,
    TripControlsButtonsStyled,
    TripImageStyled,
    TripDataStyled,
    TripWayPointsStyled
} from './tripContainer.scss';

const TripContainer = ({
    displayedTrip, tripState, costState, user,
    toggleEditMode, changeDisplayedTrip, acceptChangesHandler, discardChangesHandler, updateTrip, newPlaceModalHandler,
    showTripEditorHandler, deleteCostHandler, calculatePartialCosts, deleteWaypointHandler
}) => {

    const buttonStyle = {
        bg: 'grey',
        hoverBg: 'silver'
    };

    console.log(tripState.isChangesMade, tripState.editMode)
    return (
        <TripContainerStyled>
            <TripTitleStyled>{displayedTrip.title}</TripTitleStyled>
            <TripImageStyled
                src={displayedTrip.image}
                alt={displayedTrip.title}
            />
            <TripControlsButtonsStyled>
                <Button
                    disabled={tripState.currentShow === 'trip'}
                    clicked={toggleEditMode}
                    buttonStyledConfig={buttonStyle}
                >{tripState.editMode ? 'zakończ edycję' : 'edytuj'}</Button>
                <Button
                    show={tripState.isChangesMade}
                    clicked={acceptChangesHandler}
                    buttonStyledConfig={buttonStyle}
                    animation
                >zatwierdź zmiany</Button>
                <Button
                    show={tripState.isChangesMade}
                    clicked={discardChangesHandler}
                    buttonStyledConfig={buttonStyle}
                    animation
                >anuluj zmiany</Button>
                <Button
                    show={tripState.isChangesMade && !tripState.editMode}
                    clicked={changeDisplayedTrip}
                    buttonStyledConfig={buttonStyle}
                    animation
                >{tripState.currentShow === 'updatedTrip' ? 'przed zmianami' : 'pokaz zmiany'}</Button>
            </TripControlsButtonsStyled>
            <TripDataStyled>
                <TripData
                    id={displayedTrip.id}
                    totalCost={costState.totalCost.amount}
                    tripCosts={costState.partialCost[displayedTrip.id]}
                    // totalCostCurrency={tripState.updatedTrip.totalCost.currency}
                    updateTrip={updateTrip}
                    description={displayedTrip.description}
                    budget={displayedTrip.budget}
                    shared={displayedTrip.shared}
                    editMode={tripState.editMode}
                    friends={user.friends}
                    showTripEditor={showTripEditorHandler}
                    targetAddress={displayedTrip.targetAddress}
                />
                <CostList
                    costListConfigStyled={{ maxHeight: '400' }}
                    id={displayedTrip.id}
                    editMode={tripState.editMode}
                    costs={displayedTrip.costs}
                    showTripEditor={showTripEditorHandler}
                    deleteCost={deleteCostHandler}
                />
            </TripDataStyled>
            <Button
                show={tripState.editMode}
                clicked={() => newPlaceModalHandler(true)}
            >dodaj przystanek</Button>
            <TripWayPointsStyled>
                <WaypointsList
                    waypointsList={displayedTrip.waypoints}
                    editMode={tripState.editMode}
                    tripCosts={costState.partialCost}
                    calculatePartialCosts={calculatePartialCosts}
                    showTripEditor={showTripEditorHandler}
                    deleteCost={deleteCostHandler}
                    deleteWaypointHandler={deleteWaypointHandler}
                />
            </TripWayPointsStyled>
        </TripContainerStyled>
    )
}

export default TripContainer;