import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SigningService } from '../../services/signing.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId;
  article;
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
          this.article.image_path = environment.apiUrl + '/' + this.article.image_path;
        },
        err => console.log('err =>', err));
  }

}
