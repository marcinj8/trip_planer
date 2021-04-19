import { useCallback, useReducer } from 'react';
import { makeCopy, setValue } from '../utils';

const saveTripCosts = (state, updatedProperties, costId) => {
    console.log(updatedProperties)
    const updatedTrip = makeCopy(state.updatedTrip);
    const updatedProperty = {};

    updatedProperties.map(val => {
        return updatedProperty[val[0]] = val[1];
    })

    updatedTrip.costs[costId] = updatedProperty;

    return {
        ...state,
        updatedTrip: updatedTrip,
        isChangesMade: true,
    }
};

const saveWaypointCosts = (state, updatedProperties, waypointIndex, costId) => {
    const updatedTrip = makeCopy(state.updatedTrip);
    const updatedProperty = {};
    let costs = [...updatedTrip.waypoints[waypointIndex].costs]

    updatedProperties.map(val => {
        return updatedProperty[val[0]] = val[1];
    })
    costs[costId] = updatedProperty;
    updatedTrip.waypoints[waypointIndex].costs = [...costs];

    return {
        ...state,
        updatedTrip: updatedTrip,
        isChangesMade: true,
    }
};

const saveTripChanges = (state, updatedProperties) => {
    const updatedProperty = setValue(updatedProperties);
    const updatedTrip = Object.assign(state.updatedTrip, updatedProperty);

    return {
        ...state,
        updatedTrip: updatedTrip,
        isChangesMade: true,
    }
};

const saveWaypointChanges = (state, updatedProperties, waypointIndex) => {
    const updatedWaypoints = makeCopy(state.updatedTrip.waypoints);
    const waypointUpdated = updatedWaypoints[waypointIndex];
    const updatedProperty = setValue(updatedProperties);

    updatedWaypoints[waypointIndex] = Object.assign(waypointUpdated, updatedProperty)

    return {
        ...state,
        updatedTrip: {
            ...state.updatedTrip,
            waypoints: updatedWaypoints
        },
        isChangesMade: true,
    }
};

const detectPlaceOfUpdate = (state, action, isCost) => {
    const { updatedProperties, id, costId } = action;
    if (id === state.updatedTrip.id) {
        if (isCost) {
            return saveTripCosts(state, updatedProperties, costId)
        } else {
            return saveTripChanges(state, updatedProperties);
        }
    } else {
        const waypointIndex = state.updatedTrip.waypoints.findIndex(waypoint => waypoint.id === id);
        if (waypointIndex < 0) {
            return state
        }
        if (isCost) {
            return saveWaypointCosts(state, updatedProperties, waypointIndex, costId)
        } else {
            return saveWaypointChanges(state, updatedProperties, waypointIndex);
        }
    }
};

const removeTripCost = (state, costId, description, costsLength) => {
    const costs = state.updatedTrip.costs;

    if (!description || costs[costId].description !== description || costsLength !== costs.length) {
        return state;
    }

    const updatedCosts = costs.filter((val, i) => i !== costId);

    return {
        ...state,
        updatedTrip: {
            ...state.updatedTrip,
            costs: updatedCosts
        },
        isChangesMade: true,
    }
};

const removeWaypointCost = (state, waypointId, costId, description, costsLength) => {
    const waypoints = state.updatedTrip.waypoints;
    const costs = state.updatedTrip.waypoints[waypointId].costs;

    if (!description || !costs[costId] || costs[costId].description !== description || costsLength !== costs.length) {
        return state;
    }

    const updatedCosts = costs.filter((val, i) => i !== costId);
    waypoints[waypointId].costs = updatedCosts;

    return {
        ...state,
        updatedTrip: {
            ...state.updatedTrip,
            waypoints: waypoints
        },
        isChangesMade: true,
    }
}

const removeCost = (state, action) => {
    if (action.id === state.updatedTrip.id) {
        return removeTripCost(state, action.costId, action.description, action.costsLength);
    } else {
        const waypointIndex = state.updatedTrip.waypoints.findIndex(waypoint => waypoint.id === action.id);
        if (waypointIndex < 0) {
            return state
        }
        return removeWaypointCost(state, waypointIndex, action.costId, action.description, action.costsLength);
    }
}

const tripReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRIP': return {
            ...state,
            trip: makeCopy(action.trip),
            updatedTrip: makeCopy(action.trip)
        };
        case 'UPDATE_TRIP': return detectPlaceOfUpdate(state, action);
        case 'UPDATE_TRIP_COSTS': return detectPlaceOfUpdate(state, action, true);
        case 'DELETE_COST': return removeCost(state, action);
        case 'TOGGLE_TRIP_EDITOR': return {
            ...state,
            tripEditor: action.tripEditor,
            editorData: action.editorData
        };
        case 'TOGGLE_DELETE_MODAL': return {
            ...state,
            deletePosition: action.deletePosition,
        };
        case 'TOGGLE_EDIT_MODE': return {
            ...state,
            editMode: !state.editMode
        };
        case 'CHANGE_DISPLAYED_TRIP': return {
            ...state,
            currentShow: action.tripToShow
        };
        case 'RESET_CHANGES': return {
            ...state,
            updatedTrip: makeCopy(state.trip)
        };
        case 'SAVE_TRIP_TOTAL_COST': return {
            ...state,
            updatedTrip: {
                ...state.updatedTrip,
                totalCost: {
                    ...state.updatedTrip.totalCost,
                    amount: action.totalCostAmount
                }
            }
        };
        case 'SHOW_NEW_PLACE_MODAL': return {
            ...state,
            newWaypoint: action.newWaypointUpdated,
        };
        case 'DELETE_WAYPOINT': return {
            ...state,
            deleteWaypoint: {
                showDeleteModal: action.isShow,
                waypointToDelete: action.waypointData
            }
        }
        default: return state;
    }
}

export const useTripEditor = (tripData) => {

    const tripInitialState = {
        trip: makeCopy(tripData) || null,
        updatedTrip: makeCopy(tripData) || null,
        tripEditor: false,
        editorData: null,
        editMode: true,
        isChangesMade: false,
        currentShow: 'updatedTrip',
        deletePosition: {
            showModal: false,
            positionDescription: null
        },
        newWaypoint: {
            isShowChoiceModal: false,
            isShowUserPlaceModal: false,
            isShowNewPlaceModal: false
        },
        deleteWaypoint: {
            showDeleteModal: false,
            waypointToDelete: null
        }
    }

    const [tripState, dispatch] = useReducer(tripReducer, tripInitialState);

    const setTrip = useCallback(trip => {
        dispatch({
            type: 'SET_TRIP',
            trip
        })
    }, [])

    const updateTrip = useCallback((updatedPropertiesArray, id) => {
        dispatch({
            type: 'UPDATE_TRIP',
            updatedProperties: updatedPropertiesArray,
            id
        })
    }, []);

    const updateTripCosts = useCallback((updatedPropertiesArray, costId) => {
        const updatedCosts = updatedPropertiesArray.map(property => {
            console.log(property);
            if (property[0] === 'amount') {
                return [property[0], parseInt(property[1])]
            }
            return property;
        })
        dispatch({
            type: 'UPDATE_TRIP_COSTS',
            updatedProperties: updatedCosts,
            id: costId[0],
            costId: costId[1]
        })
    }, [],
    );

    const deleteCost = useCallback((id, costId, description, costsLength) => {
        dispatch({
            type: 'DELETE_COST',
            id,
            costId,
            description,
            costsLength
        })
    }, []);

    const toggleTripEditor = useCallback((isOpen, editorData) => {
        dispatch({
            type: 'TOGGLE_TRIP_EDITOR',
            tripEditor: isOpen,
            editorData: editorData || null
        })
    }, []);

    const toggleDeleteCostModal = useCallback((isOpen, positionDescription) => {
        dispatch({
            type: 'TOGGLE_DELETE_MODAL',
            deletePosition: {
                showModal: isOpen,
                positionDescription: positionDescription || null
            }
        })
    }, []);

    const toggleEditMode = useCallback(() => {
        dispatch({
            type: 'TOGGLE_EDIT_MODE',
        })
    }, []);

    const changeDisplayedTrip = useCallback(() => {
        const tripToShow = tripState.currentShow === 'updatedTrip' ? 'trip' : 'updatedTrip';
        dispatch({
            type: 'CHANGE_DISPLAYED_TRIP',
            tripToShow
        })
    }, [tripState.currentShow]);

    const resetChanges = useCallback(() => {
        dispatch({
            type: 'RESET_CHANGES',
        })
    }, []);

    const saveTripTotalCost = useCallback((totalCostAmount) => {
        dispatch({
            type: 'SAVE_TRIP_TOTAL_COST',
            totalCostAmount
        })
    }, []);

    const newPlaceModalHandler = useCallback((isShow, choosenMethod) => {
        const newWaypointUpdated = choosenMethod
            ? (
                {
                    isShowChoiceModal: isShow,
                    isShowUserPlaceModal: choosenMethod === 'exist',
                    isShowNewPlaceModal: choosenMethod === 'new'
                }
            )
            : (
                {
                    isShowChoiceModal: isShow,
                    isShowUserPlaceModal: false,
                    isShowNewPlaceModal: false
                }
            )
        dispatch({
            type: 'SHOW_NEW_PLACE_MODAL',
            newWaypointUpdated
        })
    }, [])

    const deleteWaypointHandler = (isShow, waypointData) => {
        return dispatch({
            type: 'DELETE_WAYPOINT',
            isShow,
            waypointData: waypointData || null
        })
    }

    return {
        tripState,
        setTrip,
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
    }
};