import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    const now = Date.now() / 1000;
    return exp < now;
  } catch (e) {
    return true;
  }
}

export default isTokenExpired;
