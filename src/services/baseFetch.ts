/**
 * General purpose request
 * @param requestBody the reqest parameters
 * @returns
 */
export default async function baseFetch<
  TRequestBody extends object,
  TResponseBody extends object,
>(uri: string, requestBody: TRequestBody): Promise<TResponseBody> {
  const response = await fetch(uri, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as TResponseBody;
}
