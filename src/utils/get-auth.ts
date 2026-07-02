import { jwtDecode } from "jwt-decode";

export const getAuth = (accessToken?: string | null) => {
  if (!accessToken) return false;
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  if (decoded?.exp) return decoded?.exp > currentTime;
  return false;
};
