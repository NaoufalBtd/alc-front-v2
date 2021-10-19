import {Component, OnInit} from '@angular/core';
import {CommentReviewService} from "../../../controller/service/comment-review.service";
import {LoginService} from "../../../controller/service/login.service";
import {EtudiantReview} from "../../../controller/model/etudiant-review.model";

@Component({
    selector: 'app-comment-review',
    templateUrl: './comment-review.component.html',
    styleUrls: ['./comment-review.component.scss']
})
export class CommentReviewComponent implements OnInit {

    constructor(private commentreviewservice: CommentReviewService, private login: LoginService) {
    }

    ngOnInit(): void {
        this.findListEtudiantReviewbyProfId(this.login.prof.id);
    }

    get etudiantreview(): EtudiantReview {
        return this.commentreviewservice.etudiantreview;
    }

    set etudiantreview(value: EtudiantReview) {
        this.commentreviewservice.etudiantreview = value;

    }

    get listetudiantreview(): Array<EtudiantReview> {
        return this.commentreviewservice.listetudiantreview;

    }

    set listetudiantreview(value: Array<EtudiantReview>) {
        this.commentreviewservice.listetudiantreview = value;

    }

    public findListEtudiantReviewbyProfId(idprof: number) {
        this.commentreviewservice.findListEtudiantReviewbyProfId(idprof);

    }

    get searchetudiantreview(): EtudiantReview {
        return this.commentreviewservice.searchetudiantreview;
    }

    set searchetudiantreview(value: EtudiantReview) {
        this.commentreviewservice.searchetudiantreview = value;

    }

    public findByCriteriacoursname(name: string) {
        this.commentreviewservice.findByCriteriacoursname(name);

    }

    public findByCriteriadate(date: Date) {
        this.commentreviewservice.findByCriteriadate(date);

    }
    public findByCriteriastudentname(name: string) {
        this.commentreviewservice.findByCriteriastudentname(name);

    }
}
