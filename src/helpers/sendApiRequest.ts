type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const BASE_URL = process.env.REACT_APP_API_URL;
const TOKEN = process.env.REACT_APP_API_TOKEN;

function returnCorrectRequest(
  method: Method,
  data: unknown,
): RequestInit {
  if (method === 'GET') {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    };
  }

  return {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  };
}

export async function sendApiRequest<T>(
  url: string,
  method: Method,
  data: unknown = {},
): Promise<T> {
  const response = await fetch(
    BASE_URL + url,
    returnCorrectRequest(method, data),
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const { data: respData } = await response.json();

  return respData;
}

/**@todo for some reason strapi api don't return data and meta for user,
 * for this reason we need to create a second sendApiRequest that is specifically for user.
 * We could improve it merging this 2 functions in one*/
export async function sendApiRequestforUser<T>(
  url: string,
  method: Method,
  data: unknown = {},
): Promise<T> {
  const response = await fetch(
    BASE_URL + url,
    returnCorrectRequest(method, data),
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}
