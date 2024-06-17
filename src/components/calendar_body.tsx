import { Component } from "inferno";
import { CalendarInfo, WeekStartDate } from "../common_types";
import DateElement from "../utils/date_element"
import Holidays from "../utils/holidays";

const DayCountList = [
  0,
  31, 0, 31, 30, /* １，２，３，４月 */
  31, 30, 31, 31, /* ５，６，７，８月 */
  30, 31, 30, 31 /* ９、１０、１１，１２月 */
];

type Week = DateElement[];

export default class CalendarBody extends Component<CalendarInfo> {
  start_day_of_week: number|null = null;
  date_count: number|null = null;
  matrix: Week[] = [];
  holidays: Holidays;

  constructor(props:CalendarInfo) {
    super(props);

    this.holidays = new Holidays();
  }

  componentWillMount() {
    this.createMatrix(this.props);
  }

  componentWillUpdate(nextProps: CalendarInfo) {
    this.createMatrix(nextProps);
  }

  render() {
    return (
      <div className="calendar-body">
        {
          this.matrix.map((week: Week, i: number) => {
            return (
              <div className="week" key={i}>
                {
                  week.map((date: DateElement, j: number) => {
                    return (
                      <div className={date.className()} key={j}>
                        <p>{date.date}</p>
                        <p className="holiday">{date.isHoliday() ? date.holiday : <br/>}</p>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }

  private createMatrix(props:CalendarInfo) {
    // 月の日数
    if (props.month === 2) {
      // ３月１日の前日が２月の末日
      const march1 = new Date(props.year, 2, 1);
      const february_last_date = new Date(march1.getTime() - 86400000); // getTimeはミリ秒

      this.date_count = february_last_date.getDate();
    } else {
      this.date_count = DayCountList[props.month]
    }

    // 当月１日の曜日
    const first_date = new Date(props.year, props.month - 1, 1);
    this.start_day_of_week = first_date.getDay();

    /**
     * マトリックスを作成
     */
    const raw_matrix: DateElement[] = []

    // 「１日」まで空白マスで埋める
    const filler_count = (props.weekStartDate === WeekStartDate.Sunday)
      ? this.start_day_of_week : (this.start_day_of_week + 6) % 7;
    for (let i = 0; i < filler_count; i++) {
      raw_matrix.push(new DateElement(null, null, null));
    }

    // 日付マス
    for (let date = 1; date <= this.date_count; date++) {
      raw_matrix.push(new DateElement(
        date,
        (this.start_day_of_week + date - 1) % 7,
        this.holidays.getHoliday(props.year, props.month, date)
      ));
    }

    // 週の最後まで空白マスで埋める
    while ((raw_matrix.length) % 7) {
      raw_matrix.push(new DateElement(null, null, null));
    }

    // 週ごとに切り分けて、this.matrixに格納する
    this.matrix = [];
    while (raw_matrix.length > 0) {
      const week: Week = raw_matrix.splice(0, 7);
      this.matrix.push(week);
    }
  }
}
