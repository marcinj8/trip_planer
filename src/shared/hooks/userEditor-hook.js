import { useReducer, useCallback } from "react";
import { makeCopy } from "../utils";

const setUser = (state, action) => {
    return {
        ...state,
        user: makeCopy(action.user)
    }
}

const updateUser = (state, action) => {
    const updatedUser = makeCopy(state.user);
    updatedUser[action.updatedPropertiesArray[0]] = action.updatedPropertiesArray[1];

    return {
        ...state,
        user: updatedUser
    }
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER': return setUser(state, action);
        case 'UPDATE_USER': return updateUser(state, action);
        default: return state
    }
}

export const useUserEditor = () => {

    const initialState = {
        user: null,
    };

    const [userState, dispatch] = useReducer(userReducer, initialState);

    const setUser = useCallback(user => {
        dispatch({
            type: 'SET_USER',
            user
        })
    },[])

    const updateUser = useCallback(updatedPropertiesArray => {
        dispatch({
            type: 'UPDATE_USER',
            updatedPropertiesArray
        })
    }, [])

    return { userState, setUser, updateUser }
}