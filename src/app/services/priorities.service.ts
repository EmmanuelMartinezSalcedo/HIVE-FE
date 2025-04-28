import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrioritiesService {
  private baseUrl = 'http://localhost:3000/priorities';

  constructor(private http: HttpClient) {}

  getAllPriorities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllPriorities`);
  }
}
