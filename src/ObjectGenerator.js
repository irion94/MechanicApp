import faker from 'faker';
import {map} from 'ramda'
import * as carModels from 'src/carModels'
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
    // arr = map( car => ({brand: car.brand, models: map(item => map(x => ({model:x}) ,item),car)['models']})  ,carModels)
     map( item => arr.push(item), carModels);
    // console.log('generator:', map(item => JSON.stringify(item), arr));
    console.log(arr)

    return arr;
}

export let makeGenerator = () => {
    let arr = [];
   // arr = map( car => ({brand: car.brand, models: map(item => map(x => ({model:x}) ,item),car)['models']})  ,carModels)
    map( item => arr.push({brand:item.brand}), carModels)
    // console.log('generator:', map(item => JSON.stringify(item), arr));
    console.log(arr)

    return arr;
}

export let modelGenerator = (make) => {
    console.log('OG',make, makeModelGenerator().find(item => item.brand === make))

    return makeModelGenerator().find(item => item.brand === make).models
}





let randomCar = (i:number) => {
    let car = {
        id: i,
        brand: 'Car_Mark ' + faker.name.firstName(),
        model: 'Car_Model ' + faker.name.lastName(),
        ver: 'VI',
        year: faker.random.number({min: 1980, max: 2018}),
        body: 'hatchback',
        vin: faker.random.alphaNumeric(17),
        rej: 'Car_Rej'+'KBR9N29',
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
    for (let i = 0; i < 30; i++) {
        array.push(randomOwner(i))
    }
    return array;
}

export let loadRandomCarList = () => {
    let array = [];
    for (let i = 0; i < 10; i++) {
        array.push(randomCar(i))
    }
    return array;
};

let loadRandomTodoObject = () => {
    let array = [];
    for (let i = 0; i < 10; i++) {
        array.push(randomTodoObject(i))
    }
    return array;
}