type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const BASE_URL = 'http://localhost:1337/api'
const TOKEN = '05247f31ae3f12268093a56666056bafe80d804e9d12959e38c84afa42a159eecf18359540523f02d39dedfa42187cacc920f8dedf3bf5cce34a6e3b56401a7af804fd8a15e586526558f7e2e2259431ff333f89855e8893d0d9c819fd9a8e2026d31151411e3f0fc0f539adf9e59cb664c459c8781764bdc4613737ff3acf9b'

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
