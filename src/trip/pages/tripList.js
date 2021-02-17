import React from 'react';

import TRIP_MODEL from '../../model/tripModel.json';
import SmallTripCard from '../components/smallTripCard';
import { TripListStyled } from './tripPage.scss';

const TripList = () => {

    let tripList;
    tripList = TRIP_MODEL.map(trip => (
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
        />
    ))

    return (
        <div>
            <h4>lista zaplanowanych wycieczek</h4>
            <TripListStyled>
                {tripList}
            </TripListStyled>
        </div>
    )
}

export default TripList;