const serverName = 'http://127.0.0.1:8000/'

export const getRequest = async (urlPath) => {
  const response  = await fetch(
    `${serverName}${urlPath}`
  )

  return await response.json();
}

export const postRequest = async (urlPath, data) => {
  const response  = await fetch(
    `${serverName}${urlPath}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

  return await response;
}

export const deleteRequest = async (urlPath) => {
  const response  = await fetch(
    `${serverName}${urlPath}`, {
      method: 'DELETE',
    })

  return await response;
}