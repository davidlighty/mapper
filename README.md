# mapper

[![Build Status](https://travis-ci.org/davidlighty/mapper.svg?branch=master)](https://travis-ci.org/davidlighty/mapper) [![Coverage Status](https://coveralls.io/repos/github/davidlighty/mapper/badge.svg?branch=master)](https://coveralls.io/github/davidlighty/mapper?branch=master)

Utility to map one or more objects into a new object

Inspiration from Automapper, a C# utility, which does this specific thing.

# Problem

Many times we might have an incoming API payload and it needs to be modified/normalized/setup before being used by the rest of our code. Many times the approach is to do this as late as possible.
This utility can help you handle that either in your View logic, or perhaps, at the API layer.


# Goal
Provide a easy pattern to help re-map/combine properties into a new object.

1. Find your object to map from (say an API payload)
```javascript
{
    first_name: "Bruce",
    last_name: "Wayne",
    address: {
        street:"1 Long Rd",
        city: "Gotham"
    }
}
```
2. Understand your internal required structure.  Perhaps this needs to be seperated, or flattened, or properties need to be renamed.
```javascript
{
    firstName: "Bruce",
    lastName: "Wayne",
    address: {
        street:"1 Long Rd",
        city: "Gotham"
    }
}
```