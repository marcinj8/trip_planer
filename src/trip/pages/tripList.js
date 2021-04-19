import React, { useMemo, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import LoadingSuspense from '../../shared/components/UIElements/loadingSuspense';

import SmallTripCard from '../components/smallTripCard';
import { TripListStyled, TipListHeaderStyled } from './tripPage.scss';

const TripList = () => {
    const [loading, setLoading] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [tripList, setTripList] = useState(null);

    const createTripsList = list => {
        const tripsArr = [];

        list.map(trip => tripsArr.push(
            <SmallTripCard
                key={trip.id}
                tripId={trip.id}
                title={trip.title}
                description={trip.description}
                totalCost={trip.totalCost}
                budget={trip.budget}
                targetAddress={trip.targetAddress}
                waypoints={trip.waypoints}
                image={trip.image}
                deleteTrip={deleteTripHandler}
            />
        ))

        setTripList(tripsArr);
    }

    const getData = async () => {
        return await axios.get('http://localhost:5000/trips/')
    };
    const { data, isLoading, isError, error } = useQuery('tripsList', getData);

    const deleteTripHandler = useCallback((id) => {
        setErrorModal(false);
        setLoading(true);
        axios.delete(`http://localhost:5000/trips/${id}`)
            .then(res => {
                console.log(res.data)
                createTripsList(res.data.tripsList);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setErrorModal(true);
            })
    }, []);

    useEffect(() => {
        if (!isLoading && !isError) {
            createTripsList(data.data.tripsList)
        }
    }, [data, isLoading, isError, deleteTripHandler])

    useEffect(() => {
        if (isError) {
            setErrorModal(isError)
        }
    }, [isError]);

    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading]);

    return (
        <div>
            <LoadingSuspense
                show={loading || errorModal}
                isLoading={loading}
                isError={isError}
                error={error}
                clearError={setErrorModal}
            />
            {
                (!tripList || tripList.length === 0) && !isLoading
                    ? (
                        <TipListHeaderStyled>
                            Nie zaplanowałeś żandej wycieczki!
                        </TipListHeaderStyled>
                    )
                    : (
                        <React.Fragment>
                            <TipListHeaderStyled>Lista zaplanowanych wycieczek</TipListHeaderStyled>
                            <TripListStyled >
                                {tripList}
                            </TripListStyled>
                        </React.Fragment>
                    )
            }
        </div >
    )
}

export default TripList;