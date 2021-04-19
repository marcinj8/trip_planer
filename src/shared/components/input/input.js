import React, { useMemo, useReducer, useEffect } from 'react';

import { validate } from './validators';

import {
    PrimaryInputSytled,
    SecondaryInputSytled,
    TextareaSytled,
    InputContainerStyled
} from './input.scss';

const InputReducer = (state, action) => {
    switch (action.type) {
        case 'TOUCHED': return {
            ...state,
            isTouched: true
        };
        case 'INPUT_CHANGED': return {
            ...state,
            value: action.value,
            isValid: validate(action.value, action.validators)
        };
        default: return state;
    }
}

const Input = ({ variant, type, label, placeholder, inputId, initialValue, initialValid, onInput, validators, errorMessage }) => {

    const initialState = {
        value: initialValue || '',
        isTouched: false,
        isValid: initialValid || false
    }

    const [inputState, dispatch] = useReducer(InputReducer, initialState);

    let FormElement;
    FormElement = useMemo(() => {
        switch (variant) {
            case 'primary': return PrimaryInputSytled;
            case 'secondary': return SecondaryInputSytled;
            case 'textarea': return TextareaSytled;
            default: return PrimaryInputSytled;
        }
    }, [variant]);

    const changeHandler = e => {
        const value = e.target.value;
        dispatch({
            type: 'INPUT_CHANGED',
            value,
            validators
        })
    }

    const touchedHandler = () => {
        dispatch({
            type: 'TOUCHED',
        })
    }

    useEffect(() => {
        onInput(inputId, inputState.value, inputState.isValid);
    }, [inputId, inputState.value, inputState.isValid, onInput])

    return (
        <InputContainerStyled>
            <label
                htmlFor={inputId}
            >{label}</label>
            <FormElement
                value={inputState.value}
                type={type}
                danger={!inputState.isValid && inputState.isTouched}
                onChange={changeHandler}
                id={inputId}
                placeholder={placeholder}
                onBlur={touchedHandler}
            />
            {!inputState.isValid && inputState.isTouched && (
                <h5>{errorMessage}</h5>
            )}
        </InputContainerStyled>
    )
}

export default Input;