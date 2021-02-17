import React, { useRef, useEffect } from 'react';

import Backdrop from './backdrop';
import { ModalStyled, ModalHeaderStyled, ModalChildrenStyled } from './modal.scss';
import { showModalAnimaton,closeModalAnimaton } from './uiAnimations';

const Modal = ({ children, header, footer, show, close }) => {

    const modalRef = useRef(null)

    useEffect(() => {
        if (show) {
            showModalAnimaton(modalRef)
        } else {
            closeModalAnimaton(modalRef)
        }
    }, [show])

    return (
        <React.Fragment>
            <Backdrop
                show={show}
                close={close}
            />
            <ModalStyled
                ref={modalRef}
            >
                {header &&
                    <ModalHeaderStyled>
                        {header}
                    </ModalHeaderStyled>
                }
                {show && <ModalChildrenStyled>
                    {children}
                </ModalChildrenStyled>}
                {
                    footer && <footer>
                        {footer}
                    </footer>
                }
            </ModalStyled>
        </React.Fragment>
    )
}

export default Modal;