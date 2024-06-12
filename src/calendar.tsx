import { render } from 'inferno';
import CalendarContainer from './components/calendar_container';


render(<CalendarContainer location={window.location} history={window.history}/>, document.getElementById('app-root'));
