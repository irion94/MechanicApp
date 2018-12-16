import {map} from 'ramda'
import Fuse from 'fuse.js'


const searchInArray = (keys, input, array) => {
    let optionsPerson = {
        caseSensitive: false,
        shouldSort: true,
        includeScore: true,
        includeMatches: true,
        // tokenize:true,
        //matchAllTokens: true,
        threshold: 0.7,
        //location: 0,
        distance: 700,
        maxPatternLength: 64,
        minMatchCharLength: 5,
        keys: keys
    };


    let fuse = new Fuse(array, optionsPerson);
    let result = fuse.search(input);
    result = map((obj) => obj.item, result);
    return result;
};

export default searchInArray

