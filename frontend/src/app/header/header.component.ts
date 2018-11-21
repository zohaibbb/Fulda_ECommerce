import { Component, OnInit } from '@angular/core';
import { SigningService } from '../services/signing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchKeyword: any;
  constructor(
    private signingService: SigningService
  ) { }

  ngOnInit() {
  }
  searchProducts() {
    this.signingService.searchProducts(this.searchKeyword)
      .subscribe(results => console.log(results), err => console.log('err => ', err));
  }
}
