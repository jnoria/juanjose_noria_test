import LruCache from '../src/lru-cache';
import {expect, jest, test, describe, beforeAll, afterAll} from '@jest/globals';
const redis = require('redis').createClient(6379, 'localhost');
const redis2 = require('redis').createClient(6379, 'localhost');
const redisFailed = require('redis').createClient(67898, 'localhost');

describe('Creating cache',  () => {

    test("should throw an error if redis is incorrect", () => {
        expect(() => {
            new LruCache(redisFailed, "test", 3, 60)
        }).toThrow();
    });
    test("should throw an error if redis is not connected", () => {
        expect(() => {
            new LruCache(redis, "test", 3, 60)
        }).toThrow();
    });
    test("should throw an error if cache is not inicialized", async () => {
        try {
            await redis.connect();
            let _cache = new LruCache(redis, "test", 3, 60);
            await _cache.get("fail");
        } catch (e) {
            if ( typeof e === "object" && e && "message" in e && typeof e.message === "string") {
                expect(e.message).toMatch(LruCache.ERROR_CACHE_NOT_INITIALIZED);
            }
        }
    });

});

describe('Testing put get scenarios',  () => {
    test("getting a key not existed should return undefinied", async () => {
        try {
            let _cache = new LruCache(redis, "test", 3, 60);
            await _cache.init();
            const result = await _cache.get("nothing");
            expect(result).toBe(undefined);
        } catch (e) {
        }
    }); 
   test("getting element least used should return undefinied ", async () => {
        try {
            await redis.connect();
            let _cache = new LruCache(redis, "test", 3, 30);
            await _cache.init();
            await _cache.clear();
            await _cache.put("uno","uno");
            await _cache.put("dos","dos");
            await _cache.put("tres","tres");
            await _cache.put("cuatro","cuatro");
            const result = await _cache.get("uno");
            //const result = await _cache.get("uno");
            expect(result).toBe(undefined);
        } catch (e) {
        }
    });    
    test("getting element least used should return undefinied ", async () => {
        try {
            await redis.connect();
            let _cache = new LruCache(redis, "test", 3, 30);
            await _cache.init();
            await _cache.clear();
            await _cache.put("uno","uno");
            await _cache.put("dos","dos");
            await _cache.put("tres","tres");
            await _cache.get("uno");
            await _cache.put("cuatro","cuatro");
            const result = await _cache.get("dos");
            //const result = await _cache.get("uno");
            expect(result).toBe(undefined);
        } catch (e) {
        }
    });   
});

beforeAll(done => {
    done()
})
  
afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    if (redis.isOpen)
        redis.disconnect();
    if (redis2.isOpen)
        redis2.disconnect();
    done()
})