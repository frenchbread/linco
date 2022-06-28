import { startHttpServer } from './http'
import { validateConfig } from './config'
import { connectToDb } from './http/db'

validateConfig()
connectToDb()
  .then(startHttpServer)
  .catch(err => console.error(err.message))
