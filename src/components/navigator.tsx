import { Component } from "inferno";
import { ViewType } from "../common_types";

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
    return (
      <div className="navigator">
        <div className="prev">{this.previousLink(props.year, props.month, props.viewType)}</div>
        <div className="curr">{this.currentLink(props.year, props.month, props.viewType)}</div>
        <div className="next">{this.nextLink(props.year, props.month, props.viewType)}</div>
      </div>
    );
  }

  previousLink(year:number, month:number, view_type:string) {
    if (view_type === ViewType.Month) {
      month--;
      if (month < 1) {
        year--;
        month += 12;
      }

      if (year >= 2015) {
        const link = `#/${year}/${month}`;
        return <a id='navi-prev' href={link}>&lt;&lt;前の月</a>;
      }
    } else if (view_type === ViewType.Year) {
      year--;
      if (year >= 2015) {
        const link = `#/${year}`;
        return <a id='navi-prev' href={link}>&lt;&lt;前の年</a>;
      }
    }
  }

  // @ts-expect-error TS6133: 'month' is declared but its value is never read.
  currentLink(year:number, month:number, view_type:string) {
    if (view_type === ViewType.Month) {
      return <a id='navi-curr' href={`#/${year}`}>年間カレンダー</a>
    }
  }

  nextLink(year:number, month:number, view_type:string) {
    if (view_type === ViewType.Month) {
      month++;
      if (month > 12) {
        year++;
        month -= 12;
      }

      if (year <= 2034) {
        const link = `#/${year}/${month}`;
        return <a id='navi-next' href={link}>次の月&gt;&gt;</a>;
      }
    } else if (view_type === ViewType.Year) {
      year++;
      if (year <= 2034) {
        const link = `#/${year}`;
        return <a id='navi-next' href={link}>次の年&gt;&gt;</a>;
      }
    }
  }
}
