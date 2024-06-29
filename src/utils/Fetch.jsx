import axios from "axios";

export const FetchApi = async (method, url, body = null, authToken = null) => {
  const headers = authToken
    ? {
        "x-access-token": authToken,
      }
    : {};

  const response = await axios({
    method,
    url,
    data: body,
    headers,
  });

  const result = response.data;

  return result;
};
