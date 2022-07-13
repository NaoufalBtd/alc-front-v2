import {InteretEtudiant} from './interet-etudiant.model';
import {NiveauEtude} from './niveau-etude.model';
import {Fonction} from './fonction.model';
import {StatutSocial} from './statut-social.model';
import {Skill} from './skill.model';

export class User {
    public id: number = Number(0);
    public username: string = String();
    public password: string;
    public accountNonExpired = true;
    public credentialsNonExpired = true;
    public accountNonLocked = true;
    public enabled = true;
    public authorities: [];
    public  role = 'Role';
    public  nom: string;
    public  numero: string;
    public  skype: string;
    public  addresse: string;
    public  ville: string;
    public  country: string = String('Morocco');
    public  dateNaissance: string;
    public  age: number;
    public  image: string;
    public interetEtudiant = new InteretEtudiant();
    public niveauEtude = new NiveauEtude();
    public fonction = new Fonction();
    public statutSocial =  new StatutSocial();
    public skill = new Skill();

}
