
// given a string with one or more words, return the same string with
// the first letter of each word capitalized and the rest of the word
// in lower case
export const capitalizeWords = (str) => {
    let words = str.split(' ');
    let result = [];
    for (let word of words) {
        result.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
    }
    return result.join(' ');
}