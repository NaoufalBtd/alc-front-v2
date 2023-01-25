import {Component, OnInit} from '@angular/core';
import {Prof} from '../../../../controller/model/prof.model';
import {MessageService} from 'primeng/api';
import {ProfessorService} from '../../../../controller/service/professor.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TypeTeacherService} from '../../../../controller/service/type-teacher.service';
import {TypeTeacher} from '../../../../controller/model/type-teacher.model';
import {Parcours} from '../../../../controller/model/parcours.model';
import {ParcoursService} from '../../../../controller/service/parcours.service';

@Component({
    selector: 'app-professeur-create',
    templateUrl: './professeur-create.component.html',
    styleUrls: ['./professeur-create.component.scss']
})
export class ProfesseurCreateComponent implements OnInit {
    typeTeachers: Array<TypeTeacher> = new Array<TypeTeacher>();
    levels: Array<Parcours> = new Array<Parcours>();

    constructor(private messageService: MessageService,
                private typeTeacherService: TypeTeacherService,
                private parcoursService: ParcoursService,
                private service: ProfessorService) {
    }

    get selected(): Prof {
        return this.service.selected;
    }

    set selected(value: Prof) {
        this.service.selected = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
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

    exform: FormGroup;

    ngOnInit(): void {
        this.exform = new FormGroup({
            'fullName': new FormControl(null, Validators.required),
            'password': new FormControl(null, Validators.required),

            'email': new FormControl(null, Validators.required)
        });

        this.typeTeacherService.findAllType().subscribe(d => this.typeTeachers = d);
        this.parcoursService.findAllLevels().subscribe(d => this.levels = d);

    }

    public hideCreateDialog() {
        this.createDialog = false;
        this.submitted = false;
    }

    public save() {
        this.submitted = true;
        this.selected.categorieProf.id = 1;
        this.service.save().subscribe(data => {

        });
        this.createDialog = false;
        this.selected = new Prof();
    }


}
