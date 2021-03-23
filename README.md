# TODO Keyword Lookup

## Problem Statement
It's common to see TODOs in code. It's also common for TODOs to remain as to-dos for a long time. One way we can solve this problem is to have a service that runs through all files in a given directory and checks for any instances of the key-phrase "TODO", flagging each one of them out for humans to continue working on them.

## Getting Started
These instructions will get you a copy of the project up and running on
your local machine for development and testing purposes.

## Clone the project
```git clone https://github.com/brendonco/todos-keyword-lookup.git```

### Installing
```npm install```

Don't worry this will only install the eslint for linting the code syntax.


### Starting the application
```node index.js```

This will do current directory loookup and should be able to find a todo.js and index.js with 'TODO' keyword.
