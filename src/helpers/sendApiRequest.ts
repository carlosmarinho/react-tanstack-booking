type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const BASE_URL = process.env.REACT_APP_API_URL;
const TOKEN = process.env.REACT_APP_API_TOKEN;

console.log('\n\n***\n baseurllll, token: ', BASE_URL, TOKEN, '\n***\n');


function returnCorrectRequest(
  method: Method,
  data: unknown,
): RequestInit {
  if (method === 'GET') {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    };
  }

  return {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
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
 
  const {data: respData} = await response.json()

  return respData;
}
