import { Response } from 'express';

// Response

type Input = {
  [key: string]: unknown;
};

export interface SuccessfulResponse<Data extends Input> {
  ok: true;
  data: Data;
}

export interface ErrorResponse {
  ok: false;
  error: unknown;
}

type StandardResponseTypes<T extends Input> =
  | SuccessfulResponse<T>
  | ErrorResponse;

type Send<ResBody = Record<string, unknown>, T = Response<ResBody>> = (
  body: ResBody // eslint-disable-line no-unused-vars
) => T;

interface CustomResponse<T> extends Response {
  json: Send<T, this>;
}

type StandardResponse<T extends Input> = CustomResponse<
  StandardResponseTypes<T>
>;

// User

type User = {
  dates: Dates;
};

export type Dates = string[];

export type UserJsonResponse = StandardResponse<User>;
export type UserResponse = StandardResponseTypes<User>;

// UserDate

type UserDate = {
  tracks: Track[];
};

export type UserDateJsonResponse = StandardResponse<UserDate>;
export type UserDateResponse = StandardResponseTypes<UserDate>;

// Track

export interface Track {
  artist: string;
  title: string;
  spotifyId?: string;
}

export function types(): string {
  return 'types';
}
