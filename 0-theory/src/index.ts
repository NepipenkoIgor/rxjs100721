import { filter, interval, map, Observable, pipe, skip, Subscriber, take, takeUntil } from 'rxjs';
import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';

// function doNothing<T>(source: Observable<T>) {
//     return source;
// }
//
// function toText<T>(source: Observable<T>) {
//     return new Observable((subscriber => {
//         subscriber.next('Rx JS Awesome');
//         subscriber.complete();
//     }));
// }
//

// function double(source: Observable<any>) {
//     return new Observable(subscriber => {
//         source.subscribe({
//             next: (v) => subscriber.next(v * 2),
//             error: (e) => subscriber.error(e),
//             complete: () => subscriber.complete(),
//         })
//     })
// }
//
//
// interval(2000)
//     .pipe(
//         skip(2),
//         double,
//         take(2)
//     )
//     .subscribe({
//         next: (v: any) => {
//             terminalLog(v);
//         }, complete: () => terminalLog('Completed')
//     })

//
// const o$ = new Observable();
// o$.source = interval(1000);
// o$.operator = {
//     call(subscriber: Subscriber<any>, source: any) {
//         source.subscribe(subscriber)
//     }
// }
//
// o$.subscribe((v: any) => {
//     terminalLog(v);
// })

// class DoubleSubscriber extends Subscriber<any> {
//     override next(value: any) {
//         super.next(value * 2);
//     }
// }
//
// const double = (source: Observable<any>) => {
//     return source.lift({
//         call(subscriber: Subscriber<any>, source: any) {
//             source.subscribe(new DoubleSubscriber(subscriber))
//         }
//     })
// }


// interval(1000)
//     .pipe(double)
//     .subscribe((v: any) => {
//         terminalLog(v);
//     })


// const groupOperators = (...fns: Function[]) => (source: Observable<any>) => fns.reduce((s, fn) => fn(s), source);

const myOperator = pipe(map((x: any) => x * 2), filter((x: any) => x % 3 === 0));


interval(1000)
    .pipe(myOperator)
    .subscribe((v) => terminalLog(v))


/*
  --1--2--3--4--5--6--7--8--9--
  skipLimit(2,2)
  --------3--4--------7--8----
 */
