import styled from 'styled-components';

export const UserDataStyled = styled.article`
    margin: 10px auto 20px auto;
    width: 100%;
    padding: 20px 5px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid white;
`;

export const UserFriendsStyled = styled.ul`
    margin: 0;
    width: 100%;
    padding: 10px 5px;
    max-height: 650px;
    overflow: auto;
    text-align: left;
`;

export const UserFriendsCardStyled = styled.li`
    position: relative;
    margin: 10px auto;
    width: calc(45% - 2rem);
    min-width: 16.5rem;
    list-style: none;
    padding: 5px;
    border: 1px solid black;
    border-radius: 6px;
    box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
    height: 100px;
    display: flex;
    overflow: hidden;
    background: rgb(84,72,213);
    background: linear-gradient(318deg, rgba(84,72,213,1) 0%, rgba(56,56,138,0.8155637254901961) 50%, rgba(0,74,255,1) 100%);
    transition: all .15s ease-in;
    &:hover {
        transform: scale(1.05);
    }
`;

export const UserAvatarStyled = styled.span`
    width: 50%;
    min-width: 8.5rem;
    height: 100%;
    display: flex; 
    justify-content: center;
    align-items: center;
    & img {
        display: block;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        width: 80px;
        height: 80px;
        margin-right: 1rem;
    }
`;

export const UserNameStyled = styled.span`
    width: 50%;
    min-width: 8.5rem;
    height: 100%;
    display: flex; 
    justify-content: left;
    align-items: ${props => (!!props.styleConfig && props.styleConfig.alignItem) ? props.styleConfig.alignItem : 'center'};;
    text-align: left;
    flex-direction: ${props => (!!props.styleConfig && props.styleConfig.flexDirection) ? props.styleConfig.flexDirection : 'row'};
`;
