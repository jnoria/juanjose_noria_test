#  jnoria-redis-lru-cache

Software library for Geo Distributed LRU (Least Recently Used) cache with time expiration. Criteria acceptance:

    1 - Simplicity. Integration needs to be dead simple. Used npm package manager to install the library.

    2 - Resilient to network failures or crashes. In order to be safe for failures or crashes, the data is stored on Redis.

    3 - Near real time replication of data across Geolocation. Writes need to be in real time.

    4 - Data consistency across regions

    5 - Locality of reference, data should almost always be available from the closest region

    6 - Flexible Schema

    7 - Cache can expire 

## Installation

```
npm install jnoria-redis-lru-cache
```


### Using the library

```js
import LruCache  from 'lru-cache'
import { createClient } from 'redis';

const redisClient = await createClient();
await redisClient.connect();
const cache = new LruCache(redisClient, "test", 3, 60);
await cache.init();
await cache.set('one', 'uno');


```

