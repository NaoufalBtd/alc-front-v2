import {Component, OnInit} from '@angular/core';
import {EtudiantReview} from '../../../controller/model/etudiant-review.model';
import {EtudiantReviewService} from '../../../controller/service/etudiant-review.service';
import {LoginService} from '../../../controller/service/login.service';

@Component({
    selector: 'app-etudiantcommentreview',
    templateUrl: './etudiantcommentreview.component.html',
    styleUrls: ['./etudiantcommentreview.component.scss']
})
export class EtudiantcommentreviewComponent implements OnInit {

    constructor(private etudiantReviewService: EtudiantReviewService,
                private loginService: LoginService) {
    }

    display: boolean = false;

    get etudiantreviewsearch(): EtudiantReview {
        return this.etudiantReviewService.etudiantreviewsearch;
    }

    ngOnInit(): void {
        this.etudiantReviewService.findAllEtudiantReviewByProfId(this.loginService.prof.id);
    }

    get etudiantreview(): EtudiantReview {
        return this.etudiantReviewService.etudiantreview;
    }

    get listetudiantreview(): Array<EtudiantReview> {
        return this.etudiantReviewService.listetudiantreview;

    }

    public findByCriteria() {
        this.etudiantReviewService.findByCriteria();
    }


}
