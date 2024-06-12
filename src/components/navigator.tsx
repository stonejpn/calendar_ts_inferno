import { Component } from "inferno";
// import { ViewType } from "./calendar_container";

interface INavigatorProps {
  year: number,
  month: number,
  viewType: string,
}

type NavigatorState = {
  year: number,
  month: number,
  viewType: string,
}

export default class Navigator extends Component<INavigatorProps> {
  state: NavigatorState;

  constructor(props: INavigatorProps) {
    super(props);

    this.state = {
      year: props.year,
      month: props.month,
      viewType: props.viewType,
    }
  }

  render() {
    return (
      <div className="navigator">
        <div className="prev">前の年／月</div>
        <div className="curr">今月</div>
        <div className="next">前の年／月</div>
      </div>
    );
  }
}
