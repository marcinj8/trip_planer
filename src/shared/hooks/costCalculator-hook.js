import { useCallback, useReducer } from 'react';

const cummulateCost = (state, action) => {
    let totalCostUpdated = 0;
    const partialCost = { ...state.partialCost };

    partialCost[action.id] = {};
    partialCost[action.id].amount = +action.amount;
    const partialCostKeys = Object.keys(partialCost);
    partialCostKeys.forEach(key => totalCostUpdated = +totalCostUpdated + partialCost[key].amount);

    return {
        ...state,
        partialCost: {
            ...state.partialCost,
            [action.id]: {
                amount: Number(action.amount),
                currency: 'PLN'
            },
        },
        totalCost: {
            ...state.totalCost,
            amount: Number(totalCostUpdated),
        }
    }
};

const costReducer = (state, action) => {
    switch (action.type) {
        case 'CALCULATE_PARTIAL_COSTS': return cummulateCost(state, action);
        default: return state;
    }
}

export const useCostCalculator = (totalCost) => {

    const initialState = {
        totalCost: Object.assign({}, totalCost) || { amount: 0, currency: 'PLN' },
        partialCost: {}
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
    }, [])

    return { costState, calculatePartialCosts }
}