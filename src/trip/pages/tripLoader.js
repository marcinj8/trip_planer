import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { Trip } from './';
import LoadingSuspense from '../../shared/components/UIElements/loadingSuspense';

const TripContainer = () => {

    const [errorModal, setErrorModal] = useState(false);

    const { tripId, userId } = useParams();

    const getData = async (id) => {
        return await axios.get(`http://localhost:5000/trips/${id}`)
    };

    let request = useQuery(['trip', tripId], () => getData(tripId));
    const { data, isLoading, isError, error } = request;

    // console.log(request)

    let tripData = useMemo(() => {
        if (!isLoading && !isError) {
            return data.data.trip;
        } else {
            return null
        }
    }, [data, isLoading, isError]);

    useEffect(() => {
        if (isError) {
            setErrorModal(isError)
        }
    }, [isError]);

    return (
        <React.Fragment>
            <LoadingSuspense
                show={isLoading || errorModal || tripData === null}
                isLoading={isLoading || tripData === null}
                isError={errorModal}
                error={error}
                clearError={() => setErrorModal(false)}
            />
            {!isLoading && !isError && tripData && tripData.id === tripId
                ? (
                    <Trip
                        trip={tripData}
                        tripId={tripId}
                        userId={userId}
                    />
                )
                : null
            }

        </React.Fragment>
    )
}

export default TripContainer;