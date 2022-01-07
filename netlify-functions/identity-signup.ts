import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const { user } = JSON.parse(event.body);
  console.log(JSON.stringify(user));
  return { statusCode: 204 };
};
