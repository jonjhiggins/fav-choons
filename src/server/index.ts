import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { Pool } from 'pg'
import db from './queries'

export default function server() {
    const app = express()
    const serverPort = 3000

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(helmet())

    const pool = new Pool()

    app.get('/user/:userId/:date', db.getUser.bind(null, pool))

    app.listen(serverPort, () => {
        console.log(`App running on port ${serverPort}`)
    })
}
