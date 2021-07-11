import { ajax } from 'rxjs/ajax';
import { concatAll, pluck, ReplaySubject, share, shareReplay, switchMap, timer, toArray } from 'rxjs';

interface IUser {
    profileName: string,
    firstName: string,
    surname: string,
    photo: string,
    country: string
}

class UserService {
    public uniqueNameSequence$ = timer(0, 16000)
        .pipe(
            switchMap(() => {
                return ajax<IUser[]>({
                    url: 'http://learn.javascript.ru/courses/groups/api/participants?key=1g74qlq',
                    method: 'GET',
                    crossDomain: true
                }).pipe(
                    pluck('response'),
                    concatAll(),
                    pluck('profileName'),
                    toArray(),
                    // shareReplay()
                )
            }),
            share({
                connector: () => new ReplaySubject(),
                resetOnError: false,
                resetOnComplete: false,
                resetOnRefCountZero: false
            })
        )
}


export const userService = new UserService();
