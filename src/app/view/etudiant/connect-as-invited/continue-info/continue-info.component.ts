import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {LoginService} from '../../../../controller/service/login.service';
import {FreeTrialServiceService} from '../../../../controller/service/free-trial-service.service';
import {UserService} from '../../../../controller/service/user.service';
import {InscriptionService} from '../../../../controller/service/inscription.service';
import {InteretEtudiant} from '../../../../controller/model/interet-etudiant.model';
import {Fonction} from '../../../../controller/model/fonction.model';
import {StatutSocial} from '../../../../controller/model/statut-social.model';
import {NiveauEtude} from '../../../../controller/model/niveau-etude.model';
import {Skill} from '../../../../controller/model/skill.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-continue-info',
  templateUrl: './continue-info.component.html',
  styleUrls: ['./continue-info.component.scss']
})
export class ContinueInfoComponent implements OnInit {


  items: MenuItem[];
  datebirth: Date;
  dayoption: string;
  timeoption: string;
  teacherlocality: string;
  agerange: string;
  teachergendervalue: string;
  teacherperson: string;
  activeIndex: number = 0;
  maleselected = false;
  femaleselected = false;
  daysOptions: any[];
  timeOptions: any[];
  teacherlolality: any[];
  teacherAgerange: any[];
  teacherGneder: any[];
  teacherPersonnality: any[];


  constructor(public loginService: LoginService, public freetrialService: FreeTrialServiceService, private messageService: MessageService, private userService: UserService, private inscriptionService: InscriptionService, public router: Router) {
    this.daysOptions = [
      {name: '1 day', value: 1},
      {name: '2 to 3 days', value: 2},
      {name: '4 to 6 days', value: 3},
    ];
    this.timeOptions = [
      {name: 'mornings', value: 1},
      {name: 'afternoon', value: 2},
      {name: 'night', value: 3},
    ];
    this.teacherlolality = [
      {name: 'native', value: 1},
      {name: 'non native', value: 2},
      {name: 'doesn\'t matter', value: 3},
    ];
    this.teacherAgerange = [
      {name: '25 plus', value: 1},
      {name: '35 plus', value: 2},
      {name: '45 plus', value: 3},
    ];
    this.teacherGneder = [
      {name: 'male', value: 1},
      {name: 'female', value: 2},
      {name: 'doesn\'t matter', value: 3},
    ];
    this.teacherPersonnality = [
      {name: 'strict', value: 1},
      {name: 'lenient', value: 2},
      {name: 'moderate', value: 3},
    ];
  }

  get interetEtudiant(): InteretEtudiant {
    return this.userService.interetEtudiant;
  }

  set interetEtudiant(value: InteretEtudiant) {
    this.userService.interetEtudiant = value;
  }

  get interetEtudiants(): Array<InteretEtudiant> {
    return this.userService.interetEtudiants;
  }

  set interetEtudiants(value: Array<InteretEtudiant>) {
    this.userService.interetEtudiants = value;
  }

  get fonctions(): Array<Fonction> {
    return this.userService.fonctions;
  }

  set fonctions(value: Array<Fonction>) {
    this.userService.fonctions = value;
  }

  get fonction(): Fonction {
    return this.userService.fonction;
  }

  set fonction(value: Fonction) {
    this.userService.fonction = value;
  }

  get statutSocial(): StatutSocial {
    return this.userService.statutSocial;
  }

  set statutSocial(value: StatutSocial) {
    this.userService.statutSocial = value;
  }

  get statutSocials(): Array<StatutSocial> {
    return this.userService.statutSocials;
  }

  set statutSocials(value: Array<StatutSocial>) {
    this.userService.statutSocials = value;
  }

  get niveauEtudes(): Array<NiveauEtude> {
    return this.userService.niveauEtudes;
  }

  set niveauEtudes(value: Array<NiveauEtude>) {
    this.userService.niveauEtudes = value;
  }

  get niveauEtude(): NiveauEtude {
    return this.userService.niveauEtude;
  }

  set niveauEtude(value: NiveauEtude) {
    this.userService.niveauEtude = value;
  }

  get skills(): Array<Skill> {

    return this.inscriptionService.skills;
  }

  set skills(value: Array<Skill>) {
    this.inscriptionService.skills = value;
  }

  get skill(): Skill {
    return this.inscriptionService.skill;
  }

  set skill(value: Skill) {
    this.inscriptionService.skill = value;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Personal',

      },
      {
        label: 'Status',

      },
      {
        label: 'Schedule & Teacher',

      },
      {
        label: 'Confirmation',

      }
    ];

    this.userService.findAllStatutSocial().subscribe(
        data => {
          this.statutSocials = data;
          console.log(data);
        }, error => {
          console.log(error);
        }
    );
    this.inscriptionService.findAllSkill().subscribe(
        data => {
          this.skills = data;
          console.log(data);
        }, error => {
          console.log(error);
        }
    );
    this.userService.findAllFonction().subscribe(
        data => {
          this.fonctions = data;
          console.log(data);
        }, error => {
          console.log(error);
        }
    );
    this.userService.findAllInteretEtudiant().subscribe(
        data => {
          this.interetEtudiants = data;
          console.log(data);
        }, error => {
          console.log(error);
        }
    );
    this.userService.findAllNiveauEtude().subscribe(
        data => {
          this.niveauEtudes = data;
          console.log(data);
        }, error => {
          console.log(error);
        }
    );
  }

  public disabelcard(gender: string) {
    if (gender === 'male') {
      this.maleselected = false;
      this.femaleselected = true;
    } else if (gender === 'female') {
      this.femaleselected = false;
      this.maleselected = true;
    }
  }

}
