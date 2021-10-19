import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EtudiantReview} from "../model/etudiant-review.model";

@Injectable({
    providedIn: 'root'
})
export class CommentReviewService {
    // tslint:disable-next-line:variable-name
    private _etudiantreview: EtudiantReview;
    private _searchetudiantreview: EtudiantReview;
    private _listetudiantreview: Array<EtudiantReview>;

    get searchetudiantreview(): EtudiantReview {
        if (this._searchetudiantreview == null) {
            this._searchetudiantreview = new EtudiantReview();
        }
        return this._searchetudiantreview;
    }

    set searchetudiantreview(value: EtudiantReview) {
        this._searchetudiantreview = value;
    }

    get etudiantreview(): EtudiantReview {
        if (this._etudiantreview == null) {
            this._etudiantreview = new EtudiantReview();
        }
        return this._etudiantreview;
    }

    set etudiantreview(value: EtudiantReview) {
        this._etudiantreview = value;
    }

    get listetudiantreview(): Array<EtudiantReview> {
        if (this._listetudiantreview == null) {
            this._listetudiantreview = new Array<EtudiantReview>();
        }
        return this._listetudiantreview;
    }

    set listetudiantreview(value: Array<EtudiantReview>) {
        this._listetudiantreview = value;
    }

    constructor(private http: HttpClient) {
    }

    public findListEtudiantReviewbyProfId(idprof: number) {
        this.http.get<Array<EtudiantReview>>('http://localhost:8036/prof/etudiantReview/' + idprof).subscribe(
            data => {
                if (data != null) {
                    this.listetudiantreview = data;
                }
            }
        );
    }

    public findByCriteriastudentname(name: string) {
        this.searchetudiantreview.etudiant.nom = name;
        this.http.post('http://localhost:8036/prof/etudiantReview/bystudentname', this.searchetudiantreview).subscribe(
            data => {
                if (data != null) {
                    console.log(data);
                    console.log('haha');
                    // @ts-ignore
                    this.listetudiantreview = data;
                } else {
                    this.listetudiantreview = null;
                }


            }, error => {
                console.log(error);
            }
        );
    }

    public findByCriteriacoursname(name: string) {
        this.searchetudiantreview.cours.libelle = name;
        this.http.post('http://localhost:8036/prof/etudiantReview/coursname', this.searchetudiantreview).subscribe(
            data => {
                if (data != null) {
                    console.log(data);
                    console.log('haha');
                    // @ts-ignore
                    this.listetudiantreview = data;
                } else {
                    this.listetudiantreview = null;
                }

            }, error => {
                console.log(error);
            }
        );
    }

    public findByCriteriadate(date: Date) {
        this.searchetudiantreview.dateReview = date;
        this.http.post('http://localhost:8036/prof/etudiantReview/bydate', this.searchetudiantreview).subscribe(
            data => {
                if (data != null) {
                    console.log(data);
                    console.log('haha');
                    // @ts-ignore
                    this.listetudiantreview = data;
                } else {
                    this.listetudiantreview = null;
                }

            }, error => {
                console.log(error);
            }
        );
    }
}
