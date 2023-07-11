export const Types = {
  String: String(),
  Number: Number(),
  Object: Object() as object,
  Array: Array(),
  Undefined: undefined,
  Boolean: Boolean(),
  Function: Function(),
  Null: Object(),
  Map: new Map(),
  Set: new Set(),
};

export const getType = (value: unknown) => Object.prototype.toString.call(value);

/**
 * Check if the value is native object.
 * @access private
 * @param value The value to check
 * @returns {String} Returns true if the value is native object, false otherwise.
 */
export function isNativeObject(value: unknown) {
  return getType(value) === '[object Object]';
}
