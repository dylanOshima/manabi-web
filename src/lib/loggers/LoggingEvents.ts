/**
 * Logging events
 */

// Whether to send prompt to OpenAI
export const OPENAI_API_SEND_PROMPT = "OPENAI_API_SEND_PROMPT";
export const OPENAI_VALIDATE_GPT_FEEDBACK = "OPENAI_VALIDATE_GPT_FEEDBACK";

// Route Events
// **** Question-Answering
export const VALIDATE_USER_ANSWER = "VALIDATE_USER_ANSWER";
// **** Knowledge Connection Resulkts
export const GET_KNOWLEDGE_CONNECTION_RESULTS =
  "GET_KNOWLEDGE_CONNECTION_RESULTS";
// **** Student
export const GET_STUDENT_DATA = "GET_STUDENT_DATA";
export const GET_STUDENT_COURSES_DATA = "GET_STUDENT_COURSES_DATA";

// Auth
export const AUTH_MIDDLEWARE_VERIFICATION = "AUTH_MIDDLEWARE_VERIFICATION";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
