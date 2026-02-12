/**
 * Simple object check.
 * @param item - The item to check
 * @returns {boolean} True if item is a plain object
 */
export function isObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target - The target object to merge into
 * @param sources - The source objects to merge from
 * @returns The merged object
 */
export function mergeDeep(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key of Object.keys(source)) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        if (isObject(sourceValue)) {
          if (!target[key]) {
            target[key] = {};
          }
          mergeDeep(target[key], sourceValue);
        } else {
          target[key] = sourceValue;
        }
      }
    }
  }
  return mergeDeep(target, ...sources);
}
