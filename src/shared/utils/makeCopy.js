const copyArr = arr => {
    const newArr = [];
    return arr.map((item, i) => newArr[i] = makeCopy(item));
};

const copyObj = obj => {
    const newObj = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = makeCopy(obj[key]);
        }
    }
    return newObj;
};

export const makeCopy = item => {
    if (Array.isArray(item)) {
        return copyArr(item);
    } else if (typeof item === 'object') {
        return copyObj(item);
    }
    return item;
};