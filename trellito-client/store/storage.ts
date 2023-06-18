import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

interface WebStorage {
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
}

const createNoopStorage = (): WebStorage => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: string) {
      return Promise.resolve()
    },
    removeItem(_key: string) {
      return Promise.resolve()
    }
  }
}

const storage: WebStorage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

export default storage
