import { CacheValue } from "../../types";

export abstract class CacheManager<T = unknown> {

  protected client: T;

  public abstract isHealthy(): Promise<boolean>;

  public abstract get<K = CacheValue>(key: string): Promise<K | null>;

  public abstract set<K = CacheValue>(key: string, value: K, options?: { expirationMs?: number }): Promise<void>;

  public abstract delete(key: string): Promise<void>;
}