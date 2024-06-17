import { render } from 'inferno';
import CalendarContainer from './components/calendar_container';


render(
  <CalendarContainer hash={window.location.hash} />,
  document.getElementById('app-root')
);
