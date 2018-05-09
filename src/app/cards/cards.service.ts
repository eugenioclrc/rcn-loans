import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Subject, Observable, Observer, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CardsService {
  createContract = new Subject();
  apiData: any[] = [];

  constructor(private http: Http) { }

  getCards() {
    return this.http.get('https://api.mercadolibre.com/items/MLA698930172')
      .map(
        (response: any) => {
          const data = response.json();
          // console.log(data);
          this.apiData.push(data);
          // console.log(this.apiData);
          // console.log(this.apiData[0]);
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      )
    ;
  }
}
