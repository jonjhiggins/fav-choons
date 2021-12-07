import { isMatch } from 'date-fns'
import { Request, Response } from 'express'
import db from '../db'

async function getValues(userIdInt: number, date: string) {
    const query = `SELECT 
    track.title as track,
    artist.title as artist
FROM day_item
INNER JOIN track ON track.id = track_id
INNER JOIN artist ON artist.id = artist_id
WHERE day_item.user_id = $1
AND date = $2`

    try {
        const result = await db.query(query, [userIdInt, date])
        return { result, error: null }
    } catch (error) {
        return { result: null, error }
    }
}

export default async function getUserDate(
    { params: { userId, date } }: Request,
    response: Response
) {
    const userIdInt = parseInt(userId, 10)
    const isValidDate = isMatch(date, 'yyyy-MM-dd') && date.length === 10

    if (!userId || !userIdInt) {
        return response.status(500).json({ error: 'Invalid userId' })
    }
    if (!date || !isValidDate) {
        return response.status(500).json({ error: 'Invalid date' })
    }

    const { result, error } = await getValues(userIdInt, date)

    if (error) {
        return response.status(500).json({ error })
    }
    if (!result || !result.rows || result.rows.length === 0) {
        return response
            .status(404)
            .json({ error: 'Could not find user or tracks' })
    }
    return response.status(200).json(result.rows)
}
