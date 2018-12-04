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
  getCategories() {
    const url = environment.apiUrl + '/api/products/get-categories';
    return this.http.get(url);
  }
  postProduct(product) {
    const url = environment.apiUrl + '/api/products/add-product';
    return this.http.post(url, product);
  }
  addToWishlist(product) {
    const url = environment.apiUrl + '/api/wishlist';
    return this.http.post(url, product);
  }
  exist(product) {
    const url = environment.apiUrl + '/api/wishlist/exist';
    return this.http.post(url, product);
  }
  getWishlist(buyer_id) {
    const url = environment.apiUrl + '/api/wishlist/' + buyer_id;
    return this.http.get(url)
  }
  removeProductFromWishlist(product) {
    const url = environment.apiUrl + '/api/wishlist/remove-product';
    return this.http.post(url, product);
  }
  changePassword(userDetail){
    const url = environment.apiUrl + '/api/users/change-password';
    return this.http.post(url,userDetail);
  }
  contactSellerFromProductDetail(id){
    const url = environment.apiUrl + '/api/users/profile';
    return this.http.post(url,id);
  }
}
