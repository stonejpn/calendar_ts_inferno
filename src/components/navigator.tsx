import { Component } from "inferno";
import { ViewType } from "./calendar_container";

type NavigatorProps = {
  year: number,
  month: number,
  viewType: string,
}

export default class Navigator extends Component<NavigatorProps> {
  constructor(props: NavigatorProps) {
    super(props);
  }

  render(props: NavigatorProps) {
    let prev_label: string = '';
    let curr_label: string = '';
    let next_label: string = '';

    if (props.viewType === ViewType.Month) {
      prev_label = '前の月';
      curr_label = '年間カレンダー';
      next_label = '次の月';
    } else if (props.viewType === ViewType.Year) {
      prev_label = '前の年';
      next_label = '次の年';
    }

    return (
      <div className="navigator">
        <div className="prev">{ prev_label }</div>
        <div className="curr">{ curr_label }</div>
        <div className="next">{ next_label }</div>
      </div>
    );
  }
}
