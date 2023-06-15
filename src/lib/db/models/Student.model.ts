import type { ExpChain } from "lodash";
import type { ID } from "../../consts/ids";

import { isNil } from "lodash";

import { db } from "@/lib/db";
import { TDB } from "../mock-db-data";
import ModelBase from "./ModelBase";

export type TStudentData = {
  id: ID,
  email: string,
  firstName: string,
  lastName: string,
  passwordHash: string,
  courseIDs: ID[],
  // knowledgeIDs: [],
  // responseIDs: []
}

/**
 * Student model.
 */
export default class StudentModel extends ModelBase<TStudentData> {

  public static type: "student" = "student";

  /**
   * Fetches an instance of the target model.
   * @param id the id of the instance to fetch
   */
  public static async fetch(
    id: ID,
  ) {
    await db.read();
    const data = db.query.get(StudentModel.type).find({ id }).value();
    return new StudentModel(data);
  }

  public async save(
  ): Promise<void> {
    db.data[StudentModel.type].push(this.data);
    await db.write();
  }

  public static async queryAll(
  ): Promise<ExpChain<TDB["student"]>> {
    await db.read();
    return db.query.get(StudentModel.type).omitBy(isNil).values();
  }

  public async isCorrectPassword(
    password: string
  ): Promise<boolean> {
    // TODO: Actually do hashing.
    return password === this.data.passwordHash;
  }
}