/**
 * Simple LRU (Least Recently Used) Cache
 * Zero-dependency implementation for performance optimization
 */

interface CacheNode<K, V> {
  key: K;
  value: V;
  prev: CacheNode<K, V> | null;
  next: CacheNode<K, V> | null;
}

/**
 * LRU Cache with configurable max size
 */
export class LRUCache<K, V> {
  private maxSize: number;
  private cache: Map<K, CacheNode<K, V>>;
  private head: CacheNode<K, V> | null;
  private tail: CacheNode<K, V> | null;

  constructor(maxSize = 128) {
    this.maxSize = maxSize;
    this.cache = new Map();
    this.head = null;
    this.tail = null;
  }

  /**
   * Get a value from cache
   */
  get(key: K): V | undefined {
    const node = this.cache.get(key);
    if (!node) return undefined;

    // Move to front (most recently used)
    this.moveToFront(node);
    return node.value;
  }

  /**
   * Set a value in cache
   */
  set(key: K, value: V): void {
    const existingNode = this.cache.get(key);

    if (existingNode) {
      // Update existing node
      existingNode.value = value;
      this.moveToFront(existingNode);
      return;
    }

    // Create new node
    const newNode: CacheNode<K, V> = {
      key,
      value,
      prev: null,
      next: this.head,
    };

    if (this.head) {
      this.head.prev = newNode;
    }
    this.head = newNode;

    this.tail ??= newNode;

    this.cache.set(key, newNode);

    // Evict least recently used if over capacity
    if (this.cache.size > this.maxSize) {
      this.evictLRU();
    }
  }

  /**
   * Check if key exists
   */
  has(key: K): boolean {
    return this.cache.has(key);
  }

  /**
   * Clear cache
   */
  clear(): void {
    this.cache.clear();
    this.head = null;
    this.tail = null;
  }

  /**
   * Get current cache size
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Move node to front (most recently used)
   */
  private moveToFront(node: CacheNode<K, V>): void {
    if (node === this.head) return;

    // Remove from current position
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node === this.tail) {
      this.tail = node.prev;
    }

    // Move to front
    node.prev = null;
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
  }

  /**
   * Evict least recently used node
   */
  private evictLRU(): void {
    if (!this.tail) return;

    const lruKey = this.tail.key;
    this.cache.delete(lruKey);

    if (this.tail.prev) {
      this.tail.prev.next = null;
    }
    this.tail = this.tail.prev;

    if (!this.tail) {
      this.head = null;
    }
  }
}

/**
 * Global caches for expensive calculations
 */
export const caches = {
  watat: new LRUCache<
    number,
    ReturnType<typeof import('../lib/intercalary.js').watat>
  >(256),
  thingyan: new LRUCache<
    number,
    ReturnType<typeof import('../lib/thingyan.js').thingyan>
  >(256),
  waso: new LRUCache<string, ReturnType<typeof import('../lib/waso.js').waso>>(
    256
  ),
  firstDayOfTagu: new LRUCache<
    string,
    ReturnType<typeof import('../lib/firstDayOfTagu.js').firstDayOfTagu>
  >(256),
};
