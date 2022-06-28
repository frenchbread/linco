import dotenv from 'dotenv'
dotenv.config()

const config = {
  httpPort: Number(process.env.HTTP_PORT) || 8080,
  httpHost: process.env.HTTP_HOST || '0.0.0.0',
  environment: process.env.NODE_ENV || 'development',
  dbHost: process.env.DB_HOST || 'mongodb://localhost:27017/links',
  pubHostExample: process.env.PUBLIC_HOST_EXAMPLE || 'https://lin.co/'
}

export default config

export function validateConfig() {
  const requiredKeys: (keyof typeof config)[] = ['httpPort']

  requiredKeys.forEach(key => {
    if (!config[key]) {
      throw new Error(`${key} is required`)
    }
  })
}
