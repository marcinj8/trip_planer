import React, { useContext } from 'react';

import NavigationItem from './navigationItem';
import { AuthContext } from '../../context'

import { NavigationListStyled, BorderLineStyled } from './navigation.scss';

const NavigationList = ({ styledConfig, closeSidebar }) => {

    const { isLoggedIn, userId, login, logout } = useContext(AuthContext);
    // const currentTripId = 'id 2 wycieczki - string - generowany';
    
    return (
        <NavigationListStyled styledConfig={styledConfig}>
            {isLoggedIn && <NavigationItem link={`/user`} id='userData' >użytkownik</NavigationItem>}
            {/* {isLoggedIn && <NavigationItem link={`/${userId}/trips/${currentTripId}`} id='currentTrip' >obecna wycieczka</NavigationItem>} */}
            {isLoggedIn && <NavigationItem link='/trips/new' id='addTrip' >dodaj</NavigationItem>}
            {isLoggedIn && <NavigationItem exact link={`/${userId}/trips`} id='trips' >moje wycieczki</NavigationItem>}
            {isLoggedIn && <NavigationItem exact link={`/${userId}/shared`} id='sharedTrips' >udostępnione</NavigationItem>}
            {isLoggedIn && <NavigationItem link={`/${userId}/notification`} id='notification' >powiadomienia</NavigationItem>}
            {isLoggedIn && <NavigationItem clicked={logout} id='logout' >wyloguj</NavigationItem>}
            {!isLoggedIn && <NavigationItem clicked={login} id='login' >logowanie</NavigationItem>}
            {!!styledConfig && styledConfig.sideBar && <BorderLineStyled />}
            {!!styledConfig && styledConfig.sideBar && <NavigationItem clicked={closeSidebar} id='sideBarToggler' >zamknij</NavigationItem>}
        </NavigationListStyled>
    )
}

export default NavigationList;