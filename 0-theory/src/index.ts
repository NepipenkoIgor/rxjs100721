import '../../assets/css/style.css'
import { terminalLog } from '../../utils/log-in-terminal';
import { interval, Observable, pluck, Subscriber, Subscription } from 'rxjs';
// Subject = Observable + Observer
terminalLog('Теория')

// const sequence = new Promise<number>((res) => {
//     let count = 1;
//     setInterval(() => {
//         res(count++);
//     }, 1000)
// });
//
// sequence.then((v) => terminalLog(v.toString()));
// sequence.then((v) => terminalLog(v.toString()));
// sequence.then((v) => terminalLog(v.toString()));


// const sequence = function* () {
//     let count = 1;
//     while (true) {
//         yield  count++;
//     }
// }();
//
// terminalLog(sequence.next().value.toString());
// terminalLog(sequence.next().value.toString());
// terminalLog(sequence.next().value.toString());
// terminalLog(sequence.next().value.toString());
// terminalLog(sequence.next().value.toString());
// terminalLog(sequence.next().value.toString());

//
// interval(1000)
//     .subscribe({
//         next: (v) => {
//             terminalLog(v.toString());
//         }
//     })

// let count = 1;
//
// const sequence$ = new Observable((subscriber: Subscriber<number>) => {
//     terminalLog('Observable init');
//     const intId = setInterval(() => {
//         console.log(count);
//         if (count % 5 === 0) {
//             clearInterval(intId);
//             subscriber.complete();
//         }
//         subscriber.next(count++);
//     }, 1000)
//
//     return () => {
//         terminalLog('UnSubscribe');
//         clearInterval(intId);
//     }
// });
//
// let sub: Subscription;
// setTimeout(() => {
//     sub = sequence$.subscribe({
//         next: (v) => {
//             terminalLog(`Sub 1 ${v}`);
//         },
//         complete: () => {
//             terminalLog('Completed');
//         }
//     })
// }, 5000)
// setTimeout(() => {
//     sequence$.subscribe({
//         next: (v) => {
//             terminalLog(`Sub 2 ${v}`);
//         },
//         complete: () => {
//             terminalLog('Completed');
//         }
//     });
// }, 7000)
// setTimeout(() => {
//     sub.unsubscribe();
// }, 9000)
//


const socket: WebSocket = new WebSocket('wss://echo.websocket.org');

const sequence$ = new Observable((subscriber: Subscriber<any>) => {
    function listener(e: Event) {
        subscriber.next(e);
    }

    socket.addEventListener('message', listener);
    return () => {
        socket.removeEventListener('message', listener);
    }
});

socket.addEventListener('open', main)


function main() {
    let count = 0;
    debugger;
    setInterval(() => {
        socket.send((count++).toString());
    }, 2000);

    const sub1 = sequence$
        .pipe(pluck('data'))
        .subscribe({
            next: (v) => {
                terminalLog(`Sub 1 ==> ${v}`);
            },
            complete: () => {
                terminalLog('Completed');
            }
        })

    setTimeout(() => {
        const sub2 = sequence$
            .pipe(pluck('data'))
            .subscribe({
                next: (v) => {
                    terminalLog(`Sub 2 ==> ${v}`);
                },
                complete: () => {
                    terminalLog('Completed');
                }
            })
    }, 5000)
}
