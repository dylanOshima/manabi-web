import {
  TStudentDataRequestBody,
  TStudentDataRequestResponse,
  studentDataRouteURI,
} from "./student-data.details";

export const studentFetch = async (requestBody: TStudentDataRequestBody) => {
  const response = await fetch(studentDataRouteURI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as TStudentDataRequestResponse;
};
