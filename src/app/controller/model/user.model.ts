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
    public  prenom: string;
    public  numero: string;
    public  addresse: string;
    public  ville: string;
    public  age: number;
    public  image: string;
}
