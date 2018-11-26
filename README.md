# mapper

[![Build Status](https://travis-ci.org/davidlighty/mapper.svg?branch=master)](https://travis-ci.org/davidlighty/mapper) [![Coverage Status](https://coveralls.io/repos/github/davidlighty/mapper/badge.svg?branch=master)](https://coveralls.io/github/davidlighty/mapper?branch=master)

Utility to map one or more objects into a new object

Inspiration from Automapper, a C# utility, which does this specific thing.

# Problem

Many times we might have an incoming API payload and it needs to be modified/normalized/setup before being used by the rest of our code. Many times the approach is to do this as late as possible.
This utility can help you handle that either in your View logic, or perhaps, at the API layer.

# Goal

Provide a easy pattern to help re-map/combine properties into a new object.
With this utility you create a "profile" JSON which tells how to map into your new object.

# Example

API Payload

```
const APIResponse = {
    id:1
    result:{
        first-name:'Bruce',
        last-name:'Wayne'
    }
}
```

Create an object that holds each key of the new translated object, whose value is a direct path or a function to derive the needed data.
Mapper will supply both the "from" object and the "to" object to a function.

```
const userMapping={
    id,
    firstName:'result.first-name',
    lastName:'result.last-name',
    fullName: from => {
        return `${from.result.first-name} ${from.result.last-name}`
    }
}
```

With this profile you can import the mapper utility and use it when you fetch the result

```
import {mapper} from '@ironhorse/mapper'
import {userMapping} from './profiles'

const expected = mapper(APIResponse, userMapping)

console.log(expected)

/**
{
    id:1
    firstName:'Bruce',
    lastName:'Wayne',
    fullName:'Bruce Wayne'
}
*/
```
