import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import getUserDate from './app/routes/getUserDate';
import addTrackForDate from './app/routes/createUserDate';
import getUser from './app/routes/getUser';

const app = express();
const serverPort = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.get('/user/:username', getUser);
// app.post('/user/:username', createUser)
// app.put('/user/:username', updateUser)
// app.delete('/user/:username', deleteUser)

app.get('/user/:username/:date', getUserDate);
app.post('/user/:username/:date', addTrackForDate);
// app.put('/user/:username/:date', editUserDate)
// app.delete('/user/:username/:date', deleteUserDate)

// app.get('/track/:id', getTrack)
// app.get('/artist/:id', getArtist)

const server = app.listen(serverPort, () => {
  console.log(`App running on port ${serverPort}`);
});
server.on('error', console.error);
