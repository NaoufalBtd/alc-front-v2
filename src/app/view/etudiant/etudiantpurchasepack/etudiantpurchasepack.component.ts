import { Component, OnInit } from '@angular/core';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {PackStudent} from '../../../controller/model/pack-student.model';
import {MenuItem, MessageService} from 'primeng/api';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {LoginService} from '../../../controller/service/login.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-etudiantpurchasepack',
  templateUrl: './etudiantpurchasepack.component.html',
  styleUrls: ['./etudiantpurchasepack.component.scss']
})
export class EtudiantpurchasepackComponent implements OnInit {
  typePack: MenuItem[];
  packshossen: PackStudent = new PackStudent();
  valuechoosen: boolean;
  constructor(public router: Router, public packservice: PackStudentService, public etudiantService: EtudiantService, public loginService: LoginService, public messageService: MessageService) {
    this.typePack = [];
    // @ts-ignore
    this.typePack.push({label: 'Group', value: 1});
    // @ts-ignore
    this.typePack.push({label: 'Individual', value: 0});
  }

  groupepackList = new Array<PackStudent>();
  indivpackList = new Array<PackStudent>();
  packIschossed = false;

  ngOnInit(): void {
    this.packservice.findPackIndividualOrgroupe(true);
/*    this.groupepackList = this.packservice.packstudentgroupeList;
    this.indivpackList = this.packservice.packstudentIndividialList;*/
    console.log(this.indivpackList);
    console.log(this.groupepackList);
  }

  getchoosenPack(code: string) {
    this.etudiantService.updateInscriptionByStudent(code, this.loginService.getConnectedStudent()).subscribe(
        data => {
          if (data != null){
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'your paiment is done successfully, the admins will contact you soon enough to validate your registration.',
              life: 8000
            });
            this.router.navigate(['etudiant/profile']);
          }
        }
    );
  }
  public packIsChossen(pack: PackStudent){
    this.packshossen = pack;
    this.packIschossed = true;
  }
  hide() {
    this.packIschossed = false;
  }
}
