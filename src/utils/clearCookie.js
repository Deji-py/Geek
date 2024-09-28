import Cookies from "universal-cookie";

function clearCookie() {
  const cookie = new Cookies(null, { path: "/" });
  cookie.remove("access");
  cookie.remove("isVerified");
}

export default clearCookie;
