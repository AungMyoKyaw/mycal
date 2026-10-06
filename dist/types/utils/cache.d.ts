/**
 * Simple LRU (Least Recently Used) Cache
 * Zero-dependency implementation for performance optimization
 */
/**
 * LRU Cache with configurable max size
 */
export declare class LRUCache<K, V> {
    private maxSize;
    private cache;
    private head;
    private tail;
    constructor(maxSize?: number);
    /**
     * Get a value from cache
     */
    get(key: K): V | undefined;
    /**
     * Set a value in cache
     */
    set(key: K, value: V): void;
    /**
     * Check if key exists
     */
    has(key: K): boolean;
    /**
     * Clear cache
     */
    clear(): void;
    /**
     * Get current cache size
     */
    size(): number;
    /**
     * Move node to front (most recently used)
     */
    private moveToFront;
    /**
     * Evict least recently used node
     */
    private evictLRU;
}
/**
 * Global caches for expensive calculations
 */
export declare const caches: {
    watat: LRUCache<number, import("../types.js").WatatInfo>;
    thingyan: LRUCache<number, import("../types.js").ThingyanResult>;
    waso: LRUCache<string, import("../types.js").WasoResult>;
    firstDayOfTagu: LRUCache<string, import("../types.js").FirstDayOfTaguResult>;
};
//# sourceMappingURL=cache.d.ts.map