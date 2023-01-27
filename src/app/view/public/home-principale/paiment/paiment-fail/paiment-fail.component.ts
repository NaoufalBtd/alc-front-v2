import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-paiment-fail',
    templateUrl: './paiment-fail.component.html',
    styleUrls: ['./paiment-fail.component.scss']
})
export class PaimentFailComponent implements OnInit {

    oid: string;
    reason: string;
    showAlert: boolean = false;

    constructor(private _activatedRoute: ActivatedRoute,
                private http: HttpClient,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.oid = this._activatedRoute.snapshot.params.oid;
        if (this.oid !== null && this.oid !== undefined) {
            console.log(this.oid);
            this.http.get<string>(environment.payFailedReasonUrl + this.oid).subscribe(reason => {
                console.log(reason);
                if (reason !== null) {
                    this.reason = reason;
                    this.showAlert = true;
                    console.log(this.reason);
                }
            }, error => {
                if (error?.error?.text) {
                    this.reason = error.error.text;
                    this.showAlert = true;
                }
            });
        }

    }

}
