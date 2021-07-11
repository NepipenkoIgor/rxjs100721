import {
    bufferCount, catchError,
    concatAll,
    debounceTime,
    distinctUntilChanged, EMPTY,
    filter,
    fromEvent,
    map, Observable, reduce,
    switchMap,
    toArray
} from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
export interface IResult {
    name: string;
    description: string;
    owner: {
        avatar_url: string
    }
}

export interface IRes {
    items: IResult[]
}

export function liveSearch(source1$: Observable<InputEvent>, source2Fn: (text: string) => Observable<string>) {
    return source1$
        .pipe(
            debounceTime(300),
            map((event: InputEvent) => {
                return (event.target as HTMLInputElement).value.trim();
            }),
            filter((text: string) => text.length > 3),
            distinctUntilChanged(),
            switchMap(source2Fn));
}

export function request(source$: Observable<AjaxResponse<IRes>>): Observable<string> {
    return  source$
        .pipe(
            map((res: AjaxResponse<IRes>) => {
                return res.response.items;
            }),
            concatAll(),
            map((item: IResult) => createCard(item)),
            bufferCount(3),
            reduce((resultStr: string, htmlStr: string[]) => {
                return resultStr += createRow(htmlStr)
            }, ''),
            map((htmlStr: string) => htmlStr.trim().replace(/\s+(<)/g, '<')),
            catchError(error => EMPTY)
        )
}

function createRow(htmlStr: string[]): string {
    return `<div class="row">${htmlStr.join(' ')}</div>`;
}

function createCard({name, description, owner: {avatar_url}}: IResult): string {
    return `
      <div class="col-sm-6 col-md-4">
        <div class="card">
          <img class="card-img-top" src=${avatar_url} alt=${name}>
          <div class="card-body">
               <h5 class="card-title">${name}</h5>
               <p class="card-text">${description}</p>
          </div>
        </div> 
     </div>  
    `
}
