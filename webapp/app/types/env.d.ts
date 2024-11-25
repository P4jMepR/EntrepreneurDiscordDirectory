declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      MONGO_USERNAME?: string
      MONGO_PASSWORD?: string
      MONGO_HOST?: string
      MONGO_PORT?: string
    }
  }
}

export {} 