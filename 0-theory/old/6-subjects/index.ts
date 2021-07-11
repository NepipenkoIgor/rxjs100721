// import '../../assets/css/style.css';
// import { terminalLog } from '../../utils/log-in-terminal';
// import { Component2 } from './2.component';
// import { Component1 } from './1.component';
// import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
//
// // Subject = Observarble + Observer;
// //
// // new Component2();
// // new Component1();
//
//
// // const sequence$ = new BehaviorSubject(1);
// // sequence$.subscribe((v) => {
// //     terminalLog(`Sub1 => ${v}`);
// // })
// // sequence$.complete();
// // sequence$.next(2);
// // sequence$.next(3);
// // sequence$.next(4);
// //
// // console.log(sequence$.value)
// //
// // sequence$.subscribe((v) => {
// //     terminalLog(`Sub2 => ${v}`);
// // })
//
// // const sequence$ = new ReplaySubject(undefined, 2000);
// // sequence$.subscribe((v) => {
// //     terminalLog(`Sub1 => ${v}`);
// // })
// // sequence$.next(2);
// // sequence$.next(3);
// // setTimeout(()=>{
// //     sequence$.next(4);
// // },500)
// // setTimeout(()=>{
// //     sequence$.next(4);
// // },1000)
// // setTimeout(()=>{
// //     sequence$.subscribe((v) => {
// //         terminalLog(`Sub2 => ${v}`);
// //     })
// // },1500)
// //
//
//
// // const sequence$ = new AsyncSubject();
// // sequence$.subscribe((v) => {
// //     terminalLog(`Sub1 => ${v}`);
// // })
// // sequence$.next(2);
// // sequence$.next(3);
// // sequence$.next(4);
// //
// // sequence$.subscribe((v) => {
// //     terminalLog(`Sub2 => ${v}`);
// // })
// //
// // //sequence$.complete();
// //
// // setTimeout(()=>{
// //     sequence$.subscribe((v) => {
// //         terminalLog(`Sub3 => ${v}`);
// //     })
// // }, 1000)
//
//
// function getUsers(url: string) {
//     let subjectSubscriber: AsyncSubject<any>;
//     return new Observable(subscriber => {
//         if (!subjectSubscriber) {
//             subjectSubscriber = new AsyncSubject();
//             ajax({
//                 url,
//                 method: 'GET',
//                 crossDomain: true
//             }).subscribe(subjectSubscriber)
//         }
//         // subscriber.next()
//         return subjectSubscriber.subscribe(subscriber);
//     })
// }
//
// const users = getUsers('http://learn.javascript.ru/courses/groups/api/participants?key=1g74qlq');
//
//
// users.subscribe((v) => {
//     console.log(v);
// })
//
// setTimeout(() => {
//     users.subscribe((v) => {
//         console.log(v);
//     })
// }, 5000)
