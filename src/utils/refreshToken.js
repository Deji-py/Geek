import axios from "axios";

async function refreshToken(refreshToken) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token/refresh/`,
      { refresh: refreshToken }
    );
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
}

export default refreshToken;
