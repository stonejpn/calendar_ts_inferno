export default class DateElement {
  id: number;
  date: number|null;
  day_of_week: number|null;
  holiday: string|null;

  constructor(id:number, date: number|null, day_of_week: number|null, holiday: string|null) {
    this.id = id;
    this.date = date;
    this.day_of_week = day_of_week;
    this.holiday = holiday;
  }
}
