import 'bootstrap';
import '../../assets/css/style.css'
import './styles.css'
import { IRes, liveSearch, request } from './live-search';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const el = document.querySelector('#search') as HTMLInputElement;
const container = document.querySelector('.container') as HTMLDivElement;


liveSearch(
    fromEvent<InputEvent>(el, 'input'),
    (text: string) => {
        return request(ajax<IRes>({
            url: `https://api.github.com/search/repositories?q=${text}`,
            crossDomain: true
        }))
    }
)
    .subscribe((htmlStr) => {
        container.innerHTML = htmlStr;
    })
