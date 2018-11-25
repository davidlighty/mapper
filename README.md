# mapper

[![Build Status](https://travis-ci.org/davidlighty/mapper.svg?branch=master)](https://travis-ci.org/davidlighty/mapper) [![Coverage Status](https://coveralls.io/repos/github/davidlighty/mapper/badge.svg?branch=feature%2Fcoveralls)](https://coveralls.io/github/davidlighty/mapper?branch=feature%2Fcoveralls)

Utility to map one or more objects into a new object

Inspiration from Automapper, a C# utility, which does this specific thing.

# Problem

Many times we might have an incoming API payload and it needs to be modified/normalized/setup before being used by the rest of our code. Many times the approach is to do this as late as possible.
This utility can help you handle that either in your View logic, or perhaps, at the API layer.
