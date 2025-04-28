import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { Router } from '@angular/router';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-video-list',
  imports: [NzListModule, NzTypographyModule, CapitalizePipe],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css',
})
export class VideoListComponent implements OnInit {
  constructor(
    public msg: NzMessageService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notificationService.notificationWithContent$.subscribe(
      (notification: { message: string; content: any }) => {
        this.notificationMessage = notification.message;

        this.responseContent = notification.content;

        this.videos = this.responseContent.videoData;
      }
    );
  }

  videos: any = [];
  responseContent: any = null;
  notificationMessage: any = '';
  isLoading: boolean = false;

  goToVideoDetails(videoFile: string, index: number): void {
    if (videoFile) {
      const videoId = videoFile.replace(/\//g, '-').replace('.mp4', '');
      this.router.navigate([`/video-details/${videoId}`], {
        state: { videoDetails: this.videos[index], videoIndex: index },
      });
    } else {
      console.error('video_file is undefined or null:', videoFile);
    }
  }
}
