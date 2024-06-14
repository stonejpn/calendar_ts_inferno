import { Component } from "inferno";
import CalendarHeader from "./calendar_header"

type CalendarProps = {
  year: number,
  month: number,
  weekStartDate: string,
  viewType: string,
}

export default class Calendar extends Component<CalendarProps> {
  constructor(props: CalendarProps) {
    super(props);
  }

  render(props: CalendarProps) {
    return (
      <div className="calendar">
        <CalendarHeader weekStartDate={props.weekStartDate}/>
      </div>
    )
  }
}
