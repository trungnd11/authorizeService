export default class ArrayUtils {
  public static isNullOrEmpty(arr: unknown[] | null) {
    return (Array.isArray(arr) && arr.length === 0) || arr === null; 
  }

  public static isArray(arr: unknown) {
    return Array.isArray(arr);
  }
}