import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { PlacesList } from '../../place/';
import UserData from '../components/userData';
import UserFriends from '../components/userFriends';
import { UserStyled, UserDataSectionStyled, UserPlaceSectionStyled } from './user.scss';
import { useUserEditor } from '../../shared/hooks';

import LoadingSuspense from '../../shared/components/UIElements/loadingSuspense';


const User = ({ userId }) => {

    const [errorModal, setErrorModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const getUser = async (userId) => {
        console.log(process.env)
        return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`);
    }

    const response = useQuery(['user', userId], () => getUser(userId));
    const { data, isLoading, isError, error } = response;

    const { userState, setUser, updateUser } = useUserEditor();

    const updateUserHandler = data => {
        setErrorModal(false);
        setLoading(true);
        console.log(loading)
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/${userId}`, { property: data[0], value: data[1] })
            .then(res => {
                updateUser(data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setErrorModal(true);
            })
    }

    useEffect(() => {
        if (!isLoading && !isError) {
            if (userState.user && userId === userState.user.userId) {
                return
            }
            setUser(data.data.user);
        }
    }, [data, isLoading, isError, userState, userId, setUser]);


    useEffect(() => {
        if (isError) {
            setErrorModal(true);
        }
        setLoading(isLoading);
    }, [isError, isLoading])

    // useEffect(() => {
    //     // zapisanie danych bez serwera
    //     USER_MODEL.toVisit = user.toVisit;
    // }, [user])

    return (
        <React.Fragment>
            <LoadingSuspense
                show={loading || errorModal}
                isLoading={loading}
                isError={errorModal}
                error={error}
                clearError={() => setErrorModal(false)}
            />
            {
                userState.user &&
                <UserStyled>
                    <UserDataSectionStyled >
                        <h2>Cześć {userState.user.name}!</h2>
                        <UserData
                            userImage={userState.user.image}
                            userNick={userState.user.nick}
                            userName={userState.user.name}
                            userId={userId}
                            userEmail={userState.user.email}
                            userPhone={userState.user.phone}
                        />
                        <UserFriends
                            userFriends={userState.user.friends}
                        />
                    </UserDataSectionStyled>
                    <UserPlaceSectionStyled>
                        <PlacesList
                            title='Miejsca, które chcę odwiedzić <3'
                            noPlacesMessage='Dodaj miejsce, które chcesz zobaczyć!'
                            userId={userId}
                            places={userState.user.toVisit}
                            updateUser={updateUserHandler}
                        />
                    </UserPlaceSectionStyled>

                </UserStyled>
            }
        </React.Fragment>
    )
}

export default User;