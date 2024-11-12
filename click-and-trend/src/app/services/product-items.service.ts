import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/components/interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductItemsService {

  private BASE_URL = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}


  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/all`);
  }

  getProductsByGender(gender: string): Observable<any> {
    const params = new HttpParams().set('gender', gender);
    return this.http.get<any>(`${this.BASE_URL}/gender`, { params });
  }

  // Insertar un producto
  insertProduct(product: any, image:File): Observable<any> {
    const formData = new FormData()
    formData.append('request',new Blob([JSON.stringify(product)],{type:'application/json'}))
    formData.append('file',image)
    return this.http.post<any>(`${this.BASE_URL}/insert`, formData);
  }

  // Modificar un producto
  updateAllProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/update/${id}`, product);
}


  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/delete/${id}`);
  }
  updateProduct(id: number, updateRequest: Product, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('updateRequest', new Blob([JSON.stringify(updateRequest)], { type: 'application/json' }));

    // Agrega el archivo solo si se ha seleccionado una imagen
    if (image) {
        formData.append('file', image);
    }

    const url = `${this.BASE_URL}/updatePatch/${id}`;
    return this.http.patch(url, formData);
}


  getProductById(id: number): Observable<any> {
    if (!id) {
        throw new Error('El ID es requerido');
    }
    return this.http.get<any>(`${this.BASE_URL}/get/${id}`);
}
getId(id: number): Observable<any> {
  if (!id) {
      throw new Error('El ID es requerido');
  }
  return this.http.get<any>(`${this.BASE_URL}/getId`, {
      params: new HttpParams().set('id', id.toString())
  });
}



}

