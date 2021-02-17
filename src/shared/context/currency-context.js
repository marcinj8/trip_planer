import { createContext } from 'react';

export const CurrencyContext = createContext({
    choosenCurrency: null,
    currency: {
        PLN: {
            EUR: null,
        },
        EUR: {
            PLN: null
        }
    }
})