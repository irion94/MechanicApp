import {map} from 'ramda'
import Fuse from 'fuse.js'


const searchInArray = (keys, input, array) => {
    let optionsPerson = {
        caseSensitive: false,
        shouldSort: true,
        includeScore: true,
        includeMatches: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: keys
    };

    let fuse = new Fuse(array, optionsPerson);
    let result = fuse.search(input);
    result = map((obj) => obj.item, result);
    return result;
};

export default searchInArray

