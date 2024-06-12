import { Component} from "inferno";
import { WeekStartDate, WeekStartDateChangedCallback } from "./calendar_container";

interface ISwitcherProps {
  weekStartDate: string,
  onChanged: WeekStartDateChangedCallback,
}

type SwitcherState = {
  weekStartDate: string,
  onChanged: WeekStartDateChangedCallback,
}

export default class Switcher extends Component<ISwitcherProps> {
  state: SwitcherState;

  constructor(props: ISwitcherProps) {
    super(props);

    this.state = {
      weekStartDate: props.weekStartDate,
      onChanged: props.onChanged
    }
  }

  /**
   * 画面上でラジオボタンの値が変わった
   *
   * @param weekStartDate string
   */
  changed(weekStartDate:string) {
    this.setState({weekStartDate});
    this.state.onChanged(weekStartDate);
  }

  render() {
    const sunday_checked = (this.state.weekStartDate == WeekStartDate.Sunday);
    const monday_checked = (this.state.weekStartDate == WeekStartDate.Monday);

    return (
      <form className="switcher">
        <label><input type="radio" name="week_start_date" value={WeekStartDate.Sunday}
                      checked={sunday_checked}
                      onChange={(event) => this.changed(event.target.value)}/>日曜はじまり</label>
        <label><input type="radio" name="week_start_date" value={WeekStartDate.Monday}
                      checked={monday_checked}
                      onChange={(event) => this.changed(event.target.value)}/>月曜はじまり</label>
      </form>
    );
  }
}
