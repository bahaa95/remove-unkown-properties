# remove-unknown-properties

Remove unknown properties from a given object. it remove unknown properties in deeply nested object. work in all javascript enviroments.

[![node](https://img.shields.io/node/v/ts-httperror?color=green&label=node)](https://nodejs.org/en/download/)

[![Coverage Status](https://coveralls.io/repos/github/bahaa95/remove-unkown-properties/badge.svg?branch=Coveralls)](https://coveralls.io/github/bahaa95/remove-unkown-properties?branch=Coveralls)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Installation

Install remove-unknown-properties

```bash
  #npm
  npm install remove-unknown-properties

  #yarn
  yarn add remove-unknown-properties
```

## Usage/Examples

```typescript
import { removeUnknown } from 'remove-unknown-properties'

const student = {
    name: 'adam',
    age:16,
    salary:1000, //unknown property
    address:{
        country: 'usa',
        city: 'la',
        department:'any', //unknown property
        codes:{
            postalCode:1100,
            zipCode:1100,
            barcode:"barcode" //unknown property
        }
    }
}

const schema = {
    name: String,
    age: Number,
    address:{
        country: String,
        city: String,
        codes:{
            postalCode:Number,
            zipCode:Number
        }
    }
}

/**
 * this function will remove unknown properties from student object based on * * schema.
 * it will delete salary, department, and barcode properties.
 * note:this function will mutate original object.
 */
removeUnknown(student, schema);

console.log(student);
// result will be =>
/**
 * {
 *  name: 'adam',
 *  age:16,
 *  address:{
 *    country: 'usa',
 *    city: 'la',
 *    codes:{
        postalCode:1100,
        zipCode:1100
      }
 *  }
 * }
 * /
```

### Params

- `obj` - The object to remove unknown properties from it. the obj must be native javascript object otherwise will throw an error.
- `schema` - The schema of how obj should look like. the schema must be native javascript object otherwise will throw an error.
- `options` - This parameter is optional. It is an object contain strict property with type boolean. when it is true the removeUnknown function will remove known properties that has different type. default is false.

### Schema

There are multiple way to create schema.

- `using javascript built in types constructor.`

```typescript
const schema = {
    name: String,
    age: Number,
    address:{
        country: String,
        city: String,
    },
    pohonNumbers: Array
}
```

- `using Types.`

```typescript
import { Types } from 'remove-unknown-properties';

const schema = {
    name: Types.String,
    age: Types.Number,
    address:{
        country: Types.String,
        city: Types.String,
    },
    pohonNumbers: Types.Array
}
```

- `using defualt values.`

```typescript

const schema = {
    name: "",
    age: 0,
    address:{
        country: "any",
        city: "city name",
    },
    pohonNumbers: []
}
```

## Strict

When strict is true removeUnknown will remove unknown properties and  known properties from obj if it is has different type from schema.

**_NOTE:_** When set strict to true you must use `Types` to build your schema to get accurate result. otherwise you will lose your data.

```typescript
import { removeUnknown, Types } from 'remove-unknown-properties';

const student = {
    name: 'adam',
    age:"16", //will remove becouse it string not number
    stage: "any",
    salary:1000, //unknown property
    phoneNumbers:['12345678','87654321']
}

const schema = {
    name: Types.String,
    stage: Types.String,
    age: Types.Number,
    phoneNumbers:Types.Array
}

removeUnknown(student, schema, {strict: true});
// result will be =>
/**
 * {
 *  name: 'adam',
 *  stage:'any',
 *  phoneNumbers: ['12345678','87654321']
 * }
 * /
```

## Usecases

There are a lot of use cases one of theme to use it with node js and express to remove unknown and harmful data from request body.

- `first create reusable function that take schema and return express middleware`

```typescript
//file removeUnknownMiddleware.js
import { removeUnknown } from 'remove-unknown-properties';

export function removeUnknownMiddleware(schema) {
  return (req, res, next) => {
    removeUnknown(req.body, schema);
    next();
  };
}
```

- `next add your middleware to your route`

```typescript
//file user.router.js
import { removeUnknownMiddleware } from '../middleares/removeUnknownMiddleware';
import { userSchema } from '../schema/userSchema';

router.post('/add-user', removeUnknownMiddleware(userSchema), createUserController);
```
