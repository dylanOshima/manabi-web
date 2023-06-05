import { InvalidInputError } from "@/lib/errors/InvalidInputError";
import { isNil, toNumber } from "lodash";

/**
 * General purpose ID type.
 */
export type ID = number;

/**
 * Generate a new ID
 * @returns a six digit ID
 */
export const genID = (): ID => Math.floor(100000 + Math.random() * 900000);

/**
 * A value that is potentially an ID.
 * @param val a value that is maybe an ID
 * @returns an ID or null
 */
export function maybeID(val: any): ID | null {
  if (isNil(val) || !isFinite(val)) {
    return null;
  }
  return toNumber(val) as ID;
}

/**
 * A value that is an ID. Throws otherwise.
 * @param val a value that is maybe an ID
 * @returns ID
 */
export function ID(val: any): ID {
  const id = maybeID(val);
  if (id == null) {
    throw new InvalidInputError({
      debugMessage: `Passed param was not an ID, received: ${val}.`,
    });
  }
  return id;
}