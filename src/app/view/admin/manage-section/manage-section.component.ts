import {Component, OnInit} from '@angular/core';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {Parcours} from '../../../controller/model/parcours.model';
import {Cours} from '../../../controller/model/cours.model';
import {Section} from '../../../controller/model/section.model';
import {CategorieSection} from '../../../controller/model/categorie-section.model';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-manage-section',
    templateUrl: './manage-section.component.html',
    styleUrls: ['./manage-section.component.scss']
})
export class ManageSectionComponent implements OnInit {
    public parcours: Array<Parcours> = new Array<Parcours>();
    public cours: Array<Cours> = new Array<Cours>();
    public sections: Array<Section> = new Array<Section>();
    public sectionSelected: Section = new Section();
    public section: Section = new Section();
    visibleSidebar: boolean;
    rows = 10;
    first = 0;

    imgUrl: string;
    showEditDialog: boolean;
    categorieSections: Array<CategorieSection> = new Array<CategorieSection>();

    constructor(private parcoursService: ParcoursService, private messageService: MessageService,) {
    }

    get selectedparcours(): Parcours {
        return this.parcoursService.selectedparcours;
    }

    set selectedparcours(value: Parcours) {
        this.parcoursService.selectedparcours = value;
    }

    get selectedcours(): Cours {
        return this.parcoursService.selectedcours;
    }

    set selectedcours(value: Cours) {
        this.parcoursService.selectedcours = value;
    }

    ngOnInit(): void {
        this.parcoursService.FindAllParcours().subscribe(
            data => {
                this.parcours = data;
            }
        );
    }

    getCours() {
        console.log(this.selectedparcours.id);
        if (this.selectedparcours.id !== undefined) {
            this.parcoursService.afficheCours().subscribe(
                data => {
                    this.cours = data;
                });
        }
    }

    getSections() {
        console.log(this.selectedcours.id);
        if (this.selectedcours.id !== undefined) {
            if (this.selectedparcours.id !== undefined) {
                this.parcoursService.affichelistSection().subscribe(
                    data => {
                        this.sections = data;
                    });
            }
        }
    }

    showImage(imgUrl: string) {
        this.imgUrl = imgUrl;
        this.visibleSidebar = true;
    }

    showEditDialogFct(section: Section) {
        this.sectionSelected = section;
        this.findAllCategorie();
        this.showEditDialog = true;
        console.log(section);
    }

    findAllCategorie() {
        this.parcoursService.findAllCategorieSection().subscribe(data => {
            this.categorieSections = data;
        });
    }

    findSection() {
        this.section.cours = this.selectedcours;
        this.section.cours.parcours = this.selectedparcours;
        console.log(this.section);
        this.parcoursService.findByCriteria(this.section).subscribe(data => {
            this.sections = data;
        }, error => {
            console.log(error);
        });
    }

    save() {
        this.showEditDialog = false;
        this.parcoursService.updateSection(this.sectionSelected).subscribe(data => {
            console.log(data);
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Section Updated',
                life: 7000
            });
        }, error => {
            console.log(error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'Error to update section please try again !',
                life: 7000
            });

        });

    }
}
