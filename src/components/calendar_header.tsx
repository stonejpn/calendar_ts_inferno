import { Component } from "inferno";
import { WeekStartDate } from "../common_types";

type CalendarHeaderProps = {
  weekStartDate: string
}

type DayOfWeek = {
  label: string,
  class_name: string
}

const DayOfWeeks:DayOfWeek[] = [
  {label: '日', class_name: 'sunday'},
  {label: '月', class_name: ''},
  {label: '火', class_name: ''},
  {label: '水', class_name: ''},
  {label: '木', class_name: ''},
  {label: '金', class_name: ''},
  {label: '土', class_name: 'saturday'},
]

export default class CalendarHeader extends Component<CalendarHeaderProps> {
  constructor(props: CalendarHeaderProps) {
    super(props);
  }

  render(props: CalendarHeaderProps) {
    const day_of_weeks = JSON.parse(JSON.stringify(DayOfWeeks)); // 一度JSONを経由させて、ディープコピーにする

    if (props.weekStartDate === WeekStartDate.Monday) {
      const sunday: DayOfWeek = day_of_weeks.shift();
      day_of_weeks.push(sunday);
    }
    return (
      <div className="header">
        {
          day_of_weeks.map((day: DayOfWeek, index: number) => {
            return <div className={day.class_name} key={index}>{day.label}</div>;
          })
        }
      </div>
    )
  }
}
