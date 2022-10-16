import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

let stocks:Array<string> = ['GOOG','AMZN','TWTR'];
let servic:string = 'https://angular2-in-action-api.herokuapp.com';

export interface StockInterface{
  symbol:string;
  lastTradePriceOnly:number;
  change:number;
  changeInPercent:number;
}

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http:HttpClient) { }
  get(){
    return stocks.slice();
  }

  add(stock:string){
    stocks.push(stock);
    return this.get();
  }

  remove(stock:string){
    stocks.splice(stocks.indexOf(stock),1);
    return this.get();
  }

  load(symbols:string[]){
    if(symbols){
      return this.http.get<Array<StockInterface>>(servic+'/stocks/snapshot?symbols='+symbols.join(','))
    }
    return null;
  }
}
