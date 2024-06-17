import { Component } from "inferno";
import { WeekStartDate, ViewType, CalendarInfo } from "../common_types";
import Navigator from "./navigator";
import Switcher from './switcher';
import Calendar from "./calendar";
import CurrentMonth from "./current_month";

type CalendarAppProps = {
  hash: string
}

interface CalendarContainerState extends CalendarInfo {
  error: Error|null;
}
// eslint-disable-next-line no-unused-vars
export type WeekStartDateChangedCallback = (weekStartDate: string) => void;

class UnsupportedError extends Error {}

export default class CalendarContainer extends Component<CalendarAppProps> {
  state: CalendarContainerState;

  constructor(props: CalendarAppProps) {
    super(props);

    const today = new Date();

    this.state = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      weekStartDate: WeekStartDate.Sunday,
      viewType: ViewType.Month,
      error: null
    }
  }

  componentDidMount() {
    // constructorの時点で、parseHashしても画面は変わらない
    // didMountのタイミングで、ハッシュを調べる
    if (this.props.hash !== '') {
      this.parseHash(this.props.hash);
    }

    window.addEventListener('hashchange', this.hashChanged.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.hashChanged.bind(this));
  }

  weekStartDateChanged(weekStartDate: string) {
    this.setState({weekStartDate});
  }

  hashChanged(event: HashChangeEvent) {
    const url = new URL(event.newURL);
    this.parseHash(url.hash);
  }

  parseHash(hash: string) {
    const [, year_str, month_str,] = hash.split('/');

    if (year_str === undefined) {
      // '/'が指定された --> 今月を表示
      const today = new Date();

      this.setState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        viewType: ViewType.Month
      });
    } else {
      const year = parseInt(year_str);
      if (isNaN(year) || year < 2015 || year > 2034) {
        this.setState({error: new UnsupportedError('表示範囲外の年月が指定されました (year)')})
        return;
      }

      if (month_str === undefined) {
        // '#/year' 年だけ指定された
        this.setState({
          year: year,
          viewType: ViewType.Year
        });
      } else {
        // '#/year/month' 月まで指定された
        const month = parseInt(month_str);
        if (isNaN(month) || month < 1 || month > 12) {
          this.setState({error: new UnsupportedError('表示範囲外の年月が指定されました (month)')});
          return;
        }

        this.setState({
          year: year,
          month: month,
          viewType: ViewType.Month
        });
      }
    }
  }

  // @ts-expect-error TS6133: 'props' is declared but its value is never read.
  render(props: CalendarAppProps, state: CalendarContainerState) {
    if (state.error != null) {
      return (
        <div className="error">{state.error.message}</div>
      )
    }

    let view_type_class :string = 'calendar-container';
    if (state.viewType === ViewType.Month) {
      view_type_class += ' calendar-month'
    } else if (state.viewType === ViewType.Year) {
      view_type_class += ' calendar-year'
    }

    let title = `${state.year}年`;
    if (state.viewType === ViewType.Month) {
      title += ` ${state.month}月`;
    }

    return (
      <div className={view_type_class}>
        <h1 className="title">{title}</h1>
        <CurrentMonth year={state.year} month={state.month} viewType={state.viewType} />
        <Navigator
          year={state.year}
          month={state.month}
          viewType={state.viewType}
        />
        <Switcher
          weekStartDate={state.weekStartDate}
          onChanged={this.weekStartDateChanged.bind(this)}
        />
        <Calendar {...state} />
      </div>
    );
  }
}
