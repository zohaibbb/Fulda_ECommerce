import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigningService {

  constructor(private http: HttpClient) {}
  searchProducts(keyword?: any) {
    const url = environment.apiEndPoint + '/api/products';
    return this.http.get(url, {
      params: {
        search: keyword
      },
      observe: 'response'
    });
    // return this.http.get(url);
    // return this.http.get('/products/' + keyword).map((response: Response) => response.json());
  }
}
