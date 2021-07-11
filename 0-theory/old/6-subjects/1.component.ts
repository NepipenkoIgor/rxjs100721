import { dataService } from './data.service.';

export class Component1 {
    constructor() {
        dataService.getData().subscribe((v) => {
            console.log('In component 2', v);
        })
    }
}
