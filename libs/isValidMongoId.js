export const isValidMongoId = (id) => {
    if (typeof id !== 'string') {
        return false;
    }

    return /^[a-f\d]{24}$/i.test(id);
};