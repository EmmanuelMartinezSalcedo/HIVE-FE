import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-empty',
  imports: [NzTypographyModule, NzSpinModule],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.css',
})
export class EmptyComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}
  ngOnInit(): void {
    this.notificationService.notification$.subscribe((message: string) => {
      this.notificationMessage = message;

      if (message === 'Consulta realizada.') {
        this.isLoading = true;
      }

      if (message === 'Consulta completada con éxito.') {
        this.isLoading = false;
      }
    });
  }
  notificationMessage: string = '';
  isLoading: boolean = false;
}
