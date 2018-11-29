import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SigningService } from '../../services/signing.service';
import { environment } from '../../../environments/environment';
import _ from 'lodash';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId;
  article;
  params;
  existInWishlist = false;
  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private signingService: SigningService
  ) { }

  ngOnInit() {
    this.title.setTitle('Product Details - Fulda Buy & Sell');
    this.productId = this.route.snapshot.params.id;
    this.signingService.getProduct(this.productId)
      .subscribe(
        result => {
          this.article = result;
          this.article.product_id = result['_id'];
          this.article.image_path = environment.apiUrl + '/' + this.article.image_path;
          this.article.buyer_id = '5bf17f5dd1524aa429cd67fc';  // will be dynamic after user login

          this.params = _.pick(this.article, ['seller_id', 'buyer_id', 'product_id']);

          this.exist();
        },
        err => console.log('err =>', err));
  }
  addToWishlist() {
    if (this.existInWishlist) {
      return;
    }
    this.signingService.addToWishlist(this.params)
      .subscribe(
        result => {
          console.log(result);
          this.exist();
        },
        err => console.log(err)
      );
  }

  exist() {
    this.signingService.exist(this.params)
      .subscribe(
        exist => {
          if (exist['count'] && exist['count'] > 0) {
            this.existInWishlist = true;
          }
        },
        err => console.log(err)
      );
  }
}
