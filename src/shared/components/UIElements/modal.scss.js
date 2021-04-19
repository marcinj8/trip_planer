import styled from "styled-components";

export const ModalStyled = styled.div`
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid white;
    background-color: rgba(108, 122, 137, 1);
    z-index:1000;
    border-radius: 8px;
    min-width: 300px;
    max-height: 80vh;
    max-width: ${props => props.styledConfig && props.styledConfig.width ? props.styledConfig.width : '500px'};
    width: ${props => props.styledConfig && props.styledConfig.width ? props.styledConfig.width : '300px'};
    padding: 0 0 10px 0 !important;
    overflow: hidden;
    box-shadow: 12px 9px 10px 5px #000000;
    opacity: 0;
    @media(min-width: 500px) {
        width: 60%;
    }
`

export const ModalHeaderStyled = styled.h2`
    font-size: ${ props => props.styledConfig && props.styledConfig.titleFontSize ? props.styledConfig.titleFontSize : 'auto'};
    color: white;
    border-bottom: 1px solid white;
    background-color: rgba(46, 49, 49, 1);
    width: 100%;
    height: 65px;
    line-height: 65px;
`

export const ModalChildrenStyled = styled.div`
    width: 100%;
    min-height: 60px;
    padding: ${props => props.styledConfig && props.styledConfig.padding ? props.styledConfig.padding : '20px'} !important;
`