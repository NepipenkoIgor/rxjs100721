import { filter, fromEvent, map, merge, Observable, zipWith } from 'rxjs';


const touchStart$ = getX(
    merge(
        fromEvent<TouchEvent>(document, 'touchstart'),
        fromEvent<MouseEvent>(document, 'mousedown'),
    )
);
const touchEnd$ = getX(
    merge(
        fromEvent<TouchEvent>(document, 'touchend'),
        fromEvent<MouseEvent>(document, 'mouseup'),
    ));

function getX(source$: Observable<TouchEvent | MouseEvent>): Observable<number> {
    return source$
        .pipe(
            map((e: TouchEvent | MouseEvent) => {
                if (e instanceof MouseEvent) {
                    return e.clientX;
                }
                return e.changedTouches[0].clientX;
            })
        )
}

function swipe(source1$: Observable<number>, source2$: Observable<number>) {
    return source1$.pipe(
        zipWith(source2$),
        map(([startX, endX]: [number, number]) => {
            return endX - startX;
        }),
        filter((value) => value !== 0)
    )
}


export const swipe$ = swipe(touchStart$, touchEnd$);

/*
    ---1---2---3---4---5--
     zip
    -------10----------20---

    -------[1,10]
 */
