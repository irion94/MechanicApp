import faker from 'faker';
import {map} from 'ramda'
import * as carModels from 'src/carModels'
import * as vehicleList from 'src/vehicles'
//import fs from 'fs'

let randomTodo = () => {
    let arr = [];
    for (let i = 1; i < faker.random.number({min:2,max:15}); i++) {
        arr.push(
            {
                id: i++,
                priority: 1,
                done: false,
                title: faker.random.words(3),
                description: 'Description here ' + faker.random.words(25),
                photo: 'Photo'
            }
        )
    }
    return arr;
};

export let randomModel = () => {
    let arr = [];
    for(let i = 0; i < 10; i++){
        arr.push({
            model: faker.name.lastName()
        })
    }
    return arr
}

export let randomBrand = () => {
    let arr = [];
    for(let i = 0; i<faker.random.number({min:5,max:10}); i++){
        arr.push({
            brand: faker.name.firstName(),
        })
    }
    return arr
}

export let makeModelGenerator = () => {
    let arr = [];
     map( item => arr.push(item), carModels);
    return arr;
}

export let makeGenerator = () => {
    let arr = [];
    map( item => arr.push({brand:item.brand}), carModels)
    return arr;
}

export let modelGenerator = (make) => {
    return makeModelGenerator().find(item => item.brand === make).models
};


let randomCar = (i) =>{
    let arr = makeModelGenerator();
    let item = arr[Math.floor(Math.random()*arr.length)];
    //let itmod = item.models
    let model = item.models[Math.floor(Math.random()*1)];
    let car = {
        id: i,
        brand: item.brand,
        model: model.model,
        ver: 'VI',
        year: faker.random.number({min: 1980, max: 2018}),
        body: 'hatchback',
        vin: faker.random.alphaNumeric(17),
        rej: 'KBR9N29'+i,
        img: faker.image.avatar(),
    };



    return car;
};


let randomOwner = (i:number) => {
    let owner = {
        id:i,
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        // address: faker.address.streetAddress(true),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber('+48 ### ### ###')
    }
    return owner
};

let randomTodoObject = (i:number) => {
    let object = {
        id: i, // id todo
        car: randomCar(1), //car contain object
        owner: randomOwner(1),
        todoList: randomTodo()
    };
    return object
};

export let loadRandomOwnerList = () => {
    let array = [];
    for (let i = 0; i < 3000; i++) {
        array.push(randomOwner(i))
    }
    return array;
}

export let loadRandomCarList = () => {
    let array = [];
    map( item => array.push(item), vehicleList);
    return array;
};

// var RNFS = require('react-native-fs');
// RNFS.writeFile(RNFS.DocumentDirectoryPath + '/test.txt', JSON.stringify(loadRandomCarList()), 'utf8').then( () => {console.log('file written')});
//
// RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
//     .then((result) => {
//         console.log('GOT RESULT', result);
//
//         // stat the first file
//         return Promise.all([RNFS.stat(result[0].path), result[0].path]);
//     })
//     .then((statResult) => {
//         if (statResult[0].isFile()) {
//             // if we have a file, read it
//             return RNFS.readFile(statResult[1], 'utf8');
//         }
//
//         return 'no file';
//     })
//     .then((contents) => {
//         // log the file contents
//         console.log(contents);
//     })
//     .catch((err) => {
//         console.log(err.message, err.code);
//     });


let loadRandomTodoObject = () => {
    let array = [];
    for (let i = 0; i < 10; i++) {
        array.push(randomTodoObject(i))
    }
    return array;
}