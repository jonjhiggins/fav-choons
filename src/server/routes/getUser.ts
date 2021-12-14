import { format } from 'date-fns'
import { Request, Response } from 'express'
import { ErrorResponse, SuccessfulResponse } from '../../types/response'
import { dateFormat } from '../constants'
import db from '../db'

type User = {
    dates: string[]
}

type GetUserResponse = SuccessfulResponse<User> | ErrorResponse

export default async function getUser(
    { params: { username } }: Request,
    response: Response
): Promise<Response<GetUserResponse>> {
    const query = `
        WITH select_username AS (SELECT id FROM app_user WHERE username = $1)
        SELECT date from select_username
        LEFT JOIN day_item on select_username.id = day_item.user_id
        GROUP BY date
        ORDER BY date DESC`

    try {
        const result = await db.query(query, [username])
        const dates = result.rows.map(({ date }) => format(date, dateFormat))
        const data: GetUserResponse = {
            data: { dates },
            error: undefined,
            ok: true,
        }
        return response.status(200).json(data)
    } catch (error) {
        const data: GetUserResponse = { data: undefined, error, ok: false }
        return response.status(500).json(data)
    }
}
