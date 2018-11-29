import { Component, OnInit } from '@angular/core';
import { SigningService } from '../services/signing.service';
import { environment } from '../../environments/environment';
import _ from 'lodash';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  articles;
  total = 0;
  constructor(
    private signingService: SigningService
  ) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.signingService.getWishlist('5bf17f5dd1524aa429cd67fc') // buyer_id .. will be dynamic after login
    .subscribe(
      result => {
        this.articles = result;
        this.articles.forEach(article => {
          console.log(article);
          this.total += article.product_details.price;
          article.product_details.image_path = environment.apiUrl + '/' + article.product_details.image_path;
        });

      },
      err => console.log(err)
      );
  }

  removeProduct(product) {
    product = _.pick(product, ['_id', 'seller_id', 'buyer_id', 'product_id']);
    console.log(product);
    this.signingService.removeProductFromWishlist(product)
      .subscribe(
        result => {
          this.total = 0;
          this.list();
        },
        err => console.log(err)
      )
  }

}
