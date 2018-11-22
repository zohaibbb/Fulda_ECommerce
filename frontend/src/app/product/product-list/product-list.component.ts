import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SigningService } from '../../services/signing.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  articles;
  constructor(
    private title: Title,
    private signingService: SigningService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.title.setTitle('Products List - Fulda Buy & Sell');
    const searchKeyword = this.route.snapshot.params.name;

    this.signingService.searchProducts({name: searchKeyword})
      .subscribe(results => {
        if (Array.isArray(results.body) && results.body.length > 0) {
          this.articles = results.body;
          this.articles.forEach(article => {
            article.image_path = environment.apiUrl + '/' + article.image_path;
          });
        }
      }, err => console.log('err => ', err));
  }

  productDetails(id) {
    this.router.navigate(['product-detail', {id: id}]);
  }
}
