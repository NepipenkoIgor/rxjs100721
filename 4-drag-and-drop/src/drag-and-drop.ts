import '../../assets/css/style.css';
import { fromEvent, map, mergeAll, Observable, switchMap, takeUntil, tap } from 'rxjs';

export const box = document.querySelector('.draggable') as HTMLDivElement;

const mouseDown$ = fromEvent<MouseEvent>(box, 'mousedown');
const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseUp$ = fromEvent<MouseEvent>(box, 'mouseup');

export const drag$ = draFn$(mouseDown$, mouseMove$, mouseUp$);

export function draFn$(
    down$: Observable<MouseEvent>,
    move$: Observable<MouseEvent>,
    up$: Observable<MouseEvent>,
) {
    return down$
        .pipe(
            switchMap((down) => {
                down.preventDefault();
                return move$
                    .pipe(
                        map((move) => {
                            move.preventDefault();
                            return {
                                left: move.clientX - down.offsetX,
                                top: move.clientY - down.offsetY,
                            }
                        }),
                        takeUntil(up$)
                    )
            }),
            tap(({top, left}) => {
                box.style.top = `${top}px`;
                box.style.left = `${left}px`;
            })
        )
}
