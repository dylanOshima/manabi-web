/**
 * Data sourced from the Curriculum Doc on GDocs.
 * - IDs represent the index in the list.
 * - Refs to other objects are modeled as links to other tags
 */

// Mock data for Knowledge.model
const MOCK_KNOWLEDGE_DATA = [
  {
    id: 0,
    // ref to Course.model
    course_id: 0,
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
    questions: [0, 1, 2],
    tags: []
  },
  {
    id: 1,
    // ref to Course.model
    course_id: 0,
    text: `
# Overview of server/client architecture
The web is built on a client-server architecture. The client is usually a web browser that requests resources from a server. The server processes the request and sends back the requested resource. The client and server communicate using the HTTP protocol.

In this architecture, the client sends requests to the server, which then responds with data. The client does not have direct access to the server's resources or databases. Instead, the server provides APIs (Application Programming Interfaces) that allow the client to interact with its data.
    `,
    // ref to Questions.model
    questions: [3, 4, 5, 6],
    tags: []
  }
];

// Mock data for Course.model
const MOCK_COURSE_DATA = [
  {
    id: 0,
    title: "Web Foundations",
    description: "An introduction to the World Wide Web.",
    // ref to Student.model
    students: [0],
    // ref to Knowledge.model
    knowledge: [0],
  }
]

// Mock data for Question.model
const MOCK_QUESTION_DATA = [
  {
    id: 0,
    course: 0,
    text: "What happens when I hit enter on my browser?",
    // ref to Knowledge.model
    knowledge: [0],
    // ref to Response.model
    responses: [],
    // ref to Question.model
    relatedQuestions: [],
  },
  {
    id: 1,
    course: 0,
    text: "What does URL stand for?",
    // ref to Knowledge.model
    knowledge: [0],
    // ref to Response.model
    responses: [],
    // ref to Question.model
    relatedQuestions: [],
  },
  {
    id: 2,
    course: 0,
    text: "What does HTTP stand for?",
    // ref to Response.model
    responses: [],
    // ref to Question.model
    relatedQuestions: [],
  },
  {
    id: 3,
    course: 0,
    text: "What is the architecture of the web?",
    // ref to Response.model
    responses: [],
    // ref to Question.model
    relatedQuestions: [],
  },
  {
    id: 4,
    course: 0,
    text: "In the web's server-client architecture, what protocol does the server and client use to communicate?",
    // ref to Response.model
    responses: [],
    // ref to Question.model
    relatedQuestions: [],
  },
  {
    id: 5,
    course: 0,
    text: "In the web's server-client architecture, who is the client?",
    // ref to Response.model
    responses: [],
    // ref to Question.model
    relatedQuestions: [],
  },
  {
    id: 6,
    course: 0,
    text: "In the web's server-client architecture, what is the role of the server?",
    // ref to Response.model
    responses: [],
    // ref to Question.model
    relatedQuestions: [],
  }
]