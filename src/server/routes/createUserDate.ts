import { Request, Response } from 'express'
import format from 'pg-format'
import db from '../db'
import userDateChecks from './userDateChecks'

async function insertValues(userId: number, date: string, tracks: string[]) {
    const data = tracks.map((t) => [userId, date, t])
    const query = format(
        'INSERT into day_item(user_id, date, track_id) VALUES %L',
        data
    )
    try {
        await db.query(query)
        return { error: null }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { error }
    }
}

export default async function createUserDate(
    {
        params: { username, date },
        body,
    }: Request<
        { username: string; date: string },
        Record<string, unknown>,
        { tracks: string[] }
    >,
    response: Response
) {
    const paramChecks = await userDateChecks(username, date)
    if (!paramChecks.userId) {
        return response
            .status(paramChecks.statusCode || 500)
            .json({ error: paramChecks.error })
    }

    const { error } = await insertValues(paramChecks.userId, date, body.tracks)

    if (error) {
        if (
            'code' in error &&
            error.code === '23505' &&
            error.constraint === 'day_item_user_id_date_track_id_key'
        ) {
            return response
                .status(500)
                .json({ error: 'Each track can only appear once for each day' })
        }
        return response.status(500).json({ error })
    }
    return response.status(200).json({ result: 'Success' })
}
