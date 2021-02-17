import React from 'react';

import {
    UserFriendsStyled,
    UserFriendsCardStyled,
    UserAvatarStyled,
    UserNameStyled
} from './userComponent.scss';

const UserFriendsCard = ({ name, image }) => {

    return (
        <UserFriendsCardStyled>
            <UserAvatarStyled >
                <img
                    src={image}
                    alt={name} />
            </UserAvatarStyled>
            <UserNameStyled>
                {name}
            </UserNameStyled>
        </UserFriendsCardStyled>
    )
}

const UserFriends = ({ userFriends }) => {

    let friends;

    if(!userFriends) {
        return (
            <h3>brak znajomych</h3>
        )
    }
    friends = userFriends.map(friend => (
        <UserFriendsCard key={friend.nick}
            name={friend.nick}
            userId={friend.nick}
            image={friend.image}
        />
    ))
    return (
        <React.Fragment>
            <h4>Znajomi</h4>
            <UserFriendsStyled>
                {friends}
            </UserFriendsStyled>
        </React.Fragment>
    )
}

export default UserFriends;