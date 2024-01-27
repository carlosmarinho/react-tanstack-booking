type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

// const BASE_URL = process.env.REACT_APP_API_URL;
// const TOKEN = process.env.REACT_APP_API_TOKEN;

const BASE_URL = 'https://booking-strapi-api-717ba026294b.herokuapp.com/api'
const TOKEN = '0d382e36a68c48e9ff98b460a91d14a0c076f48c7fd1b0fad96bd1735a642bd5889411ae2587ce8be2dca3f40b224f245136aaea57838b72b878b75d338e5737512c3b569200840a1b9085ef322ed70df8d915f3754b392e95eb82cb328b5074a2dceb8bd1a8c1c1e8ef79c5683c828fe583b6b9bc858b328ae6f2d19c9b3ccb'

console.log('\n\n***\n baseurllll, token: ', process.env.REACT_APP_API_URL, process.env.REACT_APP_API_TOKEN, '\n***\n');


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
