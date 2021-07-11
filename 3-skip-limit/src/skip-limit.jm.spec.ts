
import { hot } from 'jasmine-marbles';
import { skipLimit } from './skip-limit';

describe('RxJS skipLimit test JM', () => {

    it('getX should work', () => {
        const s1 = hot('-a--b----c----d---e-|', {
            a: 'rx',
            b:  'js',
            c: 'is',
            d: 'awesome',
            e: '!!!'
        });
        const expected = hot('---------c----d-----|', {
            c: 'is',
            d: 'awesome',
        });
        expect(s1.pipe(skipLimit(2,2))).toBeObservable(expected)
    })

})
