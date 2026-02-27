const store = new Map<string, unknown>();

export const appCache = {
  get<T>(key: string): T | undefined {
    return store.get(key) as T | undefined;
  },
  set(key: string, data: unknown) {
    store.set(key, data);
  },
  del(key: string) {
    store.delete(key);
  },
  clear() {
    store.clear();
  },
};
