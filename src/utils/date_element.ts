export default class DateElement {
  date: number|null;
  day_of_week: number|null;
  holiday: string|null;

  constructor(date: number|null, day_of_week: number|null, holiday: string|null) {
    this.date = date;
    this.day_of_week = day_of_week;
    this.holiday = holiday;
  }

  className() {
    const class_name:string[] = ['date'];

    if (this.day_of_week === 0) {
      class_name.push('sunday');
    } else if (this.day_of_week === 6) {
      class_name.push('saturday');
    }
    if (this.holiday !== null) {
      class_name.push('holiday');
    }
    return class_name.join(' ');
  }

  isHoliday() {
    return (this.holiday !== null);
  }
}
