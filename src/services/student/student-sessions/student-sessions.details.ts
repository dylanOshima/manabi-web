import { ID } from "@/lib/consts/ids";
import { TKnowledgeData } from "@/lib/db/models/Knowledge.model";
import { TKnowledgeConnectionData } from "@/lib/db/models/KnowledgeConnection.model";

export const studentSessionsURI = `/api/student/sessions`;

export type TStudentStudySessionsDataRequestBody = {
  studentID?: ID;
};

export type TStudentStudySessionsDataRequestResponse = Array<{
  knowledge: TKnowledgeData;
  sessions: Array<Omit<TKnowledgeConnectionData, "responseIDs">>;
}>;
