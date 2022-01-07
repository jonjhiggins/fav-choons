import axios from 'axios';
import express from 'express';

export default async function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: () => void
) {
  try {
    const token =
      !!req.headers.authorization &&
      typeof req.headers.authorization === 'string'
        ? req.headers.authorization
        : '';

    const username = req.params.username;
    const {
      data: { data: verifiedUser },
    } = await axios(process.env.AUTH_URL, {
      headers: { Authorization: token },
    });

    if (username !== verifiedUser.id) {
      throw 'Username does not match verified user ID';
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
}
