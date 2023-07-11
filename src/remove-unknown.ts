import { isNativeObject, getType } from './helper';

export interface Options {
  strict: boolean;
}

/**
 * Remove unknown properties from an object. This function will mutate the orginal object.
 * @param {Object} obj The object to remove unknown properties from.
 * @param {Object} schema The schema for what object should look like.
 * @param {Object} options The options has strict property when set to true it will remove unknown properties and known properties that has different type.
 * @returns {void}
 * @example
 * ```ts
 * const student = {
 *  name:'adam',
 *  age:28,
 *  salary:1000 // unknown property
 * }
 * 
 * const schema = {
 *  name:String,
 *  age:Number
 * }
 * 
 * removeUnknown(student,schema);
 * console.log(student); => {name:'adam', age:28}
 * ```
 */
export function removeUnknown<O extends object, S extends object>(
  obj: O,
  schema: S,
  options?: Options,
): void {
  // throw error if obj parameter is not native object
  if (!isNativeObject(obj)) {
    throw new Error('Invalid obj parameter. obj parameter must be native object.');
  }

  // throw error if schema parameter is not native object
  if (!isNativeObject(schema)) {
    throw new Error('Invalid schema parameter. schema parameter must be native object.');
  }

  const strict = typeof options?.strict === 'boolean' ? options.strict : false;
  removeUnknownProperties(obj, schema, { strict });
  return;
}

/**
 * @access private
 */
function removeUnknownProperties<O extends object, S extends object>(
  obj: O,
  schema: S,
  options: Options,
): void {
  const { strict } = options;
  const objectKeys = Object.keys(obj) as (keyof typeof obj)[];
  const schemaKeys = Object.keys(schema) as (keyof typeof schema)[];
  const unknownKeys = [] as (keyof typeof obj)[];

  for (const key of objectKeys) {
    // check if schema has current key
    if (schemaKeys.includes(key as any)) {
      // if strict is true remove properties that not match in type with schema
      if (strict) {
        // @ts-ignore
        if (getType(obj[key]) !== getType(schema[key])) {
          unknownKeys.push(key);
          continue;
        }
      }
      // if the current property is object type recall removeUnknownProperties with current property
      // @ts-ignore
      if (isNativeObject(obj[key]) && isNativeObject(schema[key])) {
        // @ts-ignore
        removeUnknownProperties(obj[key], schema[key], options);
      }
    }
    // remove property if it not exists in schema
    else {
      unknownKeys.push(key);
    }
  }

  unknownKeys.forEach((key) => {
    delete obj[key];
  });

  return;
}
