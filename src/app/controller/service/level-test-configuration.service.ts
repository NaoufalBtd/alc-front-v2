import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LevelTestConfiguration} from '../model/level-test-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class LevelTestConfigurationService {

  url = environment.adminUrl + 'level-test-configuration/';
  constructor(private http: HttpClient) { }

public findAll(): Observable<LevelTestConfiguration[]> {
    return this.http.get<LevelTestConfiguration[]>(this.url);
}
}
