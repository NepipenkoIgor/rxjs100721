import '../../assets/css/style.css'
import { swipe$ } from './swipe';
import { terminalLog } from '../../utils/log-in-terminal';

swipe$.subscribe((v) => {
    if (v > 0) {
        terminalLog('Swipe right');
        return;
    }
    terminalLog('Swipe left');
})
