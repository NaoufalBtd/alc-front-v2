import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HomeWOrkEtudiant} from '../model/home-work-etudiant.model';
import {environment} from '../../../environments/environment';
import {LoginService} from './login.service';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StudenthomeworkForProfService {

  private profUrl = environment.profUrl;
  private _studentHomeWorkList: Array<HomeWOrkEtudiant>;
  private _homeWorkEtudiantVo : HomeWOrkEtudiant;
  constructor(private http: HttpClient, private loginService: LoginService, private authentificationService: AuthenticationService) { }


  get HomeWorkEtudiantVo(): HomeWOrkEtudiant {
    if (this._homeWorkEtudiantVo == null){
      this._homeWorkEtudiantVo = new HomeWOrkEtudiant();
    }
    return this._homeWorkEtudiantVo;
  }

  set HomeWorkEtudiantVo(value: HomeWOrkEtudiant) {
    this._homeWorkEtudiantVo = value;
  }

  get studentHomeWorkList(): Array<HomeWOrkEtudiant> {
    if (this._studentHomeWorkList == null){
      this._studentHomeWorkList = new Array<HomeWOrkEtudiant>();
    }
    return this._studentHomeWorkList;
  }

  set studentHomeWorkList(value: Array<HomeWOrkEtudiant>) {
    this._studentHomeWorkList = value;
  }

  public findByProf(){
    this.http.get<Array<HomeWOrkEtudiant>>(this.profUrl + 'homeWorkEtudiant/homeworklist/' + this.authentificationService.getUserFromLocalCache().id).subscribe(
        data => {
          console.log(data);
          this.studentHomeWorkList = data;
        }, error => {
          console.log(error);
        }
    );
  }
  public findByVo(){
    this.http.post<Array<HomeWOrkEtudiant>>(this.profUrl + 'homeWorkEtudiant/Vo/', this.HomeWorkEtudiantVo).subscribe(
        data => {
          console.log('rah dazt l requete Vo');
          this.studentHomeWorkList = data;
        }
    );
  }
}
