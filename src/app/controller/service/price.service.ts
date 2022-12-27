import {Injectable} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Price} from '../model/price.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private _groupOption: string;
  private _priceSelected: number;
  private _index = 0;
  private _activeIndex = 0;
  private _items: MenuItem[];

  constructor(private http: HttpClient) { }


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
