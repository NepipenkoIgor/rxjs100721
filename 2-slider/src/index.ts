import 'bootstrap';
import 'bootstrap-slider';
import '../../assets/css/style.css'
import './styles.css'
import { terminalLog } from '../../utils/log-in-terminal';
import { sendResult, sliders$ } from './slider';
import { fromEvent } from 'rxjs';

const btn = document.querySelector('#send-result') as HTMLButtonElement;
sendResult(fromEvent<MouseEvent>(btn, 'click'), sliders$)
    .subscribe(([, v]) => {
        terminalLog(`Send to server ===> ${v}`);
    })
