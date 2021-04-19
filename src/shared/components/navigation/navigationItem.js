import React from 'react';

import { NavLink } from 'react-router-dom';

import { NavigationItemStyled } from './navigation.scss';

const NavigationItem = ({ children, link, id, clicked }) => {

    if (!link) {
        return (
            <NavigationItemStyled style={{padding: '16px'}}
                onClick={clicked}
                key={id}
            >
                {children}
            </NavigationItemStyled>
        )
    }
    return (
        <NavigationItemStyled 
        >
            <NavLink
                key={id}
                to={link}
            >
                {children}
            </NavLink>
        </NavigationItemStyled>
    )
}

export default NavigationItem;