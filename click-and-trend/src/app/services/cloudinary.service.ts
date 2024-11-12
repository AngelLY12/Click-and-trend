import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private cloudName = environment.cloudinary.cloudName;
  private uploadPreset = environment.cloudinary.uploadPreset;

  constructor(private http: HttpClient) {}

  // Método para cargar la imagen a Cloudinary
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    return this.http.post<any>(uploadUrl, formData);
  }}
