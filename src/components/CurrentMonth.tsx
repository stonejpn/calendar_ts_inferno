import { Component } from "inferno";
import {ViewType} from "../common_types";

type CurrentMonthProps = {
  year: number,
  month: number,
  viewType: string
}
export default class CurrentMonth extends Component<CurrentMonthProps> {
  constructor(props: CurrentMonthProps) {
    super(props)
  }

  render(props: CurrentMonthProps) {
    const today = new Date();
    if (props.viewType === ViewType.Month) {
      if (props.year === today.getFullYear() && props.month === (today.getMonth() + 1)) {
        return '';
      }
    }

    return (
      <div className="current-month"><a href="/">今月を表示</a></div>
    )
  }
}
