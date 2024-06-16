import { Component } from "inferno";
import { CalendarInfo, WeekStartDate } from "../common_types";
import DateElement from "../utils/date_element"

const DayCountList = [
  0,
  31, 0, 31, 30, /* １，２，３，４月 */
  31, 30, 31, 31, /* ５，６，７，８月 */
  30, 31, 30, 31 /* ９、１０、１１，１２月 */
]

export default class CalendarBody extends Component<CalendarInfo> {
  start_day_of_week: number|null = null;
  date_count: number|null = null;
  matrix: DateElement[] = [];

  constructor(props:CalendarInfo) {
    super(props);
  }

  componentWillMount() {
    this.createMatrix(this.props);
  }

  componentWillUpdate(nextProps: CalendarInfo) {
    this.createMatrix(nextProps);
  }

  render() {
    const weeks :number[] = [];
    for (let i = 0; i < (this.matrix.length / 7); i++) {
      weeks.push(i);
    }

    return (
      <div className="calendar-body">
        {
          weeks.map((week) => {
            return <div className="week" key={week}>
              {
                this.matrix.slice(week * 7, week * 7 + 7).map((element:DateElement) => {
                  let class_name = 'date';
                  if (element.day_of_week === 0) {
                    class_name += ' sunday';
                  } else if (element.day_of_week === 6) {
                    class_name += ' saturday';
                  }
                  return (
                    <div className={class_name} key={element.id}>
                      <p>{element.date}</p>
                      <p className="holiday">{element.holiday !== null ? element.holiday : <br/>}</p>
                    </div>
                  )
                })
              }
            </div>
          })
        }
      </div>
    );
  }

  private createMatrix(props:CalendarInfo) {
    /**
     * 表示する月の日数を決定する
     */
    if (props.month === 2) {
      // ３月１日の前日が２月の末日
      const march1 = new Date(props.year, 3, 1);
      const february_last_date = new Date((march1.getTime() / 1000) - 86400);

      this.date_count = february_last_date.getDate();
    } else {
      this.date_count = DayCountList[props.month]
    }

    /**
     * 当月１日の曜日
     */
    const first_date = new Date(props.year, props.month - 1, 1);
    this.start_day_of_week = first_date.getDay();

    /**
     * マトリックスを作成
     */
    let id = 1;
    const filler_count = (props.weekStartDate === WeekStartDate.Sunday)
      ? this.start_day_of_week : (this.start_day_of_week + 6) % 7;

    this.matrix = [];
    for (let i = 0; i < filler_count; i++) {
      this.matrix.push(new DateElement(id, null, null, null));
      id++;
    }
    for (let date = 1; date <= this.date_count; date++) {
      this.matrix.push(new DateElement(id, date, (this.start_day_of_week + date - 1) % 7, null));
      id++;
    }
    while ((this.matrix.length) % 7) {
      this.matrix.push(new DateElement(id, null, null, null));
      id++;
    }
  }
}
