import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import getUserDate from './routes/getUserDate'

export default function server() {
    const app = express()
    const serverPort = 3000

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(helmet())

    app.get('/user/:userId/:date', getUserDate)

    app.listen(serverPort, () => {
        console.log(`App running on port ${serverPort}`)
    })
}
