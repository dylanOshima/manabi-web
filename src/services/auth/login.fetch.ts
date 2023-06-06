import { TLoginRequestBody, TLoginResponse, loginRouteURI } from "./login.details";

export const loginFetch = async (
  requestBody: TLoginRequestBody,
  onError?: (errorMessage: string) => void,
) => {
  const response = await fetch(loginRouteURI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  const data =
    (await response.json()) as TLoginResponse;
  if (response.status !== 200) {
    onError && onError(`Request failed with status ${response.status}`);
  }
  if(!data.ok) {
    onError && onError(data.message);
  }
  return data.ok;
};
