import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private baseUrl = 'http://localhost:3000/videos';

  constructor(private http: HttpClient) {}

  getVideoFile(filePath: string): Observable<HttpResponse<Blob>> {
    const params = new HttpParams().set('filePath', filePath);

    return this.http.get(`${this.baseUrl}/getVideoFile`, {
      params,
      responseType: 'blob',
      observe: 'response',
    });
  }

  getVideos(filters: any): Observable<any> {
    let params = new HttpParams();

    if (filters.priority?.length) {
      filters.priority.forEach((p: string) => {
        params = params.append('priority', p);
      });
    }

    if (filters.location?.length) {
      filters.location.forEach((l: string) => {
        params = params.append('location', l);
      });
    }

    if (filters.alert_type?.length) {
      filters.alert_type.forEach((a: string) => {
        params = params.append('alert_type', a);
      });
    }

    if (filters.keywords?.length) {
      filters.keywords.forEach((k: string) => {
        params = params.append('keywords', k);
      });
    }

    if (filters.start_date) {
      params = params.set('start_date', filters.start_date);
    }

    if (filters.end_date) {
      params = params.set('end_date', filters.end_date);
    }

    if (filters.start_time) {
      params = params.set('start_time', filters.start_time);
    }

    if (filters.end_time) {
      params = params.set('end_time', filters.end_time);
    }

    return this.http.get(`${this.baseUrl}/getVideos`, { params });
  }
}
