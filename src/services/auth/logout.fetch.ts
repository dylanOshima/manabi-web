import { HTTPBadRequest } from "@/lib/errors/HTTPErrors";
import { TLoginResponse, logoutRouteURI } from "./loginLogout.details";

export const logoutFetch = async () => {
  const response = await fetch(logoutRouteURI, {
    method: "POST",
  });

  const data = (await response.json()) as TLoginResponse;
  if (response.status !== 200) {
    throw new HTTPBadRequest(`Request failed with status ${response.status}`);
  }

  if (!data.ok) {
    throw new HTTPBadRequest(`Failed to logout due to: ${data.message}`);
  }
  return data.ok;
};
