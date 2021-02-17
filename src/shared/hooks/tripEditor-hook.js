import { useCallback, useReducer } from 'react';
import { makeCopy } from '../utils';

const saveTripCosts = (state, value, path) => {
    const costId = path.shift();
    const updatedTrip = Object.assign({}, state.updatedTrip);
    const updatedProperty = {};

    value.map((val, i) => {
        return updatedProperty[path[i]] = val;
    })

    updatedTrip.costs[costId] = updatedProperty;

    return {
        ...state,
        updatedTrip: updatedTrip
    }
};


const saveWaypointCosts = (state, value, index, path) => {
    const costId = path.shift();
    const updatedTrip = Object.assign({}, state.updatedTrip);
    const updatedProperty = {};
    let costs = [...state.updatedTrip.waypoints[index].costs]

    value.map((val, i) => {
        const value = path[i] === 'amount' ? Number(val) : val;
        return updatedProperty[path[i]] = value;
    })
    costs[costId] = updatedProperty;
    updatedTrip.waypoints[index].costs = [...costs];

    return {
        ...state,
        updatedTrip: updatedTrip
    }
};


// const updateProperty = (value, path) => {
//     const updatedProperty = {};
//     path.forEach((key, index) => {
//         const currentPath = key.split('.');
//         currentPath.reduce((prev, current, i) => {
//             const setValue = Array.isArray(value) ? value[index] : value;
//             return prev[current] = (prev[current] || i === currentPath.length - 1 ? setValue : {})
//         }, updatedProperty)
//     })
//     return updatedProperty
// }

const setValue = (values, paths) => {
    let resultObject = {};

    paths.forEach((path, index) => {
        let value = Array.isArray(values) ? values[index] : values
        resultObject = {
            ...resultObject,
            ...setOneValue(resultObject, path.split('.'), value),
        };
    });

    return resultObject;
};

const setOneValue = (source, path, value) => {
    const [first, ...rest] = path;
    console.log(path, first, rest)
    if (!rest.length) {
        return {
            ...source,
            [first]: value,
        };
    }

    return {
        ...source,
        [first]: setOneValue(source[first] || {}, rest, value),
    };
};

const saveTripChanges = (state, value, path) => {
    const updatedProperty = setValue(value, path);
    const updatedTrip = Object.assign(state.updatedTrip, updatedProperty);

    return {
        ...state,
        updatedTrip: updatedTrip
    }
};

const saveWaypointChanges = (state, value, index, path) => {
    const updatedWaypoints = makeCopy(state.updatedTrip.waypoints);
    const waypointUpdated = updatedWaypoints[index];
    const updatedProperty = setValue(value, path);

    updatedWaypoints[index] = Object.assign(waypointUpdated, updatedProperty)

    return {
        ...state,
        updatedTrip: {
            ...state.updatedTrip,
            waypoints: updatedWaypoints
        }
    }
};


const detectPlaceOfUpdate = (state, action, isCost) => {
    const { value, path } = action;
    const id = path.shift();
    if (id === state.updatedTrip.id) {
        if (isCost) {
            return saveTripCosts(state, value, path)
        } else {
            return saveTripChanges(state, value, path);
        }
    } else {
        const waypointIndex = state.updatedTrip.waypoints.findIndex(waypoint => waypoint.id === id);
        if (waypointIndex < 0) {
            return state
        }
        const waypointPath = [];
        waypointPath.push('waypoints.' + waypointIndex + '.' + path);
        if (isCost) {
            return saveWaypointCosts(state, value, waypointIndex, path)
        } else {
            return saveWaypointChanges(state, value, waypointIndex, path);
        }
    }
}

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
        }
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
        }
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
        default: return state;
    }
}

export const useTripEditor = (tripData) => {

    const tripInitialState = {
        trip: Object.assign({}, tripData) || {},
        updatedTrip: Object.assign({}, tripData) || {},
        tripEditor: false,
        editorData: null,
        editMode: true,
        deletePosition: {
            showModal: false,
            positionDescription: null
        }
    }

    const [tripState, dispatch] = useReducer(tripReducer, tripInitialState);

    const updateTrip = useCallback((value, path) => {
        dispatch({
            type: 'UPDATE_TRIP',
            value,
            path
        })
    }, []);

    const updateTripCosts = useCallback((value, path) => {
        dispatch({
            type: 'UPDATE_TRIP_COSTS',
            value,
            path
        })
    },
        [],
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


    return { tripState, updateTrip, updateTripCosts, deleteCost, toggleTripEditor, toggleDeleteCostModal, toggleEditMode }
}