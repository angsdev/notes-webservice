import { createClient, RedisClientOptions } from 'redis';
import { CacheValue, RedisClient } from '../../../types';
import { CacheManager } from '../CacheManager';


export class RedisCacheManager extends CacheManager<RedisClient> {

  constructor(options: RedisClientOptions){

    super();
    this.client = createClient(options);
    this.client.on('error', err => console.log('Redis Client Error', err));
  }

  public async isHealthy(): Promise<boolean> {

    return this.client.isReady;
  }

  public async get<K = CacheValue>(key: string): Promise<K | null> {

    if(!this.isHealthy()) this.client.connect();

    const value = await this.client.get(key);
    if(!value) return null;

    try {

      return JSON.parse(value);

    } catch(err){

      return value as K;
    }
  }

  public async set<K = CacheValue>(key: string, value: K, options: { expirationMs?: number } = {}): Promise<void> {

    if(!this.isHealthy()) await this.client.connect();

    const valueToStore = (typeof value === 'string') ? value : JSON.stringify(value);
    await this.client.set(key, valueToStore, { PX: options.expirationMs });
  }

  public async delete(key: string): Promise<void> {

    if(!this.isHealthy()) await this.client.connect();

    throw new Error('Method not implemented.');
  }
}