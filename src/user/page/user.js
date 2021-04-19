import React, { useEffect } from 'react';

import { PlacesList } from '../../place/';
import UserData from '../components/userData';
import UserFriends from '../components/userFriends';
import { UserStyled, UserDataSectionStyled, UserPlaceSectionStyled } from './user.scss';
import { useUserEditor } from '../../shared/hooks';

import USER_MODEL from '../../model/userModel.json'; // model

const User = ({ userId }) => {

    // pobieranie danych

    const { userState, updateUser } = useUserEditor(USER_MODEL);

    const user = userState.updatedUser;

    useEffect(() => {
        // zapisanie danych bez serwera
        USER_MODEL.toVisit = user.toVisit;
    }, [user])

    return (
        <UserStyled>
            <UserDataSectionStyled >
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
            </UserDataSectionStyled>
            <UserPlaceSectionStyled>
                <PlacesList
                    title='Miejsca, które chcę odwiedzić <3'
                    noPlacesMessage='Dodaj miejsce, które chcesz zobaczyć!'
                    userId={userId}
                    places={user.toVisit}
                    updateUser={updateUser}
                />
            </UserPlaceSectionStyled>
           
        </UserStyled>
    )
}

export default User;