export const createRemission = (dataToSend: any,token: string) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${token}`
    },
    body: JSON.stringify(dataToSend)
  };

    return fetch('https://api.alegra.com/api/v1/remissions', options)
}