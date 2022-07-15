import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../controller/service/admin.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-drive-api',
    templateUrl: './drive-api.component.html',
    styleUrls: ['./drive-api.component.scss']
})
export class DriveApiComponent implements OnInit {
    displayLoadDialog: boolean;

    constructor(private adminService: AdminService,
                private route: ActivatedRoute,
                private http: HttpClient,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.connectToGoogle();
    }

     connectToGoogle() {
        const formData = new FormData();

        console.log(this.route.snapshot.queryParams);
        const code = this.route.snapshot.queryParams.code;
        console.log(code);
        formData.append('code', code);
        if (code !== null && code !== undefined) {
            this.http.post(environment.adminUrl + 'admin/oauth', formData,
                {
                    reportProgress: true,
                    observe: 'events'
                }).subscribe(
                data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Connection to google successful'
                    });
                }, error => {
                    console.log(error);
                }
            );
        }
    }

    public saveData() {
        this.displayLoadDialog = true;
        this.adminService.saveData().subscribe(
            data => {
                console.log(data);
                this.displayLoadDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'process finished. thanks for waiting',
                    life: 4000
                });
            }, error => {
                console.log(error);
                this.displayLoadDialog = false;
            }
        );
    }


    openSite() {
        window.open(environment.signWithGoogleApi, '_blank');
    }


}
