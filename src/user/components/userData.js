import React from 'react';

import {
    UserDataStyled,
    UserAvatarStyled,
    UserNameStyled
} from './userComponent.scss';

const UserData = ({ userNick, userName, userId, userEmail, userImage, userPhone }) => {

    const userNameStyledConfig = {
        flexDirection: 'column',
        alignItem: 'left',
    }

    return (
        <UserDataStyled>
            <UserAvatarStyled>
                <img style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    src={userImage}
                    alt={userName} />
            </UserAvatarStyled>
            <UserNameStyled styleConfig={userNameStyledConfig}>
                <div><h5>nick:</h5>{userNick}</div>
                <div><h5>email:</h5>{userEmail}</div>
                {userPhone && <div><h5>telefon:</h5> {userPhone}</div>}
            </UserNameStyled>
        </UserDataStyled>
    )
}

export default UserData;