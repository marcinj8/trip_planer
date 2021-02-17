import React, { useEffect } from 'react';

import { Input } from '../input'
import { Button } from '../button'
import { useForm } from '../../hooks';
// import CostFormElement from './costFormElements';

const Form = ({ inputsData, onSubmit, submitButtonName, formData }) => {

    const { formState, inputHandler, setFormData } = useForm();

    useEffect(() => {
        if (formData) {
            setFormData(formData);
        };
    }, [formData, setFormData])

    let fromElements;

    fromElements = inputsData.map(input => {
        return (
            <Input
                key={input.inputId}
                variant={input.variant}
                label={input.label}
                inputId={input.inputId}
                type={input.type}
                initialValid={input.initialValid}
                initialValue={input.initialValue ? input.initialValue : ''}
                errorMessage={input.errorMessage}
                onInput={inputHandler}
                validators={[...input.validators]}
            />
        )
    });

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <form
            onSubmit={onSubmitHandler}
        >
            <div>
                {fromElements}
            </div>
            <Button type='submit' disabled={!formState.isFormValid}>{submitButtonName}</Button>
        </form>
    )
}

export default Form;