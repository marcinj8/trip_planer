const formatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
});

export const formatedCurrency = amount => {

    const numberToFormat = Number(parseInt(amount)) ? parseInt(amount) : 0;

    return formatter.format(numberToFormat)
};