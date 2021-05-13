import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { Trip } from './';
import LoadingSuspense from '../../shared/components/UIElements/loadingSuspense';

const TripContainer = () => {

    const [errorModal, setErrorModal] = useState(false);
    const [tripData, setTripData] = useState(null);

    const { tripId, userId } = useParams();

    const getData = async (id) => {
        return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/trips/${id}`)
    };

    const response = useQuery(['trip', tripId], () => getData(tripId));
    const { data, isLoading, isError, error } = response;

    const saveTripChangesHandler = trip => {
        setTripData(trip)
    };

    useEffect(() => {
        if (isError) {
            setErrorModal(true)
        }
    }, [isError]);

    useEffect(() => {
        if (!isLoading && !isError) {
            console.log('useEffect')
            setTripData(data.data.trip);
        } else {
            setTripData(null);
        }
    }, [data, isLoading, isError]);

    return (
        <React.Fragment>
            <LoadingSuspense
                show={isLoading || errorModal}
                isLoading={isLoading}
                isError={errorModal}
                error={error}
                clearError={() => setErrorModal(false)}
            />
            {
                !isLoading && !isError && tripData && tripData.id === tripId
                    ? (
                        <Trip
                            trip={tripData}
                            tripId={tripId}
                            userId={userId}
                            saveTripChanges={saveTripChangesHandler}
                        />
                    )
                    : null
            }

        </React.Fragment>
    )
}

export default TripContainer;