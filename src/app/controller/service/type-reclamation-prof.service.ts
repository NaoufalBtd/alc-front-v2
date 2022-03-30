import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TypeReclamationProf} from '../model/type-reclamation-prof.model';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class TypeReclamationProfService {
    private adminTypeReclamationProf = environment.adminUrl + 'typeReclamationProfAdmin';
    private _typeReclamationProf: TypeReclamationProf;
    private _typeReclamationProfList: Array<TypeReclamationProf>;
    private _displayTypeReclamationProf: boolean = false;

    get displayTypeReclamationProf(): boolean {
        return this._displayTypeReclamationProf;
    }

    set displayTypeReclamationProf(value: boolean) {
        this._displayTypeReclamationProf = value;
    }

    get typeReclamationProf(): TypeReclamationProf {
        if (this._typeReclamationProf == null) {
            this._typeReclamationProf = new TypeReclamationProf();
        }
        return this._typeReclamationProf;
    }

    set typeReclamationProf(value: TypeReclamationProf) {
        this._typeReclamationProf = value;
    }

    get typeReclamationProfList(): Array<TypeReclamationProf> {
        if (this._typeReclamationProfList == null) {
            this._typeReclamationProfList = new Array<TypeReclamationProf>();
        }
        return this._typeReclamationProfList;
    }

    set typeReclamationProfList(value: Array<TypeReclamationProf>) {
        this._typeReclamationProfList = value;
    }

// methode
    public findAll() {
        this.http.get<Array<TypeReclamationProf>>(this.adminTypeReclamationProf + '/').subscribe(
            data => {
                if (data != null) {
                    this.typeReclamationProfList = data;
                }
            }
        );
    }

    public saveTypeReclamationProf() {
        this.http.post(this.adminTypeReclamationProf + '/', this.typeReclamationProf).subscribe(
            data => {
                if (data > 0) {
                    this.typeReclamationProf = null;
                    this.findAll();
                    this.displayTypeReclamationProf = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Type Reclamation Student',
                        detail: 'Type Reclamation Prof Added successfully'
                    });
                }
            }
        );
    }

// constructor
    constructor(private http: HttpClient, private messageService: MessageService) {
    }
}
