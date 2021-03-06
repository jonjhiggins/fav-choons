import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import getUserDate from './app/routes/getUserDate';
import addTrackForDate from './app/routes/createUserDate';
import getUser from './app/routes/getUser';
import getUsers from './app/routes/getUsers';
import getHome from './app/routes/getHome';
import authMiddleware from './app/middleware/auth';

const app = express();
const serverPort = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(helmet());

app.get('/', getHome);
app.get('/users', getUsers);
app.get('/user/:username', getUser);
// app.post('/user/:username', createUser)
// app.put('/user/:username', updateUser)
// app.delete('/user/:username', deleteUser)

app.get('/user/:username/:date', getUserDate);
app.post('/user/:username/:date', authMiddleware, addTrackForDate);
// app.put('/user/:username/:date', editUserDate)
// app.delete('/user/:username/:date', deleteUserDate)

// app.get('/track/:id', getTrack)
// app.get('/artist/:id', getArtist)

const server = app.listen(serverPort, () => {
  console.log(`App running on port ${serverPort}`);
});
server.on('error', console.error);
