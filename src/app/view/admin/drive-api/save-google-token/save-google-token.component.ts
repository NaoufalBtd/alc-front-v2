import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-save-google-token',
    templateUrl: './save-google-token.component.html',
    styleUrls: ['./save-google-token.component.scss']
})
export class SaveGoogleTokenComponent implements OnInit {

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        console.log(this.route.snapshot);
        const code = this.route.snapshot.paramMap.get('id');
    }

}
