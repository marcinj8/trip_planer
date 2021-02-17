const copyArr = arr => {
    return arr.map(item => makeCopy(item));
};

const copyObj = obj => {
    const newObj = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = makeCopy(obj[key]);
        }
        return newObj;
    }
};

export const makeCopy = object => {
    if (Array.isArray(object)) {
        return copyArr(object);
    } else if (typeof object === 'object') {
        copyObj(object);
    }
    return object;
};