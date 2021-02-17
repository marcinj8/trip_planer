import React, { useState, useCallback, useReducer } from 'react';

import { Button } from '../button';
import { Input } from '../input';
import { VALIDATOR_REQUIRE } from '../input/validators';

const onAddCost = (state, action) => {
    console.log(state, action)
    return state
}

const costReduer = (state, action) => {
    switch (action.type) {
        case 'ADD_COST': return onAddCost(state, action);
        default: throw state
    }
}

const CostFormElement = ({ onCostSubmit, initialValues }) => {

    const initialState = { ...initialValues };
    const [costFormElement, setFormState] = useState([]);
    const [tripCostState, dispatch] = useReducer(costReduer, initialState)

    const confirmCostHandler = () => {

        onCostSubmit('cost', 'array', true);
    }

    const onInputChangeHandler = useCallback((costProperty, value, isValid, inputId) => {
        // console.log(costProperty, value, isValid, inputId);
        // console.log(tripCost)
        // const updatedCosts = tripCost || {};
        // if (!updatedCosts[inputId]) {
        //     updatedCosts[inputId] = {};
        //     console.log(updatedCosts, 'updatedCostsupdatedCosts')
        // }
        // updatedCosts[inputId][costProperty] = value;
        // console.log(updatedCosts, 'updatedCosts')
        // console.log(tripCost)

        dispatch({
            type: 'ADD_COST',
            cost: 'updatedCosts',
        });
    }, [])

    const addCostHandler = useCallback((e) => {
        e.preventDefault();
        const inputId = new Date().getTime();
        const updatedCostInputs = [...costFormElement];
        updatedCostInputs.push(
            <div
                key={inputId}
                style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Input
                    key={'costDescription'}
                    variant='primary'
                    label='nowy koszt'
                    placeholder='opis'
                    inputId={'description'}
                    type='text'
                    errorMessage={'wpisz koszt'}
                    onInput={(...arg) => onInputChangeHandler(...arg, inputId)}
                    validators={[VALIDATOR_REQUIRE()]}
                />
                <Input
                    key={'costValue'}
                    variant='primary'
                    placeholder='wartość'
                    inputId={'amount'}
                    type='number'
                    errorMessage={'podaj koszt'}
                    onInput={(...arg) => onInputChangeHandler(...arg, inputId)}
                    validators={[VALIDATOR_REQUIRE()]}
                />
                <Input
                    key={'costCurrency'}
                    variant='primary'
                    placeholder='waluta'
                    inputId={'currency'}
                    type='text'
                    errorMessage={'wybierz walutę'}
                    onInput={(...arg) => onInputChangeHandler(...arg, inputId)}
                    validators={[VALIDATOR_REQUIRE()]}
                />

                <Button
                    clicked={() => console.log('deleted')}
                >
                    usuń
                </Button>
            </div>
        );

        setFormState(updatedCostInputs);
    }, [costFormElement, onInputChangeHandler])

    console.log(tripCostState);

    return (
        <div style={{ background: 'silver' }}>
            {costFormElement}
            {costFormElement.length > 0 && <Button
                // disabled={!costHandler.formState.isFormValid}
                clicked={confirmCostHandler}
            >potwierdź</Button>}
            <button onClick={() => dispatch({})}>add</button>
            <Button clicked={addCostHandler}>dodaj koszt</Button>
        </div>
    )
}

export default CostFormElement;