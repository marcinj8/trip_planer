import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    userData: {
        currentTrip: null
    },
    login: () => { },
    logout: () => { }
})