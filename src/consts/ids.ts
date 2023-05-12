/**
 * General purpose ID type.
 */
export type ID = number;

/**
 * Generate a new ID
 * @returns a six digit ID
 */
export const genID = (): ID => Math.floor(100000 + Math.random() * 900000);