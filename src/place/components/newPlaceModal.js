import React from 'react';

import { Button, Form, Modal } from '../../shared/components';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/components/input/validators';
import { makeCopy } from '../../shared/utils';

const NewPlaceModal = ({ onAddPlace, show, placesList, userId, path, close }) => {


    const onSubmitNewPlaceHandler = formData => {
        const placeListUpdated = makeCopy(placesList);
        const newPlace = {
            id: 'id' + new Date().getTime(),
            title: formData.title.value,
            description: formData.description.value,
            targetAddress: {
                address: formData.targetAddress.value,
                location: {
                    lat: Math.random() * 90 - Math.random() * 90,
                    lng: Math.random() * 180 - Math.random() * 180
                }
            },
            costs: [],
            creator: userId,
            image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        };

        placeListUpdated.push(newPlace);

        onAddPlace([path, placeListUpdated]);
        close();
    }

    return (
        <Modal
            header='Nowe miejsce'
            footer={
                <span>
                    <Button
                        clicked={close}>anuluj</Button>
                </span>
            }
            show={show}
            close={close}
        >
            <Form
                submitButtonName='dodaj'
                onSubmit={onSubmitNewPlaceHandler}
                inputsData={[
                    {
                        label: 'tytuł',
                        variant: 'secondary',
                        inputId: 'title',
                        initialValid: false,
                        type: 'text',
                        errorMessage: 'uzupełnij tytuł',
                        validators: [VALIDATOR_REQUIRE()]
                    },
                    {
                        label: 'opis',
                        variant: 'secondary',
                        inputId: 'description',
                        initialValid: false,
                        type: 'text',
                        errorMessage: 'uzupełnij opis',
                        validators: [VALIDATOR_REQUIRE()]
                    },
                    {
                        label: 'adres',
                        variant: 'secondary',
                        inputId: 'targetAddress',
                        initialValid: false,
                        type: 'text',
                        errorMessage: 'uzupełnij adres',
                        validators: [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]
                    }
                ]}
            />
        </Modal>
    )
};

export default NewPlaceModal;