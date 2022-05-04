import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../controller/service/admin.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-drive-api',
    templateUrl: './drive-api.component.html',
    styleUrls: ['./drive-api.component.scss']
})
export class DriveApiComponent implements OnInit {
    displayLoadDialog: boolean;

    constructor(private adminService: AdminService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
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
