import React from 'react';

import { Form } from '../../shared/components';
import { NEW_TRIP_INPUT_DATA } from '../../configData/newTripInputsConfig';

const NewTrip = () => {

    const addTripHandler = (formState) => {
        console.log(formState)
    }
  
    return (
        <div style={{ background: 'silver' }}>
            <Form
                submitButtonName='dodaj wycieczkę'
                fromTitle='nowa wycieczka'
                inputsData={NEW_TRIP_INPUT_DATA}
                onSubmit={addTripHandler}
            />
        </div>
    )
}

export default NewTrip;