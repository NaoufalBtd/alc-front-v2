import {Component, OnInit} from '@angular/core';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {LearnService} from '../../../../controller/service/learn.service';

@Component({
    selector: 'app-watch-it',
    templateUrl: './watch-it.component.html',
    styleUrls: ['./watch-it.component.scss']
})
export class WatchItComponent implements OnInit {

    constructor(private learnService: LearnService,
    ) {
    }


    get selectedHomeWork(): HomeWork {
        return this.learnService.selectedHomeWork;
    }

    set selectedHomeWork(value: HomeWork) {
        this.learnService.selectedHomeWork = value;
    }

    ngOnInit(): void {
        console.log(this.selectedHomeWork);
    }

    getUrlVideo(urlVideo: string): string {
        console.log(urlVideo);
        let video = urlVideo.replace('watch?v=', 'embed/');
        const index = video.indexOf('&t=');
        const startTime: number = Number(video.substring(index + '&t='.length, (video.length - 1)));
        if (index !== -1) {
            video = video.substring(0, index) + '?start=' + startTime + '&color=white&controls=0&rel=0&autoplay=1&iv_load_policy=3';
        } else {
            video = video + '?color=white&controls=0&rel=0&autoplay=1&iv_load_policy=3';
        }
        console.log(video);
        console.log(startTime);
        return video;
    }

    onPlayerReady(event) {
        console.log('--------------------------------------------------------');
        console.log(event);
        let embedCode = event.target.getVideoEmbedCode();
        event.target.playVideo();
        if (document.getElementById('_53mo10_Mbk')) {
            document.getElementById('_53mo10_Mbk').innerHTML = embedCode;
        }
        console.log(embedCode);
    }

}
