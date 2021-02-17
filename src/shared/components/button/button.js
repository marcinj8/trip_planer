import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { InlineButtonStyled, PrimaryButtonStyled } from './button.scss';

const Button = ({ children, clicked, variant, disabled, linkTo, styledConfig, type, show, ...props }) => {

    const { buttonStyledConfig } = props;

    const Component = useMemo(() => {
        switch (variant) {
            case 'primary': return PrimaryButtonStyled;
            case 'inline': return InlineButtonStyled;
            default: return PrimaryButtonStyled;
        }
    }, [variant])

    const Content = useMemo(() => (
        <Component
            type={type}
            disabled={disabled}
            styledConfig={buttonStyledConfig}
            onClick={clicked}
        >
            {children}
        </Component>
    ), [children, type, disabled, buttonStyledConfig, clicked]);

    if(show === false) {
        return null;
    };

    return linkTo
        ? (
            <Link
                to={linkTo}
            >
                {Content}
            </Link>
        )
        : (
            <React.Fragment>
                {Content}
            </React.Fragment>
        )

}

export default Button;