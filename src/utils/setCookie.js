import Cookies from "universal-cookie";

function setCookie(token) {
  const cookie = new Cookies(null, {
    path: "/",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  cookie.set("access", token);
}

export default setCookie;
