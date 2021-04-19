import React, { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

import binLogo from '../../../assets/trash.svg';
import editLogo from '../../../assets/edit.svg';
import mapLogo from '../../../assets/mapbw.svg';

import { InlineButtonStyled, PrimaryButtonStyled, IconButtonStyled, ButtonImageStyled } from './button.scss';
import { showAnimation, hideAnimation } from '../../animations/animations';

const Button = (props) => {
    const {
        buttonStyledConfig, children, clicked, variant, disabled, linkTo, type, icon, style, animation,
        show = true, duration = 0.25, direction = 'x'
    } = props;

    const styleRef = useRef(buttonStyledConfig);
    const buttonRef = useRef(null);

    const Component = useMemo(() => {
        switch (variant) {
            case 'primary': return PrimaryButtonStyled;
            case 'inline': return InlineButtonStyled;
            case 'icon': return IconButtonStyled;
            default: return PrimaryButtonStyled;
        }
    }, [variant])

    const buttonName = useMemo(() => {
        switch (icon) {
            case 'deleteButton': {
                if (!styleRef.current) {
                    styleRef.current = {};
                }
                styleRef.current = {
                    ...styleRef.current,
                    bg: "rgba(207, 0, 15, 1)",
                    hoverBg: "rgba(236, 100, 75, 1)"
                };
                return <ButtonImageStyled src={binLogo} />
            }
            case 'editButton': return <ButtonImageStyled src={editLogo} />
            case 'mapButton': return <ButtonImageStyled src={mapLogo} />
            default: return children
        }
    }, [icon, children]);

    const Content = useMemo(() => (
        <Component
            animation={animation}
            ref={buttonRef}
            style={style}
            type={type}
            disabled={disabled}
            styledConfig={{ ...styleRef.current }}
            onClick={clicked}
        >
            {buttonName}
        </Component>
    ), [type, style, disabled, clicked, animation, buttonName]);

    useEffect(() => {
        if (!animation) {
            if (show) {
                showAnimation(buttonRef, 0)
            } else {
                hideAnimation(buttonRef, 0)
            }
        } else {
            if (show) {
                showAnimation(buttonRef, duration, direction)
            } else {
                hideAnimation(buttonRef, duration, direction)
            }
        }
    })



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