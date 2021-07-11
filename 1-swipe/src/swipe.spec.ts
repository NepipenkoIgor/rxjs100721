import { TestScheduler } from 'rxjs/testing';
import { getX, swipe } from './swipe';

function creatTouch(clientX: number) {
    return new TouchEvent('event', {
        changedTouches: [new Touch({
            clientX,
            identifier: 1, target: new EventTarget()
        })]
    })
}

describe('RxJS base test', () => {

    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })
    it('getX should work', () => {

        testScheduler.run((helpers) => {
            const {hot, expectObservable} = helpers;
            const s1 = hot('-a--b----c--|', {
                a: creatTouch(1),
                b: creatTouch(10),
                c: creatTouch(4)
            });
            const expected = '      -a--b----c--|';
            expectObservable(getX(s1)).toBe(expected, {
                a: 1,
                b: 10,
                c: 4
            })
        })
    })

    it('swipe should work', () => {

        testScheduler.run((helpers) => {
            const {hot, expectObservable} = helpers;
            const touch1 = hot('-a----b------|', {
                a: creatTouch(1),
                b: creatTouch(10),
            });
            const touch2= hot('---a-----b------c----|', {
                a: creatTouch(20),
                b: creatTouch(5),
            });
            const expected = '      ---a-----b---|';
            expectObservable(swipe(getX(touch1), getX(touch2))).toBe(expected, {
                a: 19,
                b: -5,
            })
        })
    })
})
