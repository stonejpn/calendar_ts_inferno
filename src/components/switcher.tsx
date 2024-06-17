import {Component, FormEvent} from "inferno";
import { WeekStartDate } from "../common_types";
import { WeekStartDateChangedCallback } from "./calendar_container";

type SwitcherProps = {
  weekStartDate: string,
  onChanged: WeekStartDateChangedCallback
}

type SwitcherState = {
  weekStartDate: string,
}

export default class Switcher extends Component<SwitcherProps, SwitcherState> {
  state: SwitcherState;

  constructor(props: SwitcherProps) {
    super(props);

    this.state = {
      weekStartDate: props.weekStartDate,
    }
  }

  handleChangeEvent(event: FormEvent<HTMLInputElement>) {
    this.setState({weekStartDate: event.target.value});
    this.props.onChanged(event.target.value);
  }

  // @ts-expect-error TS6133: 'props' is declared but its value is never read.
  render(props: SwitcherProps, state: SwitcherState) {
    const sunday_checked = (state.weekStartDate == WeekStartDate.Sunday);
    const monday_checked = (state.weekStartDate == WeekStartDate.Monday);

    return (
      <form className="switcher">
        <label>
          <input type="radio" name="week_start_date" value={WeekStartDate.Sunday}
                 checked={sunday_checked} onChange={this.handleChangeEvent.bind(this)}/>日曜はじまり
        </label>
        <label>
          <input type="radio" name="week_start_date" value={WeekStartDate.Monday}
                 checked={monday_checked} onChange={this.handleChangeEvent.bind(this)}/>月曜はじまり
        </label>
      </form>
    );
  }
}
