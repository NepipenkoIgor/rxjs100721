import { combineLatest, fromEvent, map, Observable, startWith, tap, withLatestFrom } from "rxjs";

const qualityStart = 7;
const ratingStart = 3;
const actualStart = 5;
const qualitySlider = $('#quality').slider({value: qualityStart});
const ratingSlider = $('#rating').slider({value: ratingStart});
const actualSlider = $('#actual').slider({value: actualStart});

const quality$ = getValue(fromEvent(qualitySlider, 'change'), {
    value: qualityStart * 10,
    element: qualitySlider.parent().children(':first-child')[0]
}, redrawSlider)

const rating$ = getValue(fromEvent(ratingSlider, 'change'), {
    value: ratingStart * 10,
    element: ratingSlider.parent().children(':first-child')[0]
}, redrawSlider)

const actual$ = getValue(fromEvent(actualSlider, 'change'), {
    value: actualStart * 10,
    element: actualSlider.parent().children(':first-child')[0]
}, redrawSlider)


export function sliderSequence$(...sources: Observable<number>[]) {
    return combineLatest<number[]>(sources)
        .pipe(
            map(([quality, rating, actual]) => {
                return Math.round((quality + rating + actual) / 3);
            })
        )
}

export function sendResult(source1$: Observable<MouseEvent>, source2$: Observable<number>) {
    return source1$.pipe(
        withLatestFrom(source2$)
    )
}

export const sliders$ = sliderSequence$(quality$, rating$, actual$)


export function getValue(source$: Observable<any>, initialValue: { value: number, element: HTMLElement }, cb: (...args: any[]) => void) {
    return source$.pipe(
        map(({delegateTarget: {previousSibling}, value: {newValue}}: any) => {
            return {
                element: previousSibling,
                value: newValue * 10
            }
        }),
        startWith(initialValue),
        tap(cb),
        map(({value}) => value)
    )
}

export function redrawSlider({element, value}: any): void {
    const sliderTrack = element.querySelector('.slider-track');
    sliderTrack.classList.remove('bad', 'warn', 'good');
    if (value < 40) {
        sliderTrack.classList.add('bad');
        return;
    }
    if (value >= 40 && value < 70) {
        sliderTrack.classList.add('warn');
        return;
    }
    sliderTrack.classList.add('good');
}
