import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertTypesService {
  private baseUrl = 'http://localhost:3000/alert-types';

  constructor(private http: HttpClient) {}

  getAllAlertTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllAlertTypes`);
  }
}
