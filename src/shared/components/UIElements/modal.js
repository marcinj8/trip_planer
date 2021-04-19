import React, { useRef, useEffect } from 'react';

import Backdrop from './backdrop';
import { ModalStyled, ModalHeaderStyled, ModalChildrenStyled } from './modal.scss';
import { showModalAnimaton, closeModalAnimaton } from './uiAnimations';

const Modal = ({ children, header, footer, show, close, styledConfig, styledChildrenConfig, noAnimation }) => {

    const modalRef = useRef(null)

    useEffect(() => {
        if (noAnimation) {
            if (show) {
                showModalAnimaton(modalRef, 0);
            } else {
                closeModalAnimaton(modalRef, 0);
            }
        }
        if (show) {
            showModalAnimaton(modalRef);
        } else {
            closeModalAnimaton(modalRef);
        }
    }, [show, noAnimation])

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
                {header &&
                    <ModalHeaderStyled
                        styledConfig={styledConfig ? { ...styledConfig } : null}
                    >
                        {header}
                    </ModalHeaderStyled>
                }
                {show && <ModalChildrenStyled
                    styledConfig={styledChildrenConfig ? { ...styledChildrenConfig } : null}
                >
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