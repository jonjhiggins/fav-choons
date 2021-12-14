import { Request } from 'express'
import { StandardResponse } from '../../types/response'
import { Track } from '../../types/track'
import db from '../db'
import userDateChecks from './userDateChecks'

type UserDate = {
    tracks: Track[]
}

async function getValues(userId: number, date: string) {
    const query = `SELECT 
    track.title as track,
    artist.title as artist
FROM day_item
INNER JOIN track ON track.id = track_id
INNER JOIN artist ON artist.id = artist_id
WHERE day_item.user_id = $1
AND date = $2;`

    try {
        const result = await db.query(query, [userId, date])
        return { result, error: null }
    } catch (error) {
        return { result: null, error }
    }
}

export default async function getUserDate(
    { params: { username, date } }: Request,
    response: StandardResponse<UserDate>
) {
    const paramChecks = await userDateChecks(username, date)
    if (!paramChecks.userId) {
        return response
            .status(paramChecks.statusCode || 500)
            .json({ ok: false, error: paramChecks.error })
    }
    const { result, error } = await getValues(paramChecks.userId, date)

    if (error) {
        return response.status(500).json({ ok: false, error })
    }
    if (!result || !result.rows || result.rows.length === 0) {
        return response
            .status(404)
            .json({ ok: false, error: 'Could not find tracks for this day' })
    }
    return response
        .status(200)
        .json({ ok: true, data: { tracks: result.rows } })
}
