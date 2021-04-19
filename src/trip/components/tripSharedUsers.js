import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import { Button, Modal } from '../../shared/components';
import { showUserSharedBox, hideUserSharedBox } from './tripComponentsAnimations';

import { SharedUsersContainerStyled, SharedUsersListStyled } from './tripSharedUsers.scss';

const TripSharedUsers = ({ id, sharedUsers, friends, updateTrip, editMode }) => {

    const [isHover, setIsHover] = useState(false);
    const sharedUsersListRef = useRef(null);
    const [isModalShow, setShowModal] = useState(false)

    const unsharedFriends = useMemo(() => {
        const friendsArr = [];

        friends.forEach((friend, i) => {
            const index = sharedUsers.findIndex(element => element.userId === friend.userId);

            if (index >= 0) {
                return
            };

            friendsArr.push({ userId: friend.userId, nick: friend.nick })
        });

        return friendsArr;
    }, [friends, sharedUsers]);

    useEffect(() => {
        if (isHover) {
            showUserSharedBox(sharedUsersListRef);
        } else {
            hideUserSharedBox(sharedUsersListRef);
        }
    }, [isHover])

    const isUserShared = useCallback(userId => {
        const index = sharedUsers.findIndex(user => user.userId === userId);
        
        if (index >= 0) {
            return true;
        } else {
            return false;
        }
    }, [sharedUsers]);

    const onAddUserHandler = useCallback(addedUser => {
        if (isUserShared(addedUser.userId)) {
            return
        }

        const sharedList = [...sharedUsers];
        const addedUserData = [{ userId: addedUser.userId, nick: addedUser.nick }];
        const sharedListUpdated = sharedList.concat(addedUserData);

        updateTrip([['shared', sharedListUpdated]], id);
    }, [sharedUsers, updateTrip, id, isUserShared]);

    const onDeleteUserHandler = deletedUser => {
        const sharedListUpdated = [...sharedUsers];
        const index = sharedListUpdated.findIndex(user => user.userId === deletedUser.userId);

        sharedListUpdated.splice(index, 1);

        updateTrip([['shared', sharedListUpdated]], id);
    }

    const modalChildren = useMemo(() => (
        unsharedFriends.length < 1
            ? <h3>brak osób do dodania</h3>
            : (
                <ul>
                    {
                        unsharedFriends.map(friend => {
                            return (
                                <li key={friend.userId}>
                                    <span>{friend.nick}</span>
                                    <Button show={editMode} clicked={() => onAddUserHandler(friend)}>dodaj</Button>
                                </li>
                            )
                        })
                    }
                </ul>
            )
    ), [unsharedFriends, onAddUserHandler, editMode]);

    return (
        <React.Fragment>
            <SharedUsersContainerStyled
                onMouseLeave={() => setIsHover(false)}
                onMouseEnter={() => setIsHover(true)}>
                <h3>
                    Uczestnicy
                </h3>
                <SharedUsersListStyled
                    ref={sharedUsersListRef}
                >
                    {
                        sharedUsers.length === 0
                            ? <h3>brak uczestników</h3>
                            : sharedUsers.map(user =>
                                <li key={user.nick}>
                                    <span>
                                        {user.nick}
                                    </span>
                                    <Button
                                        show={editMode}
                                        clicked={() => onDeleteUserHandler(user)}>usuń</Button>
                                </li>
                            )
                    }
                    <Button
                        show={editMode}
                        clicked={() => setShowModal(true)}
                    >dodaj</Button>
                </SharedUsersListStyled>
            </SharedUsersContainerStyled>
            <Modal
                close={() => setShowModal(false)}
                show={isModalShow}
                header='Dodaj uczestników!'
                footer={
                    <Button clicked={() => setShowModal(false)}>zamknij</Button>
                }
            >
                {modalChildren}
            </Modal>
        </React.Fragment>
    )
}

export default TripSharedUsers;