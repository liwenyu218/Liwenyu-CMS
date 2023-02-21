enum CacheType {
  Local,
  Session
}

class Cache {
  storeage: Storage

  constructor(type: CacheType) {
    this.storeage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value !== undefined) {
      this.storeage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storeage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storeage.removeItem(key)
  }

  clearCache() {
    this.storeage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
