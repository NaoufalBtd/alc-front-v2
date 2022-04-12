import {Injectable, Input} from '@angular/core';
import {SectionItemModel} from '../model/section-item.model';

@Injectable({
  providedIn: 'root'
})
export class VocabularySectionItemService {

  @Input() private _current: SectionItemModel = null;
  private _fliped: boolean = false;
  private _image: string = 'https://drive.google.com/uc?export=view&id=1k_v1w04p_9JkbPZdPwjTGRY-00IktME4';
  private _selected: boolean = false;
  private _cureentResponse: string = '';
  constructor() { }


  get current(): SectionItemModel {
    return this._current;
  }

  set current(value: SectionItemModel) {
    this._current = value;
  }

  get fliped(): boolean {
    return this._fliped;
  }

  set fliped(value: boolean) {
    this._fliped = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
  }

  get cureentResponse(): string {
    return this._cureentResponse;
  }

  set cureentResponse(value: string) {
    this._cureentResponse = value;
  }

  reloadComponent() {
    document.getElementById('infoDiv').style.visibility = 'hidden';
    document.getElementById('translateShow').style.visibility = 'hidden';
    this.fliped = false;
  }
  showHidden() {
    document.getElementById('infoDiv').style.visibility = 'visible';
    document.getElementById('translateShow').style.visibility = 'visible';
    this.fliped = true;
  }

}
