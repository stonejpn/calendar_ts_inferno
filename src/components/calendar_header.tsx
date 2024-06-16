import { Component } from "inferno";
import { WeekStartDate } from "../common_types";

type CalendarHeaderProps = {
  weekStartDate: string
}

export default class CalendarHeader extends Component<CalendarHeaderProps> {
  constructor(props: CalendarHeaderProps) {
    super(props);
  }

  render(props: CalendarHeaderProps) {
    const day_of_weeks :string[] = ['月', '火', '水', '木', '金', '土'];

    switch (props.weekStartDate) {
      case WeekStartDate.Sunday:
        day_of_weeks.unshift('日');
        break;
      case WeekStartDate.Monday:
        day_of_weeks.push('日');
        break;
    }
    return (
      <div className="header">
        {
          (() => {
            const headers = [];
            for (const value of day_of_weeks) {
              let class_name = '';
              if (value === '日') {
                class_name = 'sunday';
              } else if (value === '土') {
                class_name = 'saturday';
              }

              headers.push(<div className={class_name}>{value}</div>)

            }
              return headers;
          })()
        }
      </div>
    )
  }
}
