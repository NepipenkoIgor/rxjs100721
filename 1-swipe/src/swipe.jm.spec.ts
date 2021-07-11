import { getX, swipe } from './swipe';
import { hot } from 'jasmine-marbles';

function creatTouch(clientX: number) {
    return new TouchEvent('event', {
        changedTouches: [new Touch({
            clientX,
            identifier: 1, target: new EventTarget()
        })]
    })
}

describe('RxJS swipe test JM', () => {

    it('getX should work', () => {
        const s1 = hot('-a--b----c--|', {
            a: creatTouch(1),
            b: creatTouch(10),
            c: creatTouch(4)
        });
        const expected = hot('      -a--b----c--|', {
            a: 1,
            b: 10,
            c: 4
        });
        expect(getX(s1)).toBeObservable(expected)
    })

    it('swipe should work', () => {
        const touch1 = hot('-a----b------|', {
            a: creatTouch(1),
            b: creatTouch(10),
        });
        const touch2 = hot('---a-----b------c----|', {
            a: creatTouch(20),
            b: creatTouch(5),
        });
        const expected = hot('      ---a-----b---|', {
            a: 19,
            b: -5,
        });
        expect(swipe(getX(touch1), getX(touch2))).toBeObservable(expected)
    })
})
