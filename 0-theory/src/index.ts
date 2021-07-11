import '../../assets/css/style.css';
import { catchError, delay, EMPTY, interval, map, of, retry, retryWhen, switchMap, tap, zip } from 'rxjs';
import { terminalLog } from '../../utils/log-in-terminal';

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');

const sequence$ = zip(sequence1$, sequence2$);

// sequence$.pipe(
//     map(([, y]) => {
//         return (y as any).toUpperCase();
//         // try {
//         //     return (y as any).toUpperCase();
//         // } catch (err) {
//         //     return 'N'
//         // }
//     }),
//     // tap(()=> terminalLog('before catch')),
//     // retry(3),
//     retryWhen((errors)=> errors.pipe(delay(3000))),
//     catchError((err, obs)=>{
//         return  obs;
//     }),
//     // tap(()=> terminalLog('after catch'))
// )
sequence$.pipe(
    switchMap(([, y]) => {
        return of(y)
            .pipe(
                map((y) => {
                    return (y as any).toUpperCase();
                }),
                catchError((err, obs) => {
                    return EMPTY;
                }),
            )
    }),
)
    .subscribe({
        next: (v) => terminalLog(v),
        error: (err) => console.log(err),
        complete: () => terminalLog('Completed')
    })
