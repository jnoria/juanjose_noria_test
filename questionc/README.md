#  jnoria-redis-lru-cache

LRU (Least Recently Used) cache with time expiration using redis. The library uses Redis in order to persist the elements in a centralized server.
The cache method is straightforward: a FIFO (First In, First Out) queue is created with a fixed size for the cache. When the cache reaches its limit, we remove the first item from the list. Frequently accessed items continuously move to the end of the queue, reducing the likelihood of being evicted from the cache


## Dependancies

- Redis, v4x

## Pre-requisites

- Install Node 16x or higher:
  - Mac: `brew install node@16`
  - Other: [nodejs.org/en/download/](https://nodejs.org/en/download/)
- It's a prerequisite to have Redis installed.  https://redis.io/docs/getting-started/installation/. If you prefer, you can use a docker cointainer


Start a redis if you install on OS  :

``` bash
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```


Start a redis via docker:

``` bash
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```


## Installation

```
npm install jnoria-redis-lru-cache
```


### Using the library

```js
import LruCache  from 'jnoria-redis-lru-cache'
import { createClient } from 'redis';

const redisClient = await createClient();
//Redis client must be connected
await redisClient.connect();
const cache = new LruCache(redisClient, "mycache", 3, 60);
//Init Method must be called. If not, it will throw an Error
await cache.init();
//Call clear to delete all elements from cache and redis
await cache.clear();
console.log(await cache.put('one', 'uno')); //cache ['uno']
console.log(await cache.put('two', 'dos')); //cache ['uno','dos']
console.log(await cache.put('three', 'tres')); //cache ['uno','dos','tres']
console.log(await cache.get('one')); //cache ['dos','tres','uno']
console.log(await cache.put('four', 'cuatro')); //cache ['tres','uno','cuatro']
console.log(await cache.get('two')); //returns undefinied


```


## Options

* `redisClient`: Intance of redis client. Should be connected
* `cacheName`: Cache name saved on Redis in order to create multiples cache on the same redir server
* `maxSize`: Size of the cache stack
* `expirationTime`: Expiration time in seconds for a Node. If the expiration time is completed, the node will be deleted automatically

## API

* `init()`: inicializes cache. Must be called before use other methods. 
* `put(key, value)`: set value for the given key, marking it as the most recently accessed one.
Keys should be strings, value be strings. 
* `get(key)`: get the value stored in the cache for the given key or `undefinied` if not exists.
If exixts, the element will be marked as the most recently accessed one.
* `delete(key)`: removes the element from the cache.
* `clear()`: empties the cache locally and server.
* `getAll(key)`: return all elements in a Map.


## Run test project

```
$ npm install
$ npm test
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
$ npm install jnoria-redis-lru-cache --save
```

Create new file index.ts

```js
import LruCache  from 'jnoria-redis-lru-cache'
import { createClient } from 'redis';

(async ()=>{

    try{
    
        const redisClient = await createClient();
        //Redis client must be connected
        await redisClient.connect();
        const cache = new LruCache(redisClient, "mycache", 3, 60);
        //Init Method must be called. If not, it will throw an Error
        await cache.init();
        //Call clear to delete all elements from cache and redis
        await cache.clear();
        await cache.put('one', 'uno'); //cache ['uno']
        await cache.put('two', 'dos'); //cache ['uno','dos']
        await cache.put('three', 'tres'); //cache ['uno','dos','tres']
        console.log(await cache.get('one')); //cache ['dos','tres','uno']
        await cache.put('four', 'cuatro'); //cache ['tres','uno','cuatro']
        console.log(await cache.get('two')); //returns undefinied
        if (redisClient.isOpen) redisClient.disconnect();
    }catch(e){

    }
})();
```

Build project

```
$ tsc --build
```

Run project

```
$ node index.js
```


## Reference

https://levelup.gitconnected.com/implementing-lru-cache-with-node-js-and-typescript-a7c8d3f6a63