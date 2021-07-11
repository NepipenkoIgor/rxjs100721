import { dataService } from './data.service.';

export class Component2 {
    constructor() {
        console.log('Init component 1');
        dataService.setData({value: 'RXJS'})
    }
}
