export const removeFields = (obj: { [x: string]: any; }, fields = ['_id', '__v']) => {
  for (let field of fields) {
    delete obj[field];
  }
  return obj;
}