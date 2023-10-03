#  jnoria-version-compare

Software library that accepts 2 version string as input and returns whether one is greater than, equal, or less than the other.


## Pre-requisites

- Install Node 16x or higher:
  - Mac: `brew install node@16`
  - Other: [nodejs.org/en/download/](https://nodejs.org/en/download/)
- Or use a Node version manager: [`fnm`](https://github.com/Schniz/fnm#readme)

## Installation

```
npm install jnoria-version-compare
```


## Using the library

```js
import VersionCompare  from 'jnoria-version-compare'

const vA: string= "2.0.1";
const vB: string = "2.0.0"

if (VersionCompare.compare (vA,vB) == VersionCompare.VERSION_A_GREATHER){
    //Version A is greather than Version B
}

if (VersionCompare.compare (vA,vB) == VersionCompare.VERSION_A_LESS){
    //Version B is greather than Version A
}

if (VersionCompare.compare (vA,vB) == VersionCompare.VERSION_EQUAL){
    //Version A and Version B are equal
}

if (VersionCompare.compare (vA,vB) == VersionCompare.VERSION__A_ERROR_INPUT){
    //Version A invalid format error
}

if (VersionCompare.compare (vA,vB) == VersionCompare.VERSION__B_ERROR_INPUT){
    //Version B invalid format error
}


```

## Run test project

```
$ npm install
$ npm test
```

## Run an example project

```
$ npm install
$ npm run main
```

## Example creating a new typescript project and use the library

Create new typescript project

```
$ mkdir my_project
$ cd my_project
$ npm init -y
$ npm install typescript --save-dev
$ npx tsc --init
```

Install the library

```
$ npm install jnoria-version-compare --save
```

Create new file index.ts

```js
import VersionCompare  from 'jnoria-version-compare'

const vA: string= "2.0.1";
const vB: string = "2.0.0"

if (VersionCompare.compare (vA,vB) == VersionCompare.VERSION_A_GREATHER){
   console.log("Version A is greather than Version B");
}
```

Build project

```
$ tsc --build
```

Run project

```
$ node index.js
```


