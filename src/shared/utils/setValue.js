const setOneValue = (source, path, value) => {

    const [first, ...rest] = path;

    if (!rest.length) {
        return {
            ...source,
            [first]: value,
        };
    };

    return {
        ...source,
        [first]: setOneValue(source[first] || {}, rest, value),
    };
};

export const setValue = (updatedProperties) => {
    let resultObject = {};

    updatedProperties.forEach((property) => {
        resultObject = {
            ...resultObject,
            ...setOneValue(resultObject, property[0].split('.'), property[1]),
        };
    });

    return resultObject;
};