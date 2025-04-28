import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideosService } from '../services/videos.service';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-video-details',
  imports: [CommonModule, NzSpinComponent],
  templateUrl: './video-details.component.html',
  styleUrl: './video-details.component.css',
})
export class VideoDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private videosService: VideosService
  ) {}

  ngOnInit(): void {
    const navigationState = history.state;

    if (navigationState && navigationState.videoDetails) {
      this.videoDetails = navigationState.videoDetails;

      const rawId = this.route.snapshot.paramMap.get('id');
      if (rawId) {
        const parts = rawId.split('-');
        if (parts.length >= 3) {
          const location = parts[0];
          const camera = parts[1];
          const date = parts.slice(2).join('-');

          const filePath = `/user/hadoop/Videos/${location}/${camera}/${date}.mp4`;
          console.log('Ruta completa del video:', filePath);

          this.videosService.getVideoFile(filePath).subscribe({
            next: (response) => {
              const videoBlob = response.body;
              if (videoBlob) {
                const videoUrl = URL.createObjectURL(videoBlob);
                console.log('URL del video:', videoUrl);
                this.videoUrl = videoUrl;
              }
            },
            error: (error) => {
              console.error('Error al obtener el archivo de video:', error);
            },
          });
        } else {
          console.error('Formato de ID inválido');
        }
      }
    } else {
      console.error(
        'No se encontraron detalles del video en el estado de la navegación'
      );
    }
  }

  videoDetails: any = null;
  videoUrl: string | null = null;

  loading = false;
}
