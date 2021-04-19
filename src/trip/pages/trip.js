import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

import USER_MODEL from '../../model/userModel.json';

import { NewPlaceModal } from '../../place/components';
import { Button, Form, Modal } from '../../shared/components';
import { VALIDATOR_REQUIRE } from '../../shared/components/input/validators';
import { useTripEditor, useCostCalculator } from '../../shared/hooks';
import { makeCopy } from '../../shared/utils';
import { ChooseWaypoint } from '../components';
import TripContainer from '../components/tripContainer';
import LoadingSuspense from '../../shared/components/UIElements/loadingSuspense';

const Trip = ({ trip, userId, tripId }) => {
    const history = useHistory();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = USER_MODEL;

    const { costState, calculatePartialCosts } = useCostCalculator();
    const {
        tripState,
        updateTrip,
        updateTripCosts,
        deleteCost,
        toggleTripEditor,
        toggleDeleteCostModal,
        toggleEditMode,
        changeDisplayedTrip,
        resetChanges,
        saveTripTotalCost,
        newPlaceModalHandler,
        deleteWaypointHandler
    } = useTripEditor(trip);

    const displayedTrip = useMemo(() => {
        return tripState[tripState.currentShow];
    }, [tripState]);

    const showTripEditorHandler = (propertiesArr, inputLabel, id) => {
        const formData = {};
        const inputsData = [];
        const propertyPath = [];

        propertiesArr.forEach((val, i) => {
            // formData[i] = {
            //     value: propertiesArr[i][1],
            //     isValid: val[1] ? true : false
            // };
            inputsData[i] = {
                variant: 'secondary',
                label: val[2] ? val[2] : '',
                inputId: i,
                initialValue: val[1],
                initialValid: val[1] ? true : false,
                type: typeof val[1] === 'number' ? 'number' : 'text',
                errorMessage: val[2] ? 'usupełnij pole ' + val[2].toUpperCase() : 'pole jest puste',
                validators: [VALIDATOR_REQUIRE()]
            };
            propertyPath[i] = propertiesArr[i][0];
        })

        const editorData = {
            label: inputLabel,
            formData,
            inputsData,
            propertyPath,
            id
        }

        toggleTripEditor(true, editorData);
    };

    const confirmChangesHandler = (formData) => {
        const { propertyPath, id } = tripState.editorData;
        let updatedProperty;

        const keys = Object.keys(formData);

        updatedProperty = [];
        keys.map(key => {
            return updatedProperty.push([propertyPath[key], formData[key].value])
        })

        if (tripState.editorData.label === 'koszt') {
            updateTripCosts(updatedProperty, id);
        } else {
            updateTrip(updatedProperty, id);
        }
        toggleTripEditor(false);
        calculatePartialCosts(displayedTrip.costs, displayedTrip.id)
    };

    const deleteCostHandler = (id, costId, description, costsLength) => {
        toggleDeleteCostModal(true, { id, costId, description, costsLength })
    };

    const confirmCostDeleteHandler = () => {
        const { id, costId, description, costsLength } = tripState.deletePosition.positionDescription;
        deleteCost(id, costId, description, costsLength);
        toggleDeleteCostModal(false);
    };

    const onRemoveWaypointHandler = () => {
        const waypointsList = makeCopy(displayedTrip.waypoints);
        const waypointsListUpdated = waypointsList.filter(waypoint => waypoint.id !== tripState.deleteWaypoint.waypointToDelete.id)

        updateTrip([['waypoints', waypointsListUpdated]], displayedTrip.id);
        deleteWaypointHandler(false);
    }

    const acceptChangesHandler = () => {
        setError(false);
        setLoading(true);
        const updatedTrip = tripState.updatedTrip;
        axios.patch(`http://localhost:5000/trips/${tripId}`, { updatedTrip })
            .then(res => {
                setLoading(false);
                history.push(`/${userId}/trips`);
            })
            .catch(err => {
                setLoading(false);
                setError(true);
                console.log(err)
            })
    };

    const discardChangesHandler = () => {
        resetChanges();
        history.push(`/${userId}/trips`);
    };

    useEffect(() => {
        calculatePartialCosts(displayedTrip.costs, displayedTrip.id);
    }, [calculatePartialCosts, displayedTrip.costs, displayedTrip.id]);

    useEffect(() => {
        saveTripTotalCost(costState.totalCost.amount);
    }, [costState.totalCost.amount, saveTripTotalCost]);

    return (
        <React.Fragment>
            <LoadingSuspense
                show={loading || error}
                isLoading={loading}
                isError={error}
                clearError={() => setError(false)}
            />
            {
                !displayedTrip !== null && costState.partialCost !== null
                    ? (
                        <React.Fragment>
                            <TripContainer
                                user={user}
                                displayedTrip={displayedTrip}
                                tripState={tripState}
                                costState={costState}
                                toggleEditMode={toggleEditMode}
                                changeDisplayedTrip={changeDisplayedTrip}
                                acceptChangesHandler={acceptChangesHandler}
                                discardChangesHandler={discardChangesHandler}
                                updateTrip={updateTrip}
                                showTripEditorHandler={showTripEditorHandler}
                                deleteCostHandler={deleteCostHandler}
                                calculatePartialCosts={calculatePartialCosts}
                                deleteWaypointHandler={deleteWaypointHandler}
                                newPlaceModalHandler={newPlaceModalHandler}
                            />

                            <Modal
                                show={tripState.deletePosition.showModal}
                                header='usuwanie pozycji'
                                close={() => toggleDeleteCostModal(false)}
                                footer={
                                    <React.Fragment>
                                        <Button clicked={confirmCostDeleteHandler}>usuń</Button>
                                        <Button clicked={() => toggleDeleteCostModal(false)}>anuluj</Button>
                                    </React.Fragment>
                                }
                            >
                                <div>
                                    usuń {tripState.deletePosition.showModal
                                        ? tripState.deletePosition.positionDescription.description
                                        : ''
                                    }
                                </div>
                            </Modal>
                            <Modal
                                header={'zaktualizuj ' + (tripState.editorData ? tripState.editorData.label : '')}
                                close={() => toggleTripEditor(false)}
                                footer={<Button clicked={() => toggleTripEditor(false)}>anuluj</Button>}
                                show={tripState.tripEditor}>
                                <Form
                                    onSubmit={confirmChangesHandler}
                                    submitButtonName='zmień'
                                    formData={tripState.editorData ? tripState.editorData.formData : null}
                                    inputsData={tripState.editorData ? tripState.editorData.inputsData : null}
                                />
                            </Modal>
                            <Modal
                                header='Jak chcesz dodać przystanek?'
                                show={tripState.newWaypoint.isShowChoiceModal}
                                close={() => newPlaceModalHandler(false)}
                            >
                                <Button clicked={() => newPlaceModalHandler(false, 'exist')}>wybierz z dodanych miejsc</Button>
                                <Button clicked={() => newPlaceModalHandler(false, 'new')}>dodaj nowe miejsce</Button>
                            </Modal>
                            <ChooseWaypoint
                                show={tripState.newWaypoint.isShowUserPlaceModal}
                                waypointsList={displayedTrip.waypoints}
                                placesToVisit={user.toVisit}
                                userId={userId}
                                path='waypoints'
                                onAddPlace={(...args) => updateTrip(args, displayedTrip.id)}
                                close={() => newPlaceModalHandler(false)}
                            />
                            <NewPlaceModal
                                show={tripState.newWaypoint.isShowNewPlaceModal}
                                placesList={displayedTrip.waypoints}
                                userId={userId}
                                path='waypoints'
                                onAddPlace={(...args) => updateTrip(args, displayedTrip.id)}
                                close={() => newPlaceModalHandler(false)}
                            />
                            <Modal
                                header={'Skasować pozycję ?'}
                                show={tripState.deleteWaypoint.showDeleteModal}
                                close={() => newPlaceModalHandler(false)}
                            >
                                {tripState.deleteWaypoint.showDeleteModal && (
                                    <div>
                                        <div>
                                            {tripState.deleteWaypoint.waypointToDelete.description}
                                        </div>
                                        <div>
                                            {tripState.deleteWaypoint.waypointToDelete.targetAddress.address}
                                        </div>
                                    </div>
                                )}
                                <Button clicked={onRemoveWaypointHandler}>skasuj</Button>
                                <Button clicked={() => deleteWaypointHandler(false)}>anuluj</Button>
                            </Modal>
                        </React.Fragment>
                    )
                    : null
            }
        </React.Fragment>
    )
}

export default Trip;