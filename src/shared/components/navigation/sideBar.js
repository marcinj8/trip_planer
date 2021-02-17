import React from 'react';
import NavigationList from './navigationList';

import { SideBarStyled } from './navigation.scss';

const SideBar = ({ closeSidebar, reference }) => {

    const navigationListStyledConfig = {
        flexDirection: 'column',
        justifyContent: 'center',
        sideBar: true
    }

    return (
        <SideBarStyled
            ref={reference}
        >
            <NavigationList
                styledConfig={navigationListStyledConfig}
                closeSidebar={closeSidebar}
            />
        </SideBarStyled>
    )
}

export default SideBar;