import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertTypesService } from '../../services/alert-types.service';
import { PrioritiesService } from '../../services/priorities.service';
import { LocationsService } from '../../services/locations.service';
import { VideosService } from '../../services/videos.service';
import { NotificationService } from '../../services/notification.service';

import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    CapitalizePipe,
    NzPageHeaderModule,
    NzSpaceModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzNoAnimationDirective,
    NzIconModule,
    NzInputModule,
    NzTagModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private alertTypesService: AlertTypesService,
    private prioritiesService: PrioritiesService,
    private locationsService: LocationsService,
    private videosService: VideosService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadInformation();
  }

  selectedAlert: string | null = null;
  alerts: string[] = [];

  selectedPriority: string | null = null;
  priorities: string[] = [];

  selectedLocation: string | null = null;
  locations: string[] = [];

  dateRange: Date[] | null = null;

  startTime: Date | null = null;
  endTime: Date | null = null;
  defaultOpenValue: Date = new Date(0, 0, 0, 0, 0, 0);

  keywords: string[] = [];
  inputVisible = false;
  inputValue = '';
  onDatePickerChange(result: Date[]): void {
    this.dateRange = [];

    const formattedDate1 = result[0].toLocaleDateString('en-GB');
    const formattedDate2 = result[1].toLocaleDateString('en-GB');

    if (formattedDate1 === formattedDate2) {
      this.dateRange = [result[0]];
    } else {
      this.dateRange = result;
    }
  }
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  handleClose(removedTag: {}): void {
    this.keywords = this.keywords.filter((tag) => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.keywords.indexOf(this.inputValue) === -1) {
      this.keywords = [...this.keywords, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  loadInformation(): void {
    this.alertTypesService
      .getAllAlertTypes()
      .pipe(
        concatMap((data: any) => {
          this.alerts = data.alert_types;

          return this.prioritiesService.getAllPriorities();
        }),
        concatMap((data: any) => {
          this.priorities = data.priorities;
          return this.locationsService.getAllLocations();
        })
      )
      .subscribe({
        next: (data: any) => {
          this.locations = data.locations;
        },
        error: (error) => {
          console.error('Error al cargar los datos:', error);
        },
      });
  }

  onSubmit(): void {
    const filters = {
      alert_type: this.selectedAlert ? [this.selectedAlert] : [],
      priority: this.selectedPriority ? [this.selectedPriority] : [],
      location: this.selectedLocation ? [this.selectedLocation] : [],
      start_date:
        this.dateRange && this.dateRange.length > 0
          ? this.dateRange[0].toISOString().split('T')[0]
          : undefined,
      end_date:
        this.dateRange && this.dateRange.length > 1
          ? this.dateRange[1].toISOString().split('T')[0]
          : undefined,
      start_time: this.startTime
        ? this.formatDateTime(this.startTime)
        : undefined,
      end_time: this.endTime ? this.formatDateTime(this.endTime) : undefined,
      keywords: this.keywords.length > 0 ? this.keywords : [],
    };

    console.log('Filters before sending:', filters);

    this.notificationService.sendSearchNotification('Consulta realizada.');

    this.videosService.getVideos(filters).subscribe({
      next: (response) => {
        console.log('Respuesta de videos:', response);
        this.notificationService.sendCompleteNotification(
          'Consulta completada con éxito.'
        );

        this.notificationService.sendResponseNotification(
          'Enviando respuesta',
          response
        );
      },
      error: (error) => {
        console.error('Error al obtener videos:', error);
      },
    });
  }

  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
