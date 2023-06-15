/**
 * Data sourced from the Curriculum Doc on GDocs.
 * - IDs represent the index in the list.
 * - Refs to other objects are modeled as links to other tags
 */

import { TCourseData } from "@/lib/db/models/Course.model";
import { TKnowledgeData } from "@/lib/db/models/Knowledge.model";
import { TKnowledgeConnectionData } from "@/lib/db/models/KnowledgeConnection.model";
import { TQuestionData } from "@/lib/db/models/Question.model";
import { TStudentData } from "@/lib/db/models/Student.model";
import { TResponseData } from "@/lib/db/models/responses/Response.model";

// Mock data for Question.model
const question: Array<TQuestionData> = [
  {
    id: 0,
    courseID: 0,
    text: "What happens when I hit enter on my browser?",
    // ref to Knowledge.model
    knowledgeIDs: [0],
    // ref to Response.model
    responseIDs: [],
    // ref to Question.model
    relatedQuestionIDs: [],
  },
  {
    id: 1,
    courseID: 0,
    text: "What does URL stand for?",
    // ref to Knowledge.model
    knowledgeIDs: [0],
    // ref to Response.model
    responseIDs: [],
    // ref to Question.model
    relatedQuestionIDs: [],
  },
  {
    id: 2,
    courseID: 0,
    text: "What does HTTP stand for?",
    // ref to Knowledge.model
    knowledgeIDs: [0],
    // ref to Response.model
    responseIDs: [],
    // ref to Question.model
    relatedQuestionIDs: [],
  },
  {
    id: 3,
    courseID: 0,
    text: "What is the architecture of the web?",
    // ref to Knowledge.model
    knowledgeIDs: [1],
    // ref to Response.model
    responseIDs: [],
    // ref to Question.model
    relatedQuestionIDs: [],
  },
  {
    id: 4,
    courseID: 0,
    text: "In the web's server-client architecture, what protocol does the server and client use to communicate?",
    // ref to Knowledge.model
    knowledgeIDs: [1],
    // ref to Response.model
    responseIDs: [],
    // ref to Question.model
    relatedQuestionIDs: [],
  },
  {
    id: 5,
    courseID: 0,
    text: "In the web's server-client architecture, who is the client?",
    // ref to Knowledge.model
    knowledgeIDs: [1],
    // ref to Response.model
    responseIDs: [],
    // ref to Question.model
    relatedQuestionIDs: [],
  },
  {
    id: 6,
    courseID: 0,
    text: "In the web's server-client architecture, what is the role of the server?",
    // ref to Knowledge.model
    knowledgeIDs: [1],
    // ref to Response.model
    responseIDs: [],
    // ref to Question.model
    relatedQuestionIDs: [],
  }
]

// Mock data for Knowledge.model
const knowledge: Array<TKnowledgeData> = [
  {
    id: 0,
    // ref to Course.model
    courseID: 0,
    text: `
  # What happens when I hit enter on my browser?
  When you type a URL (Uniform Resource Locator) into your browser's address bar and hit enter, a series of events happen:
  
  1. The browser parses the URL to identify the protocol, domain, and resource path.
  2. The browser checks its cache to see if it has a cached copy of the resource.
  3. If the resource is not cached, the browser sends a request to the domain's server using the HTTP (Hypertext Transfer Protocol) protocol.
  4. The server receives the request and responds with the requested resource (such as an HTML, CSS, or JavaScript file).
  5. The browser receives the response and starts rendering the page.
  6. The browser continues to send requests for any additional resources needed to fully render the page, such as images, videos, and fonts.
  7. The browser combines all the resources and displays the fully rendered web page.
      `,
    // ref to Questions.model
    questionIDs: [0, 1, 2],
  },
  {
    id: 1,
    // ref to Course.model
    courseID: 0,
    text: `
  # Overview of server/client architecture
  The web is built on a client-server architecture. The client is usually a web browser that requests resources from a server. The server processes the request and sends back the requested resource. The client and server communicate using the HTTP protocol.
  
  In this architecture, the client sends requests to the server, which then responds with data. The client does not have direct access to the server's resources or databases. Instead, the server provides APIs (Application Programming Interfaces) that allow the client to interact with its data.
      `,
    // ref to Questions.model
    questionIDs: [3, 4, 5, 6],
  }
];

// Mock data for Course.model
const course: Array<TCourseData> = [
  {
    id: 0,
    title: "Web Foundations",
    description: "An introduction to the World Wide Web.",
    // ref to Student.model
    studentIDs: [0],
    // ref to Knowledge.model
    knowledgeIDs: [0],
  }
];

const student: Array<TStudentData> = [
  {
    id: 0,
    email: "btesterson@hotmail.com",
    firstName: "Bobby",
    lastName: "Testerson",
    passwordHash: "password",
    courseIDs: [0],
  }
];

const textResponse: Array<TResponseData<string>> = [];
const knowledgeConnection: Array<TKnowledgeConnectionData> = [];

const MOCK_DB_DATA = Object.freeze({
  question,
  course,
  knowledge,
  textResponse,
  student,
  knowledgeConnection
})

export type TDB = typeof MOCK_DB_DATA;

export default MOCK_DB_DATA;