import { createClient } from 'redis';


export type RedisClientType = ReturnType<typeof createClient>

export default class LruCache {

  redisClient: RedisClientType;
  private cacheName: string = '';
  private maxSize: number = 0;
  private cache: Map<string, any> = new Map<string, any>();
  private isInitialized: boolean;
  private expirationTime: number;
  static ERROR_INVALID_REDIS: string = "Redis not definied or not open";
  static ERROR_CACHE_NOT_INITIALIZED: string = "Cache not initialized. Please call method init";



  constructor(redisClient: RedisClientType, cacheName: string, maxSize: number, expirationTime: number = 0) {
    this.isInitialized = false;
    this.cacheName = cacheName;
    this.redisClient = redisClient;
    this.maxSize = maxSize;
    this.expirationTime = expirationTime;
    this.cache = new Map<string, any>();
    if (!this.redisClient || !this.redisClient.isReady || !this.redisClient.isOpen) throw Error(LruCache.ERROR_INVALID_REDIS);
  }

  async init() {
    this.isInitialized = true;
    this.cache = await this.getAll();
  }


  async put(key: string, value: string) {
    if (! this.isInitialized) throw Error(LruCache.ERROR_CACHE_NOT_INITIALIZED);
    if (this.cache.size >= this.maxSize) {
      const leastRecentlyUsedKey = this.cache.keys().next().value
      this.cache.delete(leastRecentlyUsedKey);
      await this.removeNodeFromRedis(leastRecentlyUsedKey);
    }
    this.cache.set(key, value)
    await this.setNodeToRedis(key, value);
    this.setNodeExpirationTime(key);
  }


  async get(key: string): Promise<any> {
    if (! this.isInitialized) throw Error(LruCache.ERROR_CACHE_NOT_INITIALIZED);
    const item = this.cache.get(key)
    if (item != undefined) {
      this.cache.delete(key)
      await this.removeNodeFromRedis(key);
      this.cache.set(key, item)
      await this.setNodeToRedis(key, item);
      this.setNodeExpirationTime(key);
      return item
    }
    return undefined
  }

  async delete(key: string): Promise<void> {
    if (! this.isInitialized) throw Error(LruCache.ERROR_CACHE_NOT_INITIALIZED);
    this.cache.delete(key);
    await this.removeNodeFromRedis(key);
  }

  async clear(): Promise<void> {
    if (! this.isInitialized) throw Error(LruCache.ERROR_CACHE_NOT_INITIALIZED);
    this.cache.clear();
    await this.flushRedis();
  }

  async getAll(): Promise<Map<string, string>> {
    if (! this.isInitialized) throw Error(LruCache.ERROR_CACHE_NOT_INITIALIZED);
    const _cache = new Map<string, string>();
    const elements = await this.getAllNodesFromRedis();
    if (elements) {
      for (let name in elements) {
        _cache.set(name, elements[name]);
      }
    }
    return _cache;
  }

  printCache(): string{
    let printString : string  = "|";
    this.cache.forEach((value: any, key: string) => {
        printString += ("key: " + key + " = " + value + " | ");
    });
    return printString;
  }

  private async getAllNodesFromRedis(): Promise<any> {
    return this.redisClient.hGetAll(this.cacheName);
  }

  private async setNodeToRedis(key: string, value: string): Promise<void> {
    console.log("=>Setting to redis: Cache=" + this.cacheName + " Key=" + key + " Value:" + value);
    this.redisClient.hSet(this.cacheName, key, value);
  }

  private async getNodeFromRedis(key: string): Promise<string> {
    return this.redisClient.hGet(this.cacheName, key);
  }

  private async removeNodeFromRedis(key: string): Promise<void> {
    this.redisClient.hDel(this.cacheName, key);
  }

  private async flushRedis(): Promise<void> {
    this.redisClient.flushDb();
  }

  private setNodeExpirationTime(key: string){
       if (this.expirationTime > 0){
         setTimeout(async (_key: string)=> {
            console.log("Deleting " + _key + " by expirationTime");
            if (this.cache.get(_key)) {
              await this.delete(_key);
          }
         }, this.expirationTime * 1000, key);
       }
  }

}
