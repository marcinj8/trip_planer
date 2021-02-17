import { useCallback, useReducer } from 'react';

const onInputChange = (state, action) => {
    let formIsValid = true;
    for (const input in state.inputs) {
        if (!state.inputs[input]) {
            console.log('brak inputu: ' + input)
            continue;
        }
        if (input == action.inputId) {
            formIsValid = formIsValid && action.isValid;
        } else {
            formIsValid = formIsValid && state.inputs[input].isValid;
        }
    }
    return {
        ...state,
        inputs: {
            ...state.inputs,
            [action.inputId]: {
                value: action.value,
                isValid: action.isValid
            }
        },
        isFormValid: formIsValid
    };
}

const formReducer = (state, action) => {
    switch (action.type) {
        case 'ON_INPUT_CHANGE': return onInputChange(state, action);
        case 'SET_FORM_DATA': return {
            ...state,
            inputs: action.inputs,
            isFormValid: action.isFormValid
        };
        default: return state;
    }
}

export const useForm = (initialInputs, initialFormValidity) => {

    const initialState = {
        inputs: initialInputs,
        isFormValid: initialFormValidity
    };

    const [formState, dispatch] = useReducer(formReducer, initialState);

    const inputHandler = useCallback((inputId, value, isValid) => {
        dispatch({
            type: 'ON_INPUT_CHANGE',
            inputId,
            value,
            isValid
        })
    }, []);

    const setFormData = useCallback((inputsData, formValidity) => {
        dispatch({
            type: 'SET_FORM_DATA',
            inputs: inputsData,
            isFormValid: formValidity
        })
    }, []);

    return { formState, inputHandler, setFormData };
}