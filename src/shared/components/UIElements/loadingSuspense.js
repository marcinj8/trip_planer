import React from 'react';
import { Button } from '../button';
import Modal from './modal';

import './loadingSuspense.css';

const LoadingSuspense = (props) => {

    const { isError, error, show, clearError } = props;
    const errorMessage = error ? error.message : 'Spróbuj ponownie później.'

    const content = isError
        ? errorMessage
        : (
            <div>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h4>
                    Ładowanie . . .
                </h4>
            </div>
        );
    if (!show) {
        return null
    }
    
    return (
        <Modal
            show={show}
            header={
                isError
                    ? (
                        <h3>Błąd!</h3>
                    )
                    : null
            }
            footer={
                isError
                    ? (
                        <Button clicked={() => clearError(false)}>ok</Button>
                    )
                    : null
            }
        >
            <h1>{content}</h1>
        </Modal>
    )
}

export default LoadingSuspense;