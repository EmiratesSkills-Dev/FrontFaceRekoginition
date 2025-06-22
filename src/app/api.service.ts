import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://localhost:44313/api'; 

  constructor(private http: HttpClient) {}

  registerUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Users/register`, formData);
  }

  signInWithFace(imageBlob: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('Photo', imageBlob, 'photo.png'); // o campo deve bater com a API!
    return this.http.post(`${this.apiUrl}/Auth/login`, formData);
  }
}
