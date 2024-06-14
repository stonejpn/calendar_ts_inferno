import { Component } from "inferno";
import Navigator from "./navigator";
import Switcher from './switcher';
import Calendar from "./calendar";

type CalendarAppProps = {
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

export default class CalendarContainer extends Component<CalendarAppProps> {
  state: CalendarContainerState;

  constructor(props: CalendarAppProps) {
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
  }

  // @ts-expect-error TS6133: 'props' is declared but its value is never read.
  render(props: CalendarAppProps, state: CalendarContainerState) {
    let view_type_class :string = 'calendar-container';
    if (state.viewType === ViewType.Month) {
      view_type_class += ' calendar-month'
    } else if (state.viewType === ViewType.Year) {
      view_type_class += ' calendar-year'
    }

    return (
      <div className={view_type_class}>
        <h1 className="title">{state.year}年 {state.month}月</h1>
        <Navigator year={state.year} month={state.month} viewType={state.viewType} />
        <Switcher
          weekStartDate={state.weekStartDate}
          onChanged={this.weekStartDateChanged.bind(this)}
        />
        <Calendar {...state} />
      </div>
    );
  }
}
