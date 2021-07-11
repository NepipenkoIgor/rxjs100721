import { ReplaySubject, Subject } from 'rxjs';


class DataService {
    private _dataSequence$ = new ReplaySubject(1);

    public getData() {
        return this._dataSequence$.asObservable();
    }

    public setData(value: any) {
        this._dataSequence$.next(value);
    }
}

export const dataService = new DataService();
