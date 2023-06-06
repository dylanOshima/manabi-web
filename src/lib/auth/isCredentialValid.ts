import type { TStudentData } from '../db/models/Student.model';

import { isEmpty } from 'lodash';

export default async function isCredentialValid(
    email: TStudentData['email'],
  password: string,
): Promise<boolean> {
  if(isEmpty(email) || isEmpty(password)) {
    return false;
  }
  return true;
}