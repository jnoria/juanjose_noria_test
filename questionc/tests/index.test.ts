import LruCache from '../src/lru-cache';
import {expect, jest, test, describe, beforeAll, afterAll, beforeEach} from '@jest/globals';
const redis = require('redis').createClient(6379, 'localhost');
const redis2 = require('redis').createClient(6379, 'localhost');
const redisFailed = require('redis').createClient(67898, 'localhost');
import { setTimeout } from "timers/promises";

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
            if (!redis.isOpen) await redis.connect();
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
            
            if (!redis.isOpen) await redis.connect();
            let _cache = new LruCache(redis, "test", 3, 60);
            await _cache.init();
            await _cache.clear();
            const resultado = await _cache.get("anything");
            await _cache.clear()
            expect(resultado).toBe(undefined);
        } catch (e) {
            throw e;
        }
    }); 
   test("put[uno] put[dos] put[tres] put[cuatro] get[uno] should return undefinied ", async () => {
        try {
            if (!redis.isOpen) await redis.connect();
            let _cache = new LruCache(redis, "test1", 3, 30);
            await _cache.init();
            await _cache.clear();
            await _cache.put("uno","uno");
            await _cache.put("dos","dos");
            await _cache.put("tres","tres");
            await _cache.put("cuatro","cuatro");
            const result = await _cache.get("uno");
            await _cache.clear();
            expect(result).toBe(undefined);
        } catch (e) {
            throw e;
        }
    });    
   test("put[uno] put[dos] put[tres] get[uno] put[cuatro] get[dos] should return undefinied", async () => {
        try {
            if (!redis.isOpen) await redis.connect();
            let _cache = new LruCache(redis, "test2", 3, 30);
            await _cache.init();
            await _cache.clear();
            await _cache.put("uno","uno");
            await _cache.put("dos","dos");
            await _cache.put("tres","tres");
            await _cache.get("uno");
            await _cache.put("cuatro","cuatro");
            const result = await _cache.get("dos");
            await _cache.clear();
            expect(result).toBe(undefined);
        } catch (e) {
            throw e;
        }
    });  
    
    test("put[uno] put[dos] put[tres] get[uno] put[cuatro] get[uno] should return uno", async () => {
        try {
            if (!redis.isOpen) await redis.connect();
            let _cache = new LruCache(redis, "test3", 3, 30);
            await _cache.init();
            await _cache.clear();
            await _cache.put("uno","uno");
            await _cache.put("dos","dos");
            await _cache.put("tres","tres");
            await _cache.get("uno");
            await _cache.put("cuatro","cuatro");
            const result = await _cache.get("uno");
            await _cache.clear();
            expect(result).toBe("uno");
        } catch (e) {
            throw e;
        }
    });  

   test("put[uno] put[dos] put[tres] sleep 11 second get[uno] should return undenied beacuse expirationTime is done", async () => {
        try {
            if (!redis.isOpen) await redis.connect();
            let _cache = new LruCache(redis, "test4", 3, 1);
            await _cache.init();
            await _cache.clear();
            await _cache.put("uno","uno");
            await _cache.put("dos","dos");
            await _cache.put("tres","tres");
            await setTimeout(3000);
            const result = await _cache.get("uno");
            await _cache.clear();
            await expect(result).toBe(undefined);
            await setTimeout(1000);
        } catch (e) {
            throw e;
        }
    },10000);  
});

describe('Testing two intances',  () => {
    test("getting a value creating by another instance", async () => {
        try {
            
            if (!redis.isOpen) await redis.connect();
            if (!redis2.isOpen) await redis2.connect();
            let _cache = new LruCache(redis, "test5", 3, 20);
            let _cache2 = new LruCache(redis2, "test5", 3, 20);
            await _cache.init();
            await _cache2.init();
            await _cache.clear();
            await _cache.put("one","one");
            await _cache.put("two","two");
            await _cache.put("three","two");
            const resultado = await _cache2.get("one");
            await setTimeout(2000);
            await _cache.clear()
            expect(resultado).toBe("one");
        } catch (e) {
            throw e;
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