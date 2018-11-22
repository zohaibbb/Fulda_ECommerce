import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigningService {

  constructor(private http: HttpClient) {}
  searchProducts(keyword?: any) {
    const url = environment.apiUrl + '/api/products';
    const params = keyword.name ? keyword : {};
    return this.http.get(url, { params, observe: 'response' });
  }
  getProduct(id) {
    const url = environment.apiUrl + '/api/products/' + id;
    return this.http.get(url);
  }
}
