import { Request, Response } from 'express';

export default async function getHome(_request: Request, response: Response) {
  return response.status(200).json({ ok: true });
}
