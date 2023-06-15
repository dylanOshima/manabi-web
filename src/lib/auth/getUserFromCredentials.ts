import type { TStudentData } from "../db/models/Student.model";

import { first, memoize } from 'lodash';

import StudentModel from "../db/models/Student.model";
import { HTTPInternalServerError } from '../errors/HTTPErrors';
import isCredentialValid from "./isCredentialValid";

async function getUserFromCredentials(
  email: TStudentData['email'],
  password: string,
): Promise<StudentModel | null> {
  const valid = await isCredentialValid(email, password);
  if(!valid) {
    return null;
  }

  const students = (await StudentModel.queryAll()).filter({email}).value();
  if(students.length > 1) {
    throw new HTTPInternalServerError(
      `More than 1 user found with the given email: '${students.map(s => s.email).join(', ')}'.`
      );
  }

  const targetStudentData = first(students);
  if(targetStudentData == null) {
    // No student found with the passed credentials.
    return null;
  }

  const student = new StudentModel(targetStudentData);
  const hasCorrectPassword = await student.isCorrectPassword(password);
  if(!hasCorrectPassword) {
    // Passed password was incorrect.
    return null;
  }
  return student;
}

export default memoize(getUserFromCredentials, (email, password) => email + password);