import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';

import {
    from,
    of,
    combineLatest,
    map,
    asap,
    asapScheduler,
    scheduled,
    Subject,
    take,
    observeOn,
    queueScheduler, subscribeOn, tap, asyncScheduler
} from 'rxjs';
// null, asap, async, queue
// console.log('start');
// setTimeout(() => {
//     console.log('time1');
// })
// setTimeout(() => {
//     console.log('time2');
// })
// Promise.resolve().then(() => console.log('prom1'));
// Promise.resolve().then(() => console.log('prom2'));
// console.log('end');

/*
     ---()-----()------()----------------------------
        start   time1  time2
        end
        prom1
        prom2
 */


// const a$ = scheduled([1, 2], asapScheduler);
// const b$ = of(10);
//
// console.log('start');
// a$.subscribe(v => console.log(v));
// console.log('end');
//
// const c$ = combineLatest([a$, b$])
// c$
//     .pipe(map(([x, y]) => x + y))
//     .subscribe(v => {
//         terminalLog(v);
//     })


// const signal = new Subject();
// let count = 0;
// const someCalc = (count: number) => console.log('do some calc', count);
//
// signal
//     .pipe(
//         take(1600),
//         observeOn(queueScheduler)
//     )
//     .subscribe(() => {
//         someCalc(count);
//         signal.next(count++)
//     })
// signal.next(count++);
// console.log('STOP');

console.log('start');
from([1, 2, 3, 4, 5, 6, 7])
    .pipe(
        tap((v) => {
            console.log('tap1', v)
        }),
        observeOn(asyncScheduler),
        tap((v) => {
            console.log('tap2', v)
        })
    ).subscribe((v) => {
    setTimeout(() => {
        console.log('subscribe time', v);
    })
    Promise.resolve().then(() => console.log('subscribe prom', v));
})
console.log('end');
