import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import getUserDate from './routes/getUserDate'
import addTrackForDate from './routes/createUserDate'
import getUser from './routes/getUser'

export default function server() {
    const app = express()
    const serverPort = 3000

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(helmet())

    app.get('/user/:username', getUser)
    // app.post('/user/:username', createUser)
    // app.put('/user/:username', updateUser)
    // app.delete('/user/:username', deleteUser)

    app.get('/user/:username/:date', getUserDate)
    app.post('/user/:username/:date', addTrackForDate)
    // app.put('/user/:username/:date', editUserDate)
    // app.delete('/user/:username/:date', deleteUserDate)

    // app.get('/track/:id', getTrack)
    // app.get('/artist/:id', getArtist)

    app.listen(serverPort, () => {
        console.log(`App running on port ${serverPort}`)
    })
}
