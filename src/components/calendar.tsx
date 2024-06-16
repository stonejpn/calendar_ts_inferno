import { Component } from "inferno";
import { CalendarInfo } from "../common_types";
import CalendarHeader from "./calendar_header"
import CalendarBody from "./calendar_body";

export default class Calendar extends Component<CalendarInfo> {
  constructor(props: CalendarInfo) {
    super(props);
  }

  render(props: CalendarInfo) {
    return (
      <div className="calendar">
        <CalendarHeader weekStartDate={props.weekStartDate}/>
        <CalendarBody {...props} />
      </div>
    )
  }
}
