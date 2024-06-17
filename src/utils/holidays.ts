import * as holidays_json from "../holidays.json";

type HolidaysJson = { [year: string]: { [date: string]: string } };

export default class Holidays {
  holidays: HolidaysJson;

  constructor() {
    this.holidays = holidays_json as HolidaysJson;
  }

  getHoliday(year: number, month: number, date: number): string|null {
    const year_list = this.holidays[year.toString()];
    const date_str = month.toString().padStart(2, '0') + date.toString().padStart(2, '0');

    return (year_list[date_str] !== undefined ? year_list[date_str] : null);
  }
}
