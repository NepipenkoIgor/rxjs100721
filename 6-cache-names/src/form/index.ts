import {
    fromEvent,
    Observable,
    pluck,
    combineLatest,
    debounceTime,
    switchMap,
    of,
    withLatestFrom,
    map,
    EMPTY
} from 'rxjs';
import { userService } from './user.service';
import { terminalLog } from '../../../utils/log-in-terminal';

export class FormComponent {

    private valueSequence$: Observable<string>;

    private input: HTMLInputElement;
    private button: HTMLButtonElement;

    constructor(
        public formContainer: HTMLFormElement
    ) {
        this.input = formContainer.querySelector('input') as HTMLInputElement;
        this.button = formContainer.querySelector('button') as HTMLButtonElement;

        this.valueSequence$ = combineLatest([
            fromEvent<InputEvent>(this.input, 'input')
                .pipe(
                    pluck<any, any, string>('target', 'value')
                ),
            userService.uniqueNameSequence$
        ]).pipe(
            debounceTime(300),
            switchMap(([value, names]: [string, string[]]) => {
                const isNotValid = names.find((name: string) => name === value);
                if (isNotValid) {
                    this.input.classList.add('error');
                    this.button.disabled = true;
                    return EMPTY;
                }
                this.input.classList.remove('error');
                this.button.disabled = false;
                return of(value)
            })
        )

        fromEvent<MouseEvent>(this.button, 'click')
            .pipe(
                withLatestFrom(this.valueSequence$),
                map(([, v]) => v)
            ).subscribe((v) => {
            console.log(v);
        })
    }
}
