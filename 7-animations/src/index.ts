import '../../assets/css/style.css';
import './styles.css';
import { animationDown } from './animate';
import { terminalLog } from '../../utils/log-in-terminal';

const div = document.querySelector('.animated-shape') as HTMLDivElement;
animationDown(div)
    .subscribe({
        next: (frame) => terminalLog(`Coord: ${frame}`),
        complete: () => terminalLog('Completed')
    })
