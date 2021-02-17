import styled from 'styled-components';

export const SmallTripCardStyled = styled.li`
    background: gray;
    border: 1px solid black;
    border-radius: 5px;
    min-width: 350px;
    overflow: hidden;
    width: 98%;
    max-width: 550px;
    margin: 10px auto;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 500px) {
        margin: 10px 15px;
    }
`

export const SmallTripImageStyled = styled.div`
    height: 100%;
    width: 100%;
    margin: 0 auto;
    height: 400px;
    min-width: 150px;
    overflow: hidden;
    padding: 0;
    & img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @media (min-width: 600px) {
        width: 60%;
    }
`

export const SmallTripInfoStyled = styled.div`
    width: 100%;
    position: relative;
    margin: 0 auto;
    padding: 10px 0;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    @media (min-width: 600px) {
        width: 40%;
        height: 400px;
    }
    & div{
        padding: 4px 10px;
    }
    & div span {
        font-weight: bold
    }
`

export const SmallTripMainDataStyled = styled.div`
    width: 100%;
    height: 80%;
    margin: 0 auto;
    min-width: 200px;
    padding: 0;
    text-align: left;
`

export const SmallTripTitleStyled = styled.h4`
    margin: 5px auto;
    padding: 0;
    text-align: center;
`

export const SmallTripButtonsStyled = styled.div`
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 15px auto 0 auto;
    min-width: 200px;
    padding: 10px 0 0 0;
    border-top: 1px solid black;
    @media (min-width: 600px) {
        border: none
    }
`

export const WaypoinsListStyled = styled.ul`
    width: 98%;
    margin: 20px auto 40px auto;
`

export const WaypointStyled = styled.li`
    list-style: none;
    margin: 20px auto;
`

export const WaypointTitleStyled = styled.h3`
    margin: 10px auto;
`

export const WaypointDescriptionStyled = styled.div`
    margin: 10px auto;
`

export const WaypointContentStyled = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
`

export const WaypointImageStyled = styled.img`
    width: 100%;
    min-width: 250px;
    max-height: 300px;
    object-fit: cover;
    @media(min-width: 700px ) {
        width: 50%;
        max-width: 400px;
    };
`

export const CostContainerStyled = styled.article`
    min-width: 300px;
    width: 100%;
    border-bottom: 1px solid white;
    max-height:${props => props.configStyled && props.configStyled.maxHeight ? props.configStyled.maxHeight + 'px' : 'none'};
    @media(min-width: 700px ) {
        width: 50%;
    }
    & h3{
        margin: 5px auto 10px auto;
        letter-spacing: 1px;
    }
`

export const CostsListStyled = styled.ul`
    min-width: 300px;
    box-sizing: border-box;
    width: 100%;
    box-shadow: inset 5px -7px 15px -11px rgba(0,0,0,0.71);
    border-right: 15px solid transparent;
    padding: 3px;
    margin-bottom: 5px;
    overflow-y: scroll;
    height: auto;
    max-height:${props => !props.configStyled && !props.configStyled.maxHeight ? 'none' : !props.editMode ? props.configStyled.maxHeight - 50 + 'px' : props.configStyled.maxHeight - 130 + 'px'};
    box-shadow: inset 0px 0px 15px 3px rgba(0,0,0,0.71);
    &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 15px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
    &::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        border: 1px solid white;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
        border-radius: 10px
    }
    @media(min-width: 700px ) {
        height:${props => !props.configStyled && !props.configStyled.maxHeight ? 'none' : !props.editMode ? props.configStyled.maxHeight - 50 + 'px' : props.configStyled.maxHeight - 130 + 'px'};
    }

`

export const CostStyled = styled.li`
    list-style: none;
    margin: 5px;
    padding: 3px;
    display: flex;
    flex-direction: column;
    transition: all .3s ease-in-out;
    & span {
        margin: 0 3px;
    };
    &:hover{
        background-color: rgba(0,0,0,0.2)
    }
`

export const CostsDataStyled = styled.span`
    margin: 5px;
    justify-content: space-around;
    display: flex;
    padding: 3px;
    align-items: center;
`

export const CostsButtonsStyled = styled.span`
    margin: 5px;
    padding: 3px;
   
`