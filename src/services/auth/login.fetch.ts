import { HTTPBadRequest } from "@/lib/errors/HTTPErrors";
import { TLoginRequestBody, TLoginResponse, loginRouteURI } from "./login.details";

export const loginFetch = async (
  requestBody: TLoginRequestBody,
) => {
  const response = await fetch(loginRouteURI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  const data =
    (await response.json()) as TLoginResponse;
  if (response.status !== 200) {
    throw new HTTPBadRequest(`Request failed with status ${response.status}`);
  }

  if(!data.ok) {
    throw new HTTPBadRequest(`Failed to login due to: ${data.message}`);
  }
  return data.ok;
};
