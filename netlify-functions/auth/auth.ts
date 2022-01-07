import { Handler } from '@netlify/functions';
import axios from 'axios';

export const handler: Handler = async (_event, context) => {
  const { identity, user } = context.clientContext;
  const userID = user.sub;
  const userUrl = `${identity.url}/admin/users/${userID}`;
  const adminAuthHeader = `Bearer ${identity.token}`;
  console.log(userUrl, adminAuthHeader);
  try {
    return axios(userUrl, {
      headers: { Authorization: adminAuthHeader },
    })
      .then(({ data }) => {
        console.log('data', JSON.stringify(data));
        return { statusCode: 204 };
      })
      .catch((error) => {
        console.log('Failed to get user! 500! Internal.', error);
        return {
          statusCode: 500,
          body: `Internal Server Error: ${error}`,
        };
      });
  } catch (error) {
    console.log('GOT HERE! 500! outer', error);
    return { statusCode: 500, body: `Internal Server Error: ${error}` };
  }
};
