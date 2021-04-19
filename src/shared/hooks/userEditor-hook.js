import { useReducer, useCallback } from "react";
import { makeCopy } from "../utils";

const updateUser = (state, action) => {
    const updatedUser = makeCopy(state.updatedUser);
    updatedUser[action.updatedPropertiesArray[0]] = action.updatedPropertiesArray[1];

    return {
        ...state,
        updatedUser: updatedUser
    }
}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER': return updateUser(state, action);
        default: return state
    }
}

export const useUserEditor = user => {

    const initialState = {
        updatedUser: makeCopy(user),
    }
    const [userState, dispatch] = useReducer(userReducer, initialState);

    const updateUser = useCallback(updatedPropertiesArray => {
        dispatch({
            type: 'UPDATE_USER',
            updatedPropertiesArray
        })
    }, [])

    return { userState, updateUser }
}