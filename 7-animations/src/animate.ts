import { animationFrameScheduler, defer, interval, map, takeWhile, tap } from 'rxjs';

const animationFn = (percentage: number) => {
    return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * Math.pow(2, -10 * percentage) + 1;
}


function msElapsed(scheduler = animationFrameScheduler) {
    return defer(() => {
        const start = scheduler.now();
        return interval(0, scheduler)
            .pipe(map(() => scheduler.now() - start));
    })
}

function duration(ms: number, scheduler = animationFrameScheduler) {
    return msElapsed(scheduler)
        .pipe(map((time) => {
                return time / ms;
            }),
            takeWhile((percentage) => percentage <= 1)
        )
}


function distance(px: number) {
    return (percentage: number) => percentage * px;
}


export function animationDown(element: HTMLDivElement) {
    return duration(20000)
        .pipe(
            map(animationFn),
            map(distance(100)),
            tap((frame)=>{
                element.style.transform = `translate3D(0,${frame}px,0)`
            })
        )
}
