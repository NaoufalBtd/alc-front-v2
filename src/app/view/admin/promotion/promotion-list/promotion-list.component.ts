import {Component, OnInit} from '@angular/core';
import {PromotionService} from '../../../../controller/service/promotion.service';
import {PromotionStudentWhoInvited} from '../../../../controller/model/promotion-student-who-invited.model';
import {PromotionStudentInvited} from '../../../../controller/model/promotion-student-invited.model';

@Component({
    selector: 'app-promotion-list',
    templateUrl: './promotion-list.component.html',
    styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {
    constructor(private promotionService: PromotionService) {
    }

// get set
    get promotionStudentWhoInvited(): boolean {
        return this.promotionService.promotionStudentWhoInvited;
    }

    set promotionStudentWhoInvited(value: boolean) {
        this.promotionService.promotionStudentWhoInvited = value;
    }

    get promotionInvited(): boolean {
        return this.promotionService.promotionInvited;
    }

    set promotionInvited(value: boolean) {
        this.promotionService.promotionInvited = value;
    }

    get studentWhoInvitedPromotionList(): Array<PromotionStudentWhoInvited> {

        return this.promotionService.studentWhoInvitedPromotionList;
    }

    set studentWhoInvitedPromotionList(value: Array<PromotionStudentWhoInvited>) {
        this.promotionService.studentWhoInvitedPromotionList = value;
    }

    get studentInvitedPromotionList(): Array<PromotionStudentInvited> {

        return this.promotionService.studentInvitedPromotionList;
    }

    set studentInvitedPromotionList(value: Array<PromotionStudentInvited>) {
        this.promotionService.studentInvitedPromotionList = value;
    }


    ngOnInit(): void {
        this.promotionService.findAllPromotionInvited();
        this.promotionService.findAllPromotionStudentWhoInvited();
    }

// methode
    addPromotionStudentInvited() {
        this.promotionInvited = true;

    }

    addPromotionStudentWhoInvited() {
        this.promotionStudentWhoInvited = true;
    }
}
