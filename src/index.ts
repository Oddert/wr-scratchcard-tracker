import express, { json, urlencoded } from 'express'
import * as dotenv from 'dotenv'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const env = dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static(path.join(__dirname, '../build')))
app.use(json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))
app.use(cors())

if (process.env.MODE === "development") {
	app.use(morgan('dev'))
}

const timestamp = Date.now().toLocaleString()

const confirmStart = () => console.log(`${timestamp}: Server initialised on PORT ${PORT}...`)

const server = app.listen(PORT, confirmStart)