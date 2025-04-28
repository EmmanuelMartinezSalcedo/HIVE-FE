import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private baseUrl = 'http://localhost:3000/locations';

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllLocations`);
  }
}
