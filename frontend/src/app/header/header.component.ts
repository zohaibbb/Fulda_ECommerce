import { Component, OnInit } from '@angular/core';
import { SigningService } from '../services/signing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchKeyword: any;
  constructor(
    private signingService: SigningService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  searchProducts() {
    this.router.navigate(['product-listing', {name: this.searchKeyword}]);
  }
}
