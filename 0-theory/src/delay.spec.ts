import { TestScheduler } from 'rxjs/testing';
import { delay } from './delay';
import { map } from 'rxjs';

describe('RxJS base test', () => {

    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })
    it('generate sequence correctly', () => {

        testScheduler.run((helpers) => {
            // TODO time ???
            const {cold, time, expectObservable} = helpers;
            const s1 = cold('-a--b--c--|', {a: 1, b: 10, c: 4});
           // const t = time('        --|    ');
            const expected = '    9000ms  -a--b--c--|';
            expectObservable(s1.pipe(delay(9000), map((x) => x * 2))).toBe(expected, {
                a: 2,
                b: 20,
                c: 8
            })
        })
    })
})
