import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EtudiantReview} from "../model/etudiant-review.model";

@Injectable({
    providedIn: 'root'
})
export class CommentReviewService {
    // tslint:disable-next-line:variable-name
    private _etudiantreview: EtudiantReview;
    private _listetudiantreview: Array<EtudiantReview>;

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
}
