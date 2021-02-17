import React from 'react';

import { BackdropStyeld } from './backdrop.scss';

const Backdrop = ({ close, show }) => {
    return (
        show
            ? <BackdropStyeld
                onClick={close} />
            : null
    )
}

export default Backdrop;