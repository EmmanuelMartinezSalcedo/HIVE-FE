import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { EmptyComponent } from './empty/empty.component';
import { VideoListComponent } from './video-list/video-list.component';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, EmptyComponent, VideoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'HIVE-UI';
  notificationMessage: string = '';
  showList: boolean = false;
  constructor(private notificationService: NotificationService) {}
  ngOnInit(): void {
    this.notificationService.notification$.subscribe((message: string) => {
      this.notificationMessage = message;

      if (message === 'Consulta completada con éxito.') {
        this.showList = true;
      }
    });
  }
}
