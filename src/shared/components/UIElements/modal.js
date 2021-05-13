import React, { useRef, useEffect } from 'react';

import Backdrop from './backdrop';
import { ModalStyled, ModalHeaderStyled, ModalChildrenStyled, ModalFooterStyled } from './modal.scss';
import { showModalAnimaton, closeModalAnimaton } from './uiAnimations';

const Modal = ({ children, header, footer, show, close, styledConfig, styledChildrenConfig }) => {

    const modalRef = useRef(null)
    useEffect(() => {
        if (show) {
            showModalAnimaton(modalRef);
        } else {
            closeModalAnimaton(modalRef);
        }
    }, [show]);

    return (
        <React.Fragment>
            <Backdrop
                show={show}
                close={close}
            />
            <ModalStyled
                styledConfig={styledConfig ? { ...styledConfig } : null}
                ref={modalRef}
            >
                {
                    header &&
                    <ModalHeaderStyled
                        styledConfig={styledConfig ? { ...styledConfig } : null}
                    >
                        {header}
                    </ModalHeaderStyled>
                }
                {
                    show && <ModalChildrenStyled
                        styledConfig={styledChildrenConfig ? { ...styledChildrenConfig } : null}
                    >
                        {children}
                    </ModalChildrenStyled>
                }
                {
                    footer && <ModalFooterStyled>
                        {footer}
                    </ModalFooterStyled>
                }
            </ModalStyled>
        </React.Fragment>
    )
}

export default Modal;