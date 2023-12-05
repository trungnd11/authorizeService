import dayjs from "dayjs";

export default class DateUtils {
  public static formatDateToString(date: Date) {
    return dayjs(date).format("DD/MM/YYYY")
  }
}