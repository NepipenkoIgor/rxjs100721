import '../../assets/css/style.css'
import './skip-limit';
import { terminalLog } from '../../utils/log-in-terminal';
import { skipLimit } from './skip-limit';
import { fromEvent, interval, pluck } from 'rxjs';

fromEvent(document, 'click')
    .pipe(skipLimit(2, 3), pluck('clientX'))
    .subscribe((v: any) => {
        terminalLog(v);
    })
