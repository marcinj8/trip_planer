import React, { useState, useRef, useEffect } from 'react';

import NavigationList from './navigationList';
import SideBar from './sideBar';
import Backdrop from '../UIElements/backdrop';
import { openSideBar, hideSideBar } from './navigationAnimations';
import { NavigationStyled, NavigationDesktopStyled, NavigationMobileStyled, SideBarToggleButtonStyled } from './navigation.scss';

const Navigation = () => {

    const [showSideBar, setShowSideBar] = useState(false)
    const sideBarRef = useRef(null);

    const openSideBarHandler = () => {
        setShowSideBar(true)
    };
    const closeSideBarHandler = () => {
        setShowSideBar(false)
    };

    useEffect(() => {
        if (showSideBar) {
            openSideBar(sideBarRef)
        } else {
            hideSideBar(sideBarRef)
        }
    }, [showSideBar])

    return (
        <NavigationStyled>
            <NavigationDesktopStyled><NavigationList /></NavigationDesktopStyled>
            <NavigationMobileStyled>
                <SideBarToggleButtonStyled onClick={openSideBarHandler}>
                    menu
                </SideBarToggleButtonStyled>
                <SideBar
                    closeSidebar={closeSideBarHandler}
                    reference={sideBarRef}
                />
                <Backdrop
                    show={showSideBar}
                    close={closeSideBarHandler}
                />
            </NavigationMobileStyled>

        </NavigationStyled>
    )
}

export default Navigation;