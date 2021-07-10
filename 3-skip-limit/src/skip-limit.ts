import { Observable, Subscriber } from 'rxjs';


class SkipLimitSubscriber extends Subscriber<any> {

    private interval = 1;
    private count = 1;

    constructor(sub: Subscriber<any>, private skip: number, private limit: number) {
        super(sub);
    }

    override next(value: any) {
        const borderLeft = this.interval * (this.skip + this.limit) - this.limit;
        const borderRight = borderLeft + this.limit;
        if (borderLeft < this.count && this.count <= borderRight) {
            super.next(value);
            this.count++;
            if (borderRight < this.count) {
                this.interval++;
            }
            return;
        }
        this.count++;
    }
}

export function skipLimit(skip: number, limit: number) {
    return (source: Observable<any>) => {
        return new Observable(subscriber => {
            return source.subscribe(new SkipLimitSubscriber(subscriber, skip, limit))
        })
    }
}
