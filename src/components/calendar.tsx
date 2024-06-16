import { Component } from "inferno";
import {CalendarInfo, ViewType} from "../common_types";
import CalendarHeader from "./calendar_header"
import CalendarBody from "./calendar_body";

export default class Calendar extends Component<CalendarInfo> {
  constructor(props: CalendarInfo) {
    super(props);
  }

  render(props: CalendarInfo) {
    if (props.viewType === ViewType.Month) {
      return (
        <div className="calendar">
          <CalendarHeader weekStartDate={props.weekStartDate}/>
          <CalendarBody {...props} />
        </div>
      )
    } else if (props.viewType === ViewType.Year) {
      const row_list = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12]
      ];
      return (
        <div className="calendar">
          {
            row_list.map((month_list:number[], i:number) => {
              return (
                <div className="calendar-row" key={i}>
                  {
                    month_list.map((month) => {
                      return (
                        <div className="month-wrapper" key={month}>
                          <div className="month-label"><a href={`#/${props.year}/${month}`}>{month}月</a></div>
                          <CalendarBody year={props.year} month={month} weekStartDate={props.weekStartDate}
                                        viewType={props.viewType}/>
                        </div>
                      )
                    })
                  }
                </div>
              );
            })
          }
        </div>
      );
    }
  }
}
