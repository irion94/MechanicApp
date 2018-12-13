import faker from 'faker';

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