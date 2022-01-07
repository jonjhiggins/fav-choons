import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async (_event, context) => {
  const { identity, user } = context.clientContext;
  const userID = user.sub;
  const userUrl = `${identity.url}/admin/users/${userID}`;
  const adminAuthHeader = `Bearer ${identity.token}`;
  try {
    return axios(userUrl, {
      headers: { Authorization: adminAuthHeader },
    })
      .then(({ data }) => {
        return { statusCode: 200, body: JSON.stringify({ data }) };
      })
      .catch((error) => {
        console.log('Failed to get user', error);
        return {
          statusCode: 500,
          body: `Internal Server Error: ${error}`,
        };
      });
  } catch (error) {
    console.log('Unknown error trying to get user', error);
    return { statusCode: 500, body: `Internal Server Error: ${error}` };
  }
};
