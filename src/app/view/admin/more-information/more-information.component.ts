import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {GroupeEtudeService} from '../../../controller/service/groupe-etude.service';
import {TypeTeacher} from '../../../controller/model/type-teacher.model';
import {TypeTeacherService} from '../../../controller/service/type-teacher.service';
import {GroupeEtude} from '../../../controller/model/groupe-etude.model';
import {User} from '../../../controller/model/user.model';

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.scss']
})
export class MoreInformationComponent implements OnInit {
  constructor(private messageService: MessageService, private typeTeacherService: TypeTeacherService,
              private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.typeTeacherService.findAllType().subscribe(data => {
      this.typeTeachers = data;
      console.log(this.typeTeachers);
    } );
  }
  selected = new TypeTeacher();
  public save() {

    if (this.selected.libelle.trim()) {
      this.typeTeacherService.save().subscribe(data => {
        // tslint:disable-next-line:no-shadowed-variable
        this.typeTeacherService.findAllType().subscribe(data => this.typeTeachers = data);
        this.typeTeachers.push({...this.selected});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Type Teacher Created',
          life: 3000
        });
      });
      this.createDialogEtud = false;
      this.typeTeacher = new TypeTeacher();
    }
  }
  public showEdit(typeTeacher1: TypeTeacher) {
    this.typeTeacher = {...typeTeacher1};
    this.editDialog = true;
  }
  showEditDialog() {
    this.createDialogEtud = true;
    this.typeTeacher =null;
    this.selected=null;

  }
  hideCreateDialog() {
    this.createDialogEtud = false;

  }

  get editDialog(): boolean {
    return this.typeTeacherService.editDialog;
  }

  set editDialog(value: boolean) {
    this.typeTeacherService.editDialog = value;
  }
  get createDialogEtud(): boolean {
    return this.typeTeacherService.createDialog;
  }

  set createDialogEtud(value: boolean) {
    this.typeTeacherService.createDialog = value;
  }

  get typeTeacher(): TypeTeacher {
    return this.typeTeacherService.typeTeacher;
  }

  set typeTeacher(value: TypeTeacher) {
    this.typeTeacherService.typeTeacher = value;
  }
  get typeTeachers(): Array<TypeTeacher>{
    return this.typeTeacherService.typeTeachers;
  }

  set typeTeachers(value: Array<TypeTeacher>) {
    this.typeTeacherService.typeTeachers = value;
  }
  public edit() {
    this.typeTeachers[this.typeTeacherService.findIndexById(this.typeTeacher.id)] = this.typeTeacher;
    this.typeTeacherService.edit().subscribe(data => {
      this.typeTeacher = data;
      this.typeTeacherService.findAllType();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'TypeTeacher Updated',
        life: 3000
      });
    });
    this.editDialog = false;
    this.typeTeacher = new TypeTeacher();
  }
  public delete(typeTeacher: TypeTeacher) {
    this.typeTeacher = typeTeacher;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + typeTeacher.libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.typeTeacherService.deleteByLibelle().subscribe(data => {
          this.typeTeachers = this.typeTeachers.filter(val => val.id !== this.typeTeacher.id);
          this.typeTeacher = new TypeTeacher();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Type  Deleted',
            life: 3000
          });
        });
      }
    });
  }

}
