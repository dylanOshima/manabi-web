import { InvalidInputError } from "../errors/InvalidInputError";

/**
 * Validates if a value is null. If it is then we throw,
 * otherwise we return a nonnull value.
 */
export default function nullOrThrow<T>(value: T | null | undefined): T {
  if(value == null) {
    throw new InvalidInputError({
      debugMessage: `Value was null when nonnull was expected.`,
    });
  }
  return value;
}