export default class ObjectUtils {
  public static isEmpty(obj: Record<string, any> | null): boolean {
    if (obj === null) return true; 
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }
}