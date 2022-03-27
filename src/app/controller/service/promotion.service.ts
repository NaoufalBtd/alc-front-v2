import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PromotionStudentInvited} from '../model/promotion-student-invited.model';
import {PromotionStudentWhoInvited} from '../model/promotion-student-who-invited.model';
import {environment} from '../../../environments/environment';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    // declaration
    public promostionStudentInvitedAdminUrl = environment.adminUrl;
    public promostionStudentWhoInvitedAdminUrl = environment.adminUrl;
    private _promotionStudentWhoInvited: boolean = false;
    private _promotionInvited: boolean = false;
    private _studentWhoInvitedPromotion: PromotionStudentWhoInvited;
    private _studentWhoInvitedPromotionList: Array<PromotionStudentWhoInvited>;
    private _studentInvitedPromotion: PromotionStudentInvited;
    private _studentInvitedPromotionList: Array<PromotionStudentInvited>;

    // getter setter


    get studentWhoInvitedPromotionList(): Array<PromotionStudentWhoInvited> {
        if (this._studentWhoInvitedPromotionList == null) {
            this._studentWhoInvitedPromotionList = new Array<PromotionStudentWhoInvited>();
        }
        return this._studentWhoInvitedPromotionList;
    }

    set studentWhoInvitedPromotionList(value: Array<PromotionStudentWhoInvited>) {
        this._studentWhoInvitedPromotionList = value;
    }

    get studentInvitedPromotionList(): Array<PromotionStudentInvited> {
        if (this._studentInvitedPromotionList == null) {
            this._studentInvitedPromotionList = new Array<PromotionStudentInvited>();
        }
        return this._studentInvitedPromotionList;
    }

    set studentInvitedPromotionList(value: Array<PromotionStudentInvited>) {
        this._studentInvitedPromotionList = value;
    }

    get studentWhoInvitedPromotion(): PromotionStudentWhoInvited {
        if (this._studentWhoInvitedPromotion == null) {
            this._studentWhoInvitedPromotion = new PromotionStudentWhoInvited();
        }
        return this._studentWhoInvitedPromotion;
    }

    set studentWhoInvitedPromotion(value: PromotionStudentWhoInvited) {
        this._studentWhoInvitedPromotion = value;
    }

    get studentInvitedPromotion(): PromotionStudentInvited {
        if (this._studentInvitedPromotion == null) {
            this._studentInvitedPromotion = new PromotionStudentInvited();
        }
        return this._studentInvitedPromotion;
    }

    set studentInvitedPromotion(value: PromotionStudentInvited) {
        this._studentInvitedPromotion = value;
    }

    get promotionStudentWhoInvited(): boolean {
        return this._promotionStudentWhoInvited;
    }

    set promotionStudentWhoInvited(value: boolean) {
        this._promotionStudentWhoInvited = value;
    }

    get promotionInvited(): boolean {
        return this._promotionInvited;
    }

    set promotionInvited(value: boolean) {
        this._promotionInvited = value;
    }

// methode
    public findAllPromotionInvited() {
        this.http.get<Array<PromotionStudentInvited>>(environment.adminUrl + 'promostionStudentInvited/').subscribe(
            data => {
                if (data != null) {
                    this.studentInvitedPromotionList = data;
                }
            }
        );
    }

    public findAllPromotionStudentWhoInvited() {
        this.http.get<Array<PromotionStudentWhoInvited>>(environment.adminUrl + 'promostionStudentWhoInvited/').subscribe(
            data => {
                if (data != null) {
                    this.studentWhoInvitedPromotionList = data;
                }
            }
        );
    }

    public savePromotionInvited() {
        this.http.post(this.promostionStudentInvitedAdminUrl + 'promostionStudentInvited/', this.studentInvitedPromotion).subscribe(
            data => {
                if (data > 0) {
                    this.findAllPromotionInvited();
                    this.promotionInvited = false;
                    this.messageService.add({severity: 'success', summary: 'New promotion added', detail: 'New Promotion Added'});

                }
            }
        );
    }

    public savePromotionStudentWhoInvited() {
        this.http.post(this.promostionStudentInvitedAdminUrl + 'promostionStudentWhoInvited/', this.studentWhoInvitedPromotion).subscribe(
            data => {
                if (data > 0) {
                    this.findAllPromotionStudentWhoInvited();
                    this.promotionStudentWhoInvited = false;
                    this.messageService.add({severity: 'success', summary: 'New promotion added', detail: 'New Promotion Added'});

                }
            }
        );
    }

    constructor(private http: HttpClient, private messageService: MessageService) {
    }
}
