import { defer, filter, from, iif, interval, map, of, range, skip, take, tap } from 'rxjs';
import { terminalLog } from '../../utils/log-in-terminal';
import '../../assets/css/style.css';
import { ajax, AjaxResponse } from "rxjs/ajax";

// of(1, 2, 3)
//     .subscribe((v) => {
//         terminalLog(v);
//     })

// const request = fetch('http://learn.javascript.ru/courses/groups/api/participants?key=1g74qlq')
//     .then((res)=>res.json())
//
// from(request)
//     .subscribe((v) => {
//         console.log(v);
//     })


// const request = fetch('http://learn.javascript.ru/courses/groups/api/participants?key=1g74qlq')
//     .then((res) => res.json())
//
// ajax({
//     url: 'http://learn.javascript.ru/courses/groups/api/participants?key=1g74qlq',
//     method: 'GET',
//     crossDomain: true
// })
//     .subscribe((res: AjaxResponse<any>) => {
//         console.log(res.response);
//     })


// range(1, 10)
//     .subscribe((v) => {
//         terminalLog(v);
//     })
//

// const random = Math.round(Math.random() * 10);
// console.log(random);
// iif(() => {
//     return random > 5;
// }, of('First sequence'), of('Second sequence'))
//     .subscribe((v) => {
//         console.log(v);
//     })


// const random = Math.round(Math.random() * 10);
// console.log(random);
// defer(() => {
//   return   random > 5
//         ? of('First sequence')
//         : random > 2
//         ? of('Second sequence')
//         : of('Third sequence');
// })
//     .subscribe((v) => {
//         console.log(v);
//     })

const sequence1$ = interval(1000);

/*
   sequence1$  ---0---1---2---3---4---5---6---7---
           tap((x)=>{console.log(x); return 0})
               ---0---1---2---3---4---5---6---7---
           filter((x)=>x%3 ===0)
               ---0-----------3-----------6-------
           map((x)=> x*2)
               ---0-----------6-----------12------
           skip(1);
               ---------------6-----------12------
           take(2)
               ---------------6-----------12|
 */


sequence1$
    .pipe(
        tap((x) => {
            console.log(x);
            return 0
        }),
        filter((x) => x % 3 === 0),
        map((x) => x * 2),
        skip(1),
        take(2)
    )
    .subscribe({
        next: (v) => {
            terminalLog(v);
        }, complete: () => {
            terminalLog('Completed')
        }
    })
