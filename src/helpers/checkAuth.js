import { getData } from "./axios";
import Cookies from "js-cookie";

export const checkAuthentication = async () => {
  /* Checks for user authentication based on storage access token */

  const accessToken = Cookies.get("access_token");
  const result = {
    authenticated: false,
    isAdmin: false,
  };

  if (accessToken) {
    const tokenParts = JSON.parse(atob(accessToken.split(".")[1]));

    // exp date in token is expressed in seconds, while now() returns milliseconds:
    const now = Math.ceil(Date.now() / 1000);

    if (tokenParts.exp > now) {
      result.authenticated = true;
      const userdata = await getData(`user/is_admin/${tokenParts.user_id}/`);

      result.isAdmin = userdata.is_admin;
      return result;
    } else {
      throw new Error(`Expired token`);
    }
  } else {
    throw new Error(`Auth Token not found`);
  }
};
