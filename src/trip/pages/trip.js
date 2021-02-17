import React, { useEffect } from 'react';

import TRIP_MODEL from '../../model/tripModel.json';
import USER_MODEL from '../../model/userModel.json';

import { Button, Form, Modal } from '../../shared/components';
import { VALIDATOR_REQUIRE } from '../../shared/components/input/validators';
import { useCostCalculator } from '../../shared/hooks/costCalculator-hook';
import { useTripEditor } from '../../shared/hooks/tripEditor-hook';
import CostList from '../components/costsList';
import TripData from '../components/tripData';
import WaypointsList from '../components/waypointsList';
import {
    TripStyled,
    TripDataStyled,
    TripTitleStyled,
    TripWayPointsStyled,
    TripImageStyled
} from './tripPage.scss';

const Trip = () => {

    const trip = TRIP_MODEL[0];
    const user = USER_MODEL;

    const { costState, calculatePartialCosts } = useCostCalculator();
    const { tripState, updateTrip, updateTripCosts, deleteCost, toggleTripEditor, toggleDeleteCostModal, toggleEditMode } = useTripEditor(trip);

    const toggleDisplayedTrip = () => {
        // zmiana wyświetlanej wycieczki
    }

    const showTripEditorHandler = (value, label, propertyPath) => {
        // const showTripEditorHandler = (propertiesArr, inputLabel, id) => {
        const formData = {};
        const inputsData = [];
        // const propertyPath = [];

        value.forEach((val, i) => {
            formData[i] = {
                value: value[i],
                isValid: val ? true : false
            };
            inputsData[i] = {
                variant: 'secondary',
                inputId: i,
                initialValue: val,
                initialValid: val ? true : false,
                type: Number(val) ? 'number' : 'text',
                errorMessage: 'pole jest puste',
                validators: [VALIDATOR_REQUIRE()]
            }
        })

        const editorData = {
            label,
            propertyPath,
            inputsData,
            formData

        }

        toggleTripEditor(true, editorData);
        return null;
    };

    const confirmChangesHandler = (formData) => {
        let updatedValue;
        const { propertyPath } = tripState.editorData;

        const keys = Object.keys(formData.inputs);

        if (keys.length === 1) {
            updatedValue = formData.inputs[0].value;
        } else {
            updatedValue = [];
            keys.map(key => {
                return updatedValue.push(formData.inputs[key].value)
            })
        }

        if (tripState.editorData.label === 'koszt') {
            updateTripCosts(updatedValue, propertyPath)
        } else {
            updateTrip(updatedValue, propertyPath);
        }
        toggleTripEditor(false);
        calculatePartialCosts(tripState.updatedTrip.costs, tripState.updatedTrip.id)
    }

    const deleteCostHandler = (id, costId, description, costsLength) => {
        toggleDeleteCostModal(true, { id, costId, description, costsLength })
    }

    const confirmCostDeleteHandler = () => {
        const { id, costId, description, costsLength } = tripState.deletePosition.positionDescription;
        deleteCost(id, costId, description, costsLength);
        toggleDeleteCostModal(false);
    }

    useEffect(() => {
        calculatePartialCosts(tripState.updatedTrip.costs, tripState.updatedTrip.id);
    }, [calculatePartialCosts, tripState.updatedTrip.costs, tripState.updatedTrip.id]);

    return (
        <TripStyled>
            <TripTitleStyled>{tripState.updatedTrip.title}</TripTitleStyled>
            <TripImageStyled
                src={tripState.updatedTrip.image}
                alt={tripState.updatedTrip.title}
            />
            <Button clicked={toggleEditMode}>edytuj wycieczke</Button>
            <Button clicked={toggleDisplayedTrip}>przed zmianami/pokaz zmiany</Button>
            <Button clicked={toggleDisplayedTrip}>zatwierdź zmiany</Button>
            <TripDataStyled>
                <TripData
                    id={tripState.updatedTrip.id}
                    totalCost={costState.totalCost.amount}
                    tripCosts={costState.partialCost[tripState.updatedTrip.id]}
                    // totalCostCurrency={tripState.updatedTrip.totalCost.currency}
                    updateTrip={updateTrip}
                    description={tripState.updatedTrip.description}
                    budget={tripState.updatedTrip.budget}
                    shared={tripState.updatedTrip.shared}
                    editMode={tripState.editMode}
                    friends={user.friends}
                    showTripEditor={showTripEditorHandler}
                />
                <CostList
                    costListConfigStyled={{ maxHeight: '400' }}
                    id={tripState.updatedTrip.id}
                    editMode={tripState.editMode}
                    costs={tripState.updatedTrip.costs}
                    showTripEditor={showTripEditorHandler}
                    deleteCost={deleteCostHandler}
                />
            </TripDataStyled>
            <Button show={tripState.editMode}>dodaj przystanek</Button>
            <TripWayPointsStyled>
                <WaypointsList
                    waypointsList={tripState.updatedTrip.waypoints}
                    editMode={tripState.editMode}
                    tripCosts={costState.partialCost}
                    calculatePartialCosts={calculatePartialCosts}
                    showTripEditor={showTripEditorHandler}
                    deleteCost={deleteCostHandler}
                />
            </TripWayPointsStyled>
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
        </TripStyled>
    )
}

export default Trip;