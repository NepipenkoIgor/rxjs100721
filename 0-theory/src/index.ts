import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';
import { connectable, ConnectableObservable, interval, multicast, publish, refCount, share, Subject } from 'rxjs';

// const sequence = interval(1000)
//     .pipe(
//         share()
//     );

// const sequence = connectable(interval(1000), {
//     connector: ()=> new Subject()
// })

const sequence = interval(1000)
    .pipe(share({
        connector: () => new Subject(),
        resetOnRefCountZero: false
    }))

const sub = sequence
    .subscribe((v) => {
        terminalLog(`Sub1 => ${v}`);
    })

setTimeout(() => {
    sub.unsubscribe();
}, 3000)

setTimeout(() => {
    sequence
        .subscribe((v) => {
            terminalLog(`Sub2 => ${v}`);
        })
}, 5000)

// setInterval(() => {
//     sequence.connect();
// }, 2000)
