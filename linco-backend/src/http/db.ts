import { connect } from 'mongoose'
import config from 'src/config'

export function connectToDb() {
  return connect(config.dbHost)
}
