// import {
//     concatMap,
//     filter, fromEvent,
//     interval,
//     map, mergeMap,
//     Observable,
//     of,
//     pipe, pluck,
//     skip,
//     Subscriber,
//     switchAll,
//     switchMap,
//     take,
//     takeUntil,
//     exhaustMap
// } from 'rxjs';
// import '../../assets/css/style.css';
// import { terminalLog } from '../../utils/log-in-terminal';
// import { ajax } from 'rxjs/ajax';
// import { from } from 'rxjs';
//
// const inputEl = document.querySelector('input') as HTMLInputElement;
// const sequence$ = fromEvent(inputEl, 'input')
//     .pipe(
//         pluck('target', 'value'),
//         switchMap((value) => {
//             // return ajax({
//             //     url: `http://learn.javascript.ru/courses/groups/api/participants?key=1g74qlq&text=${value}`,
//             //     method: 'GET',
//             //     crossDomain: true
//             // })
//             return from(fetch(`http://learn.javascript.ru/courses/groups/api/participants?key=1g74qlq&text=${value}`))
//         }),
//         //switchAll()
//
//         // map + switchAll = switchMap
//         // map + mergeAll = mergeMap
//         // map + concatAll = concatMap
//         // map + exhaustMap =  exhaustMap
//     );
//
//
// sequence$.subscribe((v) => {
//     console.log(v);
// })
