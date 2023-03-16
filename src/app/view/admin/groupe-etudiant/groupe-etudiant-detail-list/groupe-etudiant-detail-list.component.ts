import {Component, OnInit} from '@angular/core';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';
import {ConfirmationService} from 'primeng/api';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {GroupeEtudiantDetail} from '../../../../controller/model/groupe-etudiant-detail.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';

@Component({
    selector: 'app-groupe-etudiant-detail-list',
    templateUrl: './groupe-etudiant-detail-list.component.html',
    styleUrls: ['./groupe-etudiant-detail-list.component.scss']
})
export class GroupeEtudiantDetailListComponent implements OnInit {
    cols: any[];
    private submitted: boolean;

    constructor(private groupeEtudiantService: GroupeEtudiantService, private confirmation: ConfirmationService) {
    }


    ngOnInit(): void {
        this.groupeEtudiantService.findAllGroupeEtudiantDetail(this.groupeEtudiant.id).subscribe(
            data => this.groupeEtudiant.groupeEtudiantDetails = data);
    }

    public hideCreateDialog() {
        this.createDialogGroupeEtudiantDetail = false;
        this.submitted = false;
    }

    get createDialogGroupeEtudiantDetail(): boolean {
        return this.groupeEtudiantService.createDialog2;
    }

    set createDialogGroupeEtudiantDetail(value: boolean) {
        this.groupeEtudiantService.createDialog2 = value;
    }

    get groupeEtudiant(): GroupeEtudiant {
        return this.groupeEtudiantService.groupeEtudiant;
    }

    set groupeEtudiant(value: GroupeEtudiant) {
        this.groupeEtudiantService.groupeEtudiant = value;
    }

    get groupeEtudiantDetails(): Array<GroupeEtudiantDetail> {
        return this.groupeEtudiantService.groupeEtudiantDetails;
    }

    set groupeEtudiantDetails(value: Array<GroupeEtudiantDetail>) {
        this.groupeEtudiantService.groupeEtudiantDetails = value;
    }

    get groupeEtudiantDetail(): GroupeEtudiantDetail {
        return this.groupeEtudiantService.groupeEtudiantDetail;
    }

    set groupeEtudiantDetail(value: GroupeEtudiantDetail) {
        this.groupeEtudiantService.groupeEtudiantDetail = value;
    }

    get selected(): GroupeEtudiant {
        return this.groupeEtudiantService.groupeEtudiant;
    }

    set selected(value: GroupeEtudiant) {
        this.groupeEtudiantService.groupeEtudiant = value;
    }

    get etudiant(): Etudiant {
        return this.groupeEtudiantService.etudiant;
    }

    set etudiant(value: Etudiant) {
        this.groupeEtudiantService.etudiant = value;
    }

    get selectes(): Array<GroupeEtudiant> {
        return this.groupeEtudiantService.selectes;
    }

    set selectes(value: Array<GroupeEtudiant>) {
        this.groupeEtudiantService.selectes = value;
    }

    get groupeEtudiants(): Array<GroupeEtudiant> {
        return this.groupeEtudiantService.groupeEtudiants;
    }

    set groupeEtudiants(value: Array<GroupeEtudiant>) {
        this.groupeEtudiantService.groupeEtudiants = value;
    }

    removeGrouEtudiantDetail(item: GroupeEtudiantDetail) {
        if (item?.id !== undefined && item?.id !== null && item?.id !== 0) {
            this.confirmation.confirm({
                message: 'Are you sure you want to delete ' + item?.etudiant.nom + ' ?',
                header: 'Confirm',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.groupeEtudiantService.deleteGroupeEtudiantDetailById(item.id).subscribe(
                        data => {

                        }, error => {
                            console.log(error);
                        }
                    );
                }
            });
        }

        for (let i = 0; i < this.groupeEtudiant?.groupeEtudiantDetails?.length; i++) {
            if (item?.etudiant?.id === this.groupeEtudiant?.groupeEtudiantDetails[i]?.etudiant?.id) {
                this.groupeEtudiant?.groupeEtudiantDetails.splice(i, 1);
            }
        }
    }
}
