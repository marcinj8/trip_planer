import { useCallback, useReducer } from 'react';
import { makeCopy } from '../utils';

const calculateTotalCost = partialCosts => {
    let totalCostUpdated = 0;
    const partialCostKeys = Object.keys(partialCosts);
    partialCostKeys.forEach(key => {
        // console.log(partialCosts[key].amount, key, totalCostUpdated)
        totalCostUpdated = +totalCostUpdated + partialCosts[key].amount
    });
    return totalCostUpdated;
}

const cummulateCost = (state, action) => {
    const partialCostUpdated = makeCopy(state.partialCost);
    partialCostUpdated[action.id] = {
        amount: +action.amount,
        currency: 'PLN'
    }

    const totalCostUpdated = calculateTotalCost(partialCostUpdated);

    return {
        ...state,
        partialCost: partialCostUpdated,
        totalCost: {
            ...state.totalCost,
            amount: Number(totalCostUpdated),
        }
    }
};

const deleteWaypointCost = (state, id) => {
    const partialCostUpdated = makeCopy(state.partialCost);
    const totalCostUpdated = makeCopy(state.totalCost);
    totalCostUpdated.amount = totalCostUpdated.amount - partialCostUpdated[id].amount;

    console.log(partialCostUpdated[id])
    delete partialCostUpdated[id];

    return {
        ...state,
        partialCost: partialCostUpdated,
        totalCost: totalCostUpdated
    }
}

const costReducer = (state, action) => {
    switch (action.type) {
        case 'CALCULATE_PARTIAL_COSTS': return cummulateCost(state, action);
        case 'REMOVE_WAYPOINT_COSTS': return deleteWaypointCost(state, action.waypointId);
        default: return state;
    }
}

export const useCostCalculator = (totalCost) => {

    const initialState = {
        totalCost: makeCopy(totalCost) || { amount: 0, currency: 'PLN' },
        partialCost: null
    }
    const [costState, dispatch] = useReducer(costReducer, initialState);

    const calculatePartialCosts = useCallback((costsArray, id) => {
        let costs = 0;
        costsArray.forEach(cost => {
            costs = Number(costs) + Number(cost.amount)
        });
        return dispatch({
            type: 'CALCULATE_PARTIAL_COSTS',
            amount: costs,
            id
        })
    }, []);

    const removeWaypointCosts = useCallback(waypointId => {
        return dispatch({
            type: 'REMOVE_WAYPOINT_COSTS',
            waypointId
        })
    }, [])

    return { costState, calculatePartialCosts, removeWaypointCosts }
}