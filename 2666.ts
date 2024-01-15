type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type OnceFn = (...args: JSONValue[]) => JSONValue | undefined;

function once(fn: Function): OnceFn {
  let target: Function | undefined = fn;
  return function (...args) {
    if (target !== undefined) {
      const result = target(...args);
      target = undefined;
      return result;
    }
    return target;
  };
}
