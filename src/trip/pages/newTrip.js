import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Form } from '../../shared/components';
import { AuthContext } from '../../shared/context';
import { NEW_TRIP_INPUT_DATA } from '../../configData/newTripInputsConfig';
import LoadingSuspense from '../../shared/components/UIElements/loadingSuspense';


import { NewTripHeaderStyled, NewTripStyled } from './tripPage.scss';
import { makeCopy } from '../../shared/utils';
import { newTripModel } from '../../model/newTripPropertyModel';

const NewTrip = () => {
    const history = useHistory();
    const { userId } = useContext(AuthContext)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const addTripHandler = (formState) => {
        setError(false);
        setLoading(true);
        const newTrip = makeCopy(newTripModel);
        const createBudgetProperty = (amount, property) => {
            return newTrip[property] = {
                amount: parseInt(amount),
                currency: 'PLN'
            };
        };

        const createAddressProperty = (address, property) => {
            return newTrip[property]['address'] = address;
        };

        Object.keys(formState).map(key => {
            switch (key) {
                case 'budget': return createBudgetProperty(formState[key].value, key);
                case 'targetAddress': return createAddressProperty(formState[key].value, key);
                case 'startPoint': return createAddressProperty(formState[key].value, key);
                default: return newTrip[key] = formState[key].value
            }
        });
        newTrip.id = 'ID:' + new Date().getTime();
        newTrip.creator = userId;
        newTrip.crated = new Date().getTime();
        newTrip.lastUpdated = {
            userId,
            date: new Date().getTime()

        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/trips/add-trip`, { newTrip })
            .then(res => {
                setLoading(false);
                history.push(`/${userId}/trips`);
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false);
                setError(true);
            })
    };

    return (
        <React.Fragment>
            <LoadingSuspense
                show={loading || error}
                isLoading={loading}
                isError={error}
                error={{ message: 'Spróbuj jeszcze raz.' }}
                clearError={setError}
            />
            <NewTripStyled
            >
                <NewTripHeaderStyled>Nowa wycieczka</NewTripHeaderStyled>
                <Form
                    submitButtonName='dodaj wycieczkę'
                    fromTitle='nowa wycieczka'
                    inputsData={NEW_TRIP_INPUT_DATA}
                    onSubmit={addTripHandler}
                />
            </NewTripStyled>
        </React.Fragment>
    )
}

export default NewTrip;