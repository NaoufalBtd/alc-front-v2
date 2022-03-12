import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {StatutSocialService} from '../../../controller/service/statut-social.service';
import {StatutSocial} from '../../../controller/model/statut-social.model';
import {TypeTeacher} from '../../../controller/model/type-teacher.model';
import {SkillService} from '../../../controller/service/skill.service';
import {Skill} from '../../../controller/model/skill.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {


  constructor(private messageService: MessageService, private skillService: SkillService,
              private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.skillService.findAllSkill().subscribe(data => {
      this.skills = data;
      console.log(this.skills);
    } );
  }
  public save() {

    if (this.skill.libelle.trim()) {
      this.skillService.save().subscribe(data => {
        // tslint:disable-next-line:no-shadowed-variable
        this.skillService.findAllSkill().subscribe(data => this.skills = data);
        this.skills.push({...this.skill});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Skill Created',
          life: 3000
        });
      });
      this.createDialogEtud = false;
      this.skill = new StatutSocial();
    }
  }
  public showEdit(skill1: Skill) {
    this.skill = {...skill1};
    this.editDialog = true;
  }
  showEditDialog() {
    this.createDialogEtud = true;
    this.skill= null;

  }
  hideCreateDialog() {
    this.createDialogEtud = false;

  }

  get editDialog(): boolean {
    return this.skillService.editDialog;
  }

  set editDialog(value: boolean) {
    this.skillService.editDialog = value;
  }
  get createDialogEtud(): boolean {
    return this.skillService.createDialog;
  }

  set createDialogEtud(value: boolean) {
    this.skillService.createDialog = value;
  }

  get skill(): StatutSocial {
    return this.skillService.skill;
  }

  set skill(value: Skill) {
    this.skillService.skill = value;
  }
  get skills(): Array<Skill>{
    return this.skillService.skills;
  }

  set skills(value: Array<Skill>) {
    this.skillService.skills = value;
  }
  public edit() {
    this.skills[this.skillService.findIndexById(this.skill.id)] = this.skill;
    this.skillService.edit().subscribe(data => {
      this.skill = data;
      this.skillService.findAllSkill();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Skill Updated',
        life: 3000
      });
    });
    this.editDialog = false;
    this.skill = new Skill();
  }
  public delete(skill: Skill) {
    this.skill = skill;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + skill.libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.skillService.deleteByLibelle().subscribe(data => {
          this.skills = this.skills.filter(val => val.id !== this.skill.id);
          this.skill = new TypeTeacher();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Skill  Deleted',
            life: 3000
          });
        });
      }
    });
  }
}
