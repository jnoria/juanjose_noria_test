#  jnoria-redis-lru-cache

LRU (Least Recently Used) cache with time expiration using redis

## Pre-requisites

- Install Node 16x or higher:
  - Mac: `brew install node@16`
  - Other: [nodejs.org/en/download/](https://nodejs.org/en/download/)
- Install redis:


## Dependancies

- Redis, v4x

## Installation

```
npm install jnoria-redis-lru-cache
```


### Using the library

```js
import LruCache  from 'lru-cache'
import { createClient } from 'redis';

const redisClient = await createClient();
//Redis client must be connected
await redisClient.connect();
const cache = new LruCache(redisClient, "test", 3, 60);
//Init Method must be called. If not, it will throw an Error
await cache.init();
//Call clear to delete all elements from cache and redis
await cache.clear();
await cache.put('one', 'uno'); //cache ['uno']
await cache.put('two', 'dos'); //cache ['uno','dos']
await cache.put('three', 'tres'); //cache ['uno','dos','tres']
await cache.get('one'); //cache ['dos','tres','uno']
await cache.put('four', 'cuatro'); //cache ['tres','uno','cuatro']
await cache.get('two'); //returns undefinied


```

