import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PackStudent} from '../model/pack-student.model';
import {environment} from '../../../environments/environment';
import {MessageService} from 'primeng/api';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PackStudentService {

    private _packstudentIndividial: PackStudent;
    private _packstudentlist: Array<PackStudent>;
    private _packstudentVo: PackStudent;
    private _packstudentgroupe: PackStudent;
    private _selectedCourse: PackStudent = new PackStudent();
    private _packstudentIndividialList: Array<PackStudent>;
    private _packstudentgroupeList: Array<PackStudent>;
    private adminUrl = environment.adminUrl;
    private _packs: Array<PackStudent> = new Array<PackStudent>();
    private _selectedBlog: any;

    constructor(private http: HttpClient, private messageService: MessageService) {
    }


    get selectedBlog(): any {
        return this._selectedBlog;
    }

    set selectedBlog(value: any) {
        this._selectedBlog = value;
    }

    get selectedCourse(): PackStudent {
        return this._selectedCourse;
    }

    set selectedCourse(value: PackStudent) {
        this._selectedCourse = value;
    }

    get packs(): Array<PackStudent> {
        return this._packs;
    }

    set packs(value: Array<PackStudent>) {
        this._packs = value;
    }

    get packstudentlist(): Array<PackStudent> {
        if (this._packstudentlist == null) {
            this._packstudentlist = new Array<PackStudent>();
        }
        return this._packstudentlist;
    }

    set packstudentlist(value: Array<PackStudent>) {
        this._packstudentlist = value;
    }

    get packstudentVo(): PackStudent {
        if (this._packstudentVo == null) {
            this._packstudentVo = new PackStudent();
        }
        return this._packstudentVo;
    }

    set packstudentVo(value: PackStudent) {
        this._packstudentVo = value;
    }

    get packstudentIndividial(): PackStudent {
        if (this._packstudentIndividial == null) {
            this._packstudentIndividial = new PackStudent();
        }
        return this._packstudentIndividial;
    }

    set packstudentIndividial(value: PackStudent) {
        this._packstudentIndividial = value;
    }

    get packstudentgroupe(): PackStudent {
        if (this._packstudentgroupe == null) {
            this._packstudentgroupe = new PackStudent();
        }
        return this._packstudentgroupe;
    }

    set packstudentgroupe(value: PackStudent) {
        this._packstudentgroupe = value;
    }

    get packstudentIndividialList(): Array<PackStudent> {
        if (this._packstudentIndividialList == null) {
            this._packstudentIndividialList = new Array<PackStudent>();
        }
        return this._packstudentIndividialList;
    }

    set packstudentIndividialList(value: Array<PackStudent>) {
        this._packstudentIndividialList = value;
    }

    get packstudentgroupeList(): Array<PackStudent> {
        if (this._packstudentgroupeList == null) {
            this._packstudentgroupeList = new Array<PackStudent>();
        }
        return this._packstudentgroupeList;
    }

    set packstudentgroupeList(value: Array<PackStudent>) {
        this._packstudentgroupeList = value;
    }

    public findPackIndividualOrgroupe(isforgroupe: boolean) {
        this.http.get<Array<PackStudent>>(this.adminUrl + 'packStudent/packForgroupe/' + isforgroupe).subscribe(
            data => {
                this.packs = data;
                if (data !== null) {
                    if (isforgroupe) {
                        this.packstudentgroupeList = data;
                        this.packstudentlist = data;
                    } else {
                        this.packstudentIndividialList = data;
                        this.packstudentlist = data;
                    }
                }
            }
        );
    }


    public findPackByGroupOption(isforgroupe: boolean): Observable<Array<PackStudent>> {
        return this.http.get<Array<PackStudent>>(this.adminUrl + 'packStudent/packForgroupe/' + isforgroupe);
    }

    public findPackByLevel(isforgroupe: boolean): Observable<Array<PackStudent>> {
        return this.http.get<Array<PackStudent>>(this.adminUrl + 'packStudent/packForgroupe/' + isforgroupe);
    }


    public findbyCode(code: string) {
        this.http.get(this.adminUrl + 'packStudent/code/' + code).subscribe(

        );
    }

    public findAllPacks() {
        this.http.get<PackStudent[]>(this.adminUrl + 'packStudent/').subscribe(
            data => {
                this.packs = data;
            }
        );
    }

    public findAll(): Observable<PackStudent[]> {
        return this.http.get<PackStudent[]>(this.adminUrl + 'packStudent/');
    }

    public findByLevel(levelId: number) {
        this.http.get<PackStudent[]>(this.adminUrl + 'packStudent/level/id/' + levelId).subscribe(
            data => {
                this.packs = data;
            }
        );
    }

    public findById(id: number): Observable<PackStudent> {
        return this.http.get<PackStudent>(this.adminUrl + 'packStudent/id/' + id);
    }


    public findAllPacksByLevel(): Observable<Array<PackStudent>> {
        return this.http.get<PackStudent[]>(this.adminUrl + 'packStudent/');
    }

    savePack() {
        this.packstudentIndividial.nombreCours = this.packstudentIndividial.price.nreCourse;
        this.packstudentIndividial.oldPrice = this.packstudentIndividial.price.oldPrice.toString();
        this.packstudentIndividial.libelle = this.packstudentIndividial.price.lib;
        this.http.post<number>(this.adminUrl + 'packStudent/', this.packstudentIndividial).subscribe(
            data => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Pack created',
                    life: 3000
                });

                if (this.packstudentIndividial.forGroupe) {
                    this.packstudentgroupeList.push(this.packstudentIndividial);

                } else {
                    this.packstudentIndividialList.push(this.packstudentIndividial);
                }
                this.packstudentIndividial = new PackStudent();
            }, error => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: error?.error?.message || 'Something went wrong, please try again.',
                    life: 3000
                });
            }
        );
    }

    updatePack() {
        this.packstudentIndividial.nombreCours = this.packstudentIndividial.price.nreCourse;
        this.packstudentIndividial.oldPrice = this.packstudentIndividial.price.oldPrice.toString();
        this.packstudentIndividial.libelle = this.packstudentIndividial.price.lib;
        this.http.put<PackStudent>(this.adminUrl + 'packStudent/', this.packstudentIndividial).subscribe(
            data => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Successful',
                    detail: 'Pack Updated',
                    life: 3000
                });
                if (this.packstudentIndividial.forGroupe) {
                    for (let i = 0; i < this.packstudentgroupeList.length; i++) {
                        if (this.packstudentgroupeList[i]?.id === this.packstudentIndividial.id) {
                            this.packstudentgroupeList[i] = data;
                        }
                    }
                } else {
                    for (let i = 0; i < this.packstudentIndividialList.length; i++) {
                        if (this.packstudentIndividialList[i]?.id === this.packstudentIndividial.id) {
                            this.packstudentIndividialList[i] = data;
                        }
                    }
                }
                this.packstudentIndividial = new PackStudent();
            }, error => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: error?.error?.message || 'Something went wrong, please try again.',
                    life: 3000
                });
            }
        );
    }

    deleteById(pack: PackStudent) {
        this.http.delete(this.adminUrl + 'packStudent/code/' + pack.id).subscribe(
            data => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Successful',
                    detail: 'Pack deleted',
                    life: 3000
                });
                this.findPackIndividualOrgroupe(true);
                this.findPackIndividualOrgroupe(false);
            }, error => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error!',
                    detail: error?.error?.message || 'Something went wrong, please try again.',
                    life: 3000
                });
            }
        );
    }

    findbycretira(b: boolean, value: string) {

        this.http.get<PackStudent[]>(this.adminUrl + 'packStudent/').subscribe(
            data => {
                if (b) {
                    data = data.filter(d => d.forGroupe === true);
                    this.packstudentgroupeList = data.filter(d =>
                        d.libelle?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.level?.libelle?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.nombreCours?.toString()?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.price?.price?.toString()?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.price?.lib?.toString()?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.price?.oldPrice?.toString()?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.price?.nreHours?.toString()?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.price?.nreMonth?.toString()?.toUpperCase()?.includes(value.toUpperCase())
                    );
                } else {
                    data = data.filter(d => d.forGroupe === false);
                    this.packstudentIndividialList = data.filter(d =>
                        d.libelle?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.level?.libelle?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.nombreCours?.toString()?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.price?.price?.toString()?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.price?.lib?.toString()?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.price?.oldPrice?.toString()?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.price?.nreHours?.toString()?.toUpperCase()?.includes(value.toUpperCase()) ||
                        d.price?.nreMonth?.toString()?.toUpperCase()?.includes(value.toUpperCase())
                    );
                }
            }
        );
    }
}
