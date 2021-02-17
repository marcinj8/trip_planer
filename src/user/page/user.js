import React from 'react';

import { PlacesList } from '../../place/';
import UserData from '../components/userData';
import UserFriends from '../components/userFriends';

import { UserStyled, UserSectionStyled } from './user.scss';

import user from '../../model/userModel.json'; // model

const User = ({ userId }) => {

    // pobieranie danych

    return (
        <UserStyled>
            <UserSectionStyled >
                <h2>Cześć {user.name}</h2>
                <UserData
                    userImage={user.image}
                    userNick={user.nick}
                    userName={user.name}
                    userId={userId}
                    userEmail={user.email}
                    userPhone={user.phone}
                />
                <UserFriends
                    userFriends={user.friends}
                />

            </UserSectionStyled>
            <UserSectionStyled>
                <PlacesList
                    title='miejsca, które chce odwiedzić'
                    noPlacesMessage='dodaj miejsce, które chcesz zobaczyć'
                    places={user.toVisit}
                />
            </UserSectionStyled>
        </UserStyled>
    )
}

export default User;