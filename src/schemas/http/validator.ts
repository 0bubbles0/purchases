import Ajv, { AnySchema } from "ajv";
import addFormats from "ajv-formats";
import { Error400Invalid } from "./errors";

export const validator = <T>(input: T, schema: AnySchema) => {
  const ajv = new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    useDefaults: "empty",
  });

  addFormats(ajv);

  const validate = ajv.compile<T>(schema);

  const pass = validate(input);
  if (!pass) {
    throw new Error400Invalid();
  }
  return input as T;
};
