export default interface PageResponse<T> {
  doc: T
  totalDocs: number
  totalPages?: number
}