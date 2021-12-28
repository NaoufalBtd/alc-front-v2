import {Component, OnInit} from '@angular/core';
import {Prof} from '../../../../controller/model/prof.model';
import {MessageService} from 'primeng/api';
import {ProfessorService} from '../../../../controller/service/professor.service';
import {Parcours} from '../../../../controller/model/parcours.model';
import {TrancheHoraireProf} from '../../../../controller/model/tranche-horaire-prof.model';

@Component({
    selector: 'app-professeur-edit',
    templateUrl: './professeur-edit.component.html',
    styleUrls: ['./professeur-edit.component.scss']
})
export class ProfesseurEditComponent implements OnInit {

    constructor(private messageService: MessageService, private service: ProfessorService) {
    }
    public findAllParcours() {
        this.service.findAllParcours().subscribe(data => this.parcoursList = data);
    }
    get parcoursList(): Array<Parcours> {
        return this.service.parcoursList;
    }
    set parcoursList(value: Array<Parcours>) {
        this.service.parcoursList = value;
    }

    get selected(): Prof {
        return this.service.selected;
    }

    set selected(value: Prof) {
        this.service.selected = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get items(): Array<Prof> {
        return this.service.items;
    }

    set items(value: Array<Prof>) {
        this.service.items = value;
    }

    ngOnInit(): void {
    }

    public addHoraire(){
        console.log(this.trancheHoraireProf.datee);
        this.selected.trancheHoraireProfList.push(this.trancheHoraireProf);

    }

    get trancheHoraireProfList(): Array<TrancheHoraireProf> {
        return this.service.trancheHoraireProfList;
    }

    set trancheHoraireProfList(value: Array<TrancheHoraireProf>) {
        this.service.trancheHoraireProfList = value;
    }

    get trancheHoraireProf(): TrancheHoraireProf {
        return this.service.trancheHoraireProf;
    }

    set trancheHoraireProf( value: TrancheHoraireProf) {
        this.service.trancheHoraireProf = value;
    }
    public edit() {
        this.submitted = true;
        if (this.selected.id) {
            this.items[this.service.findIndexById(this.selected.id)] = this.selected;
            this.service.edit().subscribe(data => {
                this.selected = data;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'prof Updated',
                    life: 3000
                });
            });
        }
        this.editDialog = false;
        this.selected = new Prof();
    }

    public hideEditDialog() {
        this.editDialog = false;
    }


}
