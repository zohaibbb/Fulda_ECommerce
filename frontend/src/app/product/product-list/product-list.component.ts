import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SigningService } from '../../services/signing.service';

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
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.title.setTitle('Products List - Fulda Buy & Sell');
    const searchKeyword = this.route.snapshot.params.name;
    this.signingService.searchProducts({name: searchKeyword})
      .subscribe(results => {
        if (Array.isArray(results.body) && results.body.length > 0) {
          this.articles = results.body;
        }
      }, err => console.log('err => ', err));
  }
}
