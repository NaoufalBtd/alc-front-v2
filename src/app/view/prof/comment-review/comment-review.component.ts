import { Component, OnInit } from '@angular/core';
import {EtudiantReview} from "../../../controller/model/etudiant-review.model";
import {EtudiantReviewService} from "../../../controller/service/etudiant-review.service";
import {CommentReviewService} from "../../../controller/service/comment-review.service";
import {LoginService} from "../../../controller/service/login.service";

@Component({
  selector: 'app-comment-review',
  templateUrl: './comment-review.component.html',
  styleUrls: ['./comment-review.component.scss']
})
export class CommentReviewComponent implements OnInit {

  constructor(private commentreviewservice: CommentReviewService,private login: LoginService) { }

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

          }
