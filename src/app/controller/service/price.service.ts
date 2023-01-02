import {Injectable} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Price} from '../model/price.model';
import {environment} from '../../../environments/environment';
import {Parcours} from '../model/parcours.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private _groupOption: string;
  private _priceSelected: number;
  private _priceLib: string;
  private _index = 0;
  private _activeIndex = 0;
  private _items: MenuItem[];
  private _prices: Array<Price> = new Array<Price>();
  private _priceList: Array<Price> = new Array<Price>();
  private _levels: Array<Parcours> = new Array<Parcours>();
  constructor(private http: HttpClient) { }


  get priceLib(): string {
    return this._priceLib;
  }

  set priceLib(value: string) {
    this._priceLib = value;
  }

  get prices(): Array<Price> {
    return this._prices;
  }

  set prices(value: Array<Price>) {
    this._prices = value;
  }

  get priceList(): Array<Price> {
    return this._priceList;
  }

  set priceList(value: Array<Price>) {
    this._priceList = value;
  }

  get levels(): Array<Parcours> {
    return this._levels;
  }

  set levels(value: Array<Parcours>) {
    this._levels = value;
  }
  get items(): MenuItem[] {
    return this._items;
  }

  set items(value: MenuItem[]) {
    this._items = value;
  }

  get groupOption(): string {
    return this._groupOption;
  }

  set groupOption(value: string) {
    this._groupOption = value;
  }

  get priceSelected(): number {
    return this._priceSelected;
  }

  set priceSelected(value: number) {
    this._priceSelected = value;
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  get activeIndex(): number {
    return this._activeIndex;
  }

  set activeIndex(value: number) {
    this._activeIndex = value;
  }

  public save(price: Price): Observable<Price>{
    return this.http.post<Price>(environment.adminUrl + 'price/', price);
  }
  public getAll(): Observable<Price[]>{
    return this.http.get<Price[]>(environment.adminUrl + 'price/');
  }


}
