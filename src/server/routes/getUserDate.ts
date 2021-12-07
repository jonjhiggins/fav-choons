import { Request, Response } from 'express'
import db from '../db'

export default async function getUserDate(
    { params: { userId, date } }: Request,
    response: Response
) {
    const userIdInt = parseInt(userId, 10)
    if (!userId || !userIdInt) {
        return response.status(500).json({ error: 'Invalid userId' })
    }
    if (!date) {
        // @todo date validaton
        return response.status(500).json({ error: 'Invalid date' })
    }
    let rows = null
    try {
        const result = await db.query(
            `SELECT 
            track.title as track,
            artist.title as artist
        FROM day_item
        INNER JOIN track ON track.id = track_id
        INNER JOIN artist ON artist.id = artist_id
        WHERE day_item.user_id = $1
        AND date = $2
        `,
            [userId, date]
        )
        rows = result.rows
    } catch (error) {
        return response.status(500).json(error)
    }
    if (!rows || rows.length === 0) {
        return response
            .status(404)
            .json({ error: 'Could not find user or tracks' })
    }
    return response.status(200).json(rows)
}
