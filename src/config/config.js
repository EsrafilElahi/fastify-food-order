import dotenv from 'dotenv'
dotenv.config()

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 3000

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
}

const PAGINATION = {
  page: 1,
  limit: 5
}

const config = {
  server: SERVER,
  pagination: PAGINATION
}

export default config
