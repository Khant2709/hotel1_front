export const validateArray = (array) => {
    return !Array.isArray(array) || array.length === 0;
}

export const validateObject = (object) => {
 return !object || !object.id
}