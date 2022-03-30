import {Component, OnInit} from '@angular/core';
import {PromotionService} from '../../../../controller/service/promotion.service';
import {PromotionStudentWhoInvited} from '../../../../controller/model/promotion-student-who-invited.model';
import {PromotionStudentInvited} from '../../../../controller/model/promotion-student-invited.model';

@Component({
    selector: 'app-promotion-create',
    templateUrl: './promotion-create.component.html',
    styleUrls: ['./promotion-create.component.scss']
})
export class PromotionCreateComponent implements OnInit {

    constructor(private promotionService: PromotionService) {
    }

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

    get studentWhoInvitedPromotion(): PromotionStudentWhoInvited {
        return this.promotionService.studentWhoInvitedPromotion;
    }

    set studentWhoInvitedPromotion(value: PromotionStudentWhoInvited) {
        this.promotionService.studentWhoInvitedPromotion = value;
    }

    get studentInvitedPromotion(): PromotionStudentInvited {
        return this.promotionService.studentInvitedPromotion;
    }

    set studentInvitedPromotion(value: PromotionStudentInvited) {
        this.promotionService.studentInvitedPromotion = value;
    }


    ngOnInit(): void {
    }

// methode
    public savePromotionInvited() {
        this.promotionService.savePromotionInvited();
    }

    public savePromotionStudentWhoInvited() {
        this.promotionService.savePromotionStudentWhoInvited();
    }

    hide() {
        this.promotionStudentWhoInvited = false;
    }

    close() {
        this.promotionInvited = false;
    }
}
