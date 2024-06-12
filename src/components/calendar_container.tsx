import { Component } from "inferno";
import Navigator from "./navigator";
import Switcher from './switcher';

interface ICalendarProps {
  location: Location
  history: History
}

export const WeekStartDate = {
  Sunday: "sunday",
  Monday: "monday",
} as const;

export const ViewType = {
  Month: "month",
  Year: "year",
} as const;

type CalendarContainerState = {
  year: number,
  month: number,
  weekStartDate: string,
  viewType: string,
}

// eslint-disable-next-line no-unused-vars
export type WeekStartDateChangedCallback = (weekStartDate: string) => void;

export default class CalendarContainer extends Component<ICalendarProps> {
  state: CalendarContainerState;

  constructor(props: ICalendarProps) {
    super(props);

    const today = new Date();

    this.state = {
      year: today.getFullYear(),
      month: today.getMonth(),
      weekStartDate: WeekStartDate.Sunday,
      viewType: ViewType.Month
    }
  }

  weekStartDateChanged(weekStartDate :string) {
    this.setState({weekStartDate});
    console.log('weekStartDateChanged: ' + weekStartDate);
  }

  render() {
    return (
      <div className="calendar-container">
        <h1 className="title">{this.state.year}年 {this.state.month}月</h1>
        <Navigator year={this.state.year} month={this.state.month} viewType={this.state.viewType} />
        <Switcher weekStartDate={this.state.weekStartDate} onChanged={this.weekStartDateChanged.bind(this)}/>
      </div>
    );
  }
}
