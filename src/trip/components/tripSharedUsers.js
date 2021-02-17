import React, { useState, useEffect, useRef } from 'react';

import { Button, Modal } from '../../shared/components';
import { showUserSharedBox, hideUserSharedBox } from './tripComponentsAnimations';

import { SharedUsersContainerStyled, SharedUsersListStyled } from './tripSharedUsers.scss';

const TripSharedUsers = ({ id, sharedUsers, friends, updateTrip }) => {

    const [isHover, setIsHover] = useState(false);
    const sharedUsersListRef = useRef(null);
    const [isModalShow, setShowModal] = useState(false)
    const unsharedFriends = [].concat(friends);

    unsharedFriends.forEach(friend => {
        console.log(friend.userId)
        const index = sharedUsers.findIndex(element => element.userId === friend.userId);
        if (index < 0) {
            return
        }
        unsharedFriends.splice(index, 1)
    });


    useEffect(() => {
        if (isHover) {
            showUserSharedBox(sharedUsersListRef);
        } else {
            hideUserSharedBox(sharedUsersListRef);
        }
    }, [isHover])

    const onAddUserHandler = addedUser => {
        const sharedList = [...sharedUsers];
        const sharedListUpdated = sharedList.concat([{ userId: addedUser.userId, nick: addedUser.nick }])
        console.log(sharedListUpdated)
        updateTrip(sharedListUpdated, [id, 'shared'])
    }

    const onDeleteUserHandler = deletedUser => {
        const sharedListUpdated = [...sharedUsers];
        const index = sharedListUpdated.find(user => user.userId === deletedUser.userId)
        sharedListUpdated.splice(index, 1);
        console.log(sharedListUpdated)
        updateTrip(sharedListUpdated, [id, 'shared'])
    }

    const modalChildren = (
        unsharedFriends.length < 1
            ? <h3>brak osób do dodania</h3>
            : (
                <ul>
                    {
                        unsharedFriends.map(friend => {
                            return (
                                <li key={friend.userId}>
                                    <span>{friend.nick}</span>
                                    <Button clicked={() => onAddUserHandler(friend)}>dodaj</Button>
                                </li>
                            )
                        })
                    }
                </ul>
            )
    )

    return (
        <React.Fragment>
            <SharedUsersContainerStyled
                onMouseLeave={() => setIsHover(false)}
                onMouseEnter={() => setIsHover(true)}>
                <h3>
                    Udostępnienia
            </h3>
                <SharedUsersListStyled
                    ref={sharedUsersListRef}
                >
                    {
                        sharedUsers.map(user =>
                            <li key={user.nick}>
                                <span>
                                    {user.nick}
                                </span>
                                <Button clicked={() => onDeleteUserHandler(user)}>usuń</Button>
                            </li>
                        )
                    }
                    <Button
                        clicked={() => setShowModal(true)}
                    >dodaj</Button>
                </SharedUsersListStyled>
            </SharedUsersContainerStyled>
            <Modal
                show={isModalShow}
                header='udostępnij wycieczkę'
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